/**
 * BookingWizard — 4-step consultation booking form.
 *
 * Steps:
 *   1  Service + contact details
 *   2  Schedule (date, time, timezone)
 *   3  Conditional details (birth or property + notes)
 *   4  Review & consent (ReviewModal)
 *
 * Implements the full deferred-commit lead pipeline (spec §A.3):
 *   validate → sanitize → 5s undo window → commit (Sheet + Email) → WhatsApp
 *
 * Props:
 *   initialType  string | null   pre-selected consultation type (from ?book= param)
 *   onDone       () => void      called after success or explicit close
 */
import { useState, useEffect, useCallback, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { AnimatePresence, motion } from 'framer-motion';
import { toast } from 'sonner';

import { consultationSchema } from '@/utils/schemas.js';
import {
  CONSULTATION_TYPES,
  CONSULTATION_LABELS,
  BIRTH_REQUIRED_TYPES,
  PROPERTY_REQUIRED_TYPES,
} from '@/utils/constants.js';
import { buildLeadPayload, commitLead } from '@/services/leadService.js';
import { getAttribution } from '@/hooks/useUtmCapture.js';
import { useDraftAutosave, loadDraft, discardDraft } from '@/hooks/useDraftAutosave.js';
import { Analytics } from '@/services/analytics.js';

import {
  setStep,
  updateValues,
  setStatus,
  setLeadId,
  setChannelResult,
  setErrorMessage,
  setFileMetadata,
  restoreDraft,
  discardDraft as discardDraftAction,
  resetAfterSuccess,
  selectDraftValues,
  selectDraftStep,
  selectDraftStatus,
  selectLeadId,
  selectChannelResults,
  selectFileMetadata,
  selectDraftErrorMessage,
} from '@/redux/slices/bookingDraftSlice.js';

import PhoneField from './PhoneField.jsx';
import FileDropzone from './FileDropzone.jsx';
import DraftPrompt from './DraftPrompt.jsx';
import ReviewModal from './ReviewModal.jsx';
import SuccessModal from './SuccessModal.jsx';
import InlineError from '@/components/feedback/InlineError.jsx';
import FormAlert from '@/components/feedback/FormAlert.jsx';
import { showUndoToast, dismissUndoToast } from '@/components/feedback/UndoToast.jsx';

const STEP_FIELDS = {
  1: ['consultationType', 'name', 'email', 'countryCode', 'phone'],
  2: ['preferredDate', 'preferredTime', 'timezone'],
  3: [], // optional fields, validated at submit
};

const stepVariants = {
  enter: (dir) => ({ x: dir > 0 ? 40 : -40, opacity: 0 }),
  center: { x: 0, opacity: 1, transition: { duration: 0.3, ease: 'easeOut' } },
  exit: (dir) => ({ x: dir < 0 ? 40 : -40, opacity: 0, transition: { duration: 0.25 } }),
};

function StepIndicator({ step, total }) {
  return (
    <div className="flex items-center gap-1 mb-6" aria-label={`Step ${step} of ${total}`}>
      {Array.from({ length: total }, (_, i) => (
        <div
          key={i}
          className={`h-1 flex-1 rounded-full transition-colors duration-300 ${i < step ? 'bg-accent-text' : 'bg-line'}`}
        />
      ))}
    </div>
  );
}

function FieldLabel({ htmlFor, children, required }) {
  return (
    <label htmlFor={htmlFor} className="block text-sm font-medium text-text mb-1">
      {children}{required && <span aria-hidden="true" className="text-rose-text ml-0.5">*</span>}
    </label>
  );
}

function TextInput({ id, error, ...props }) {
  return (
    <>
      <input
        id={id}
        aria-describedby={error ? `${id}-error` : undefined}
        aria-invalid={!!error}
        className={`w-full h-11 px-3 rounded-lg border bg-bg text-text text-sm placeholder-muted-text focus-visible:outline-2 focus-visible:outline-accent-text transition-colors ${error ? 'border-rose-text' : 'border-line'}`}
        {...props}
      />
      <InlineError id={`${id}-error`} message={error?.message} />
    </>
  );
}

export default function BookingWizard({ initialType = null, onDone }) {
  const dispatch = useDispatch();
  const values = useSelector(selectDraftValues);
  const currentStep = useSelector(selectDraftStep);
  const status = useSelector(selectDraftStatus);
  const leadId = useSelector(selectLeadId);
  const channelResults = useSelector(selectChannelResults);
  const fileMetadata = useSelector(selectFileMetadata);
  const errorMessage = useSelector(selectDraftErrorMessage);

  const [direction, setDirection] = useState(1);
  const [showReview, setShowReview] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [whatsAppUrl, setWhatsAppUrl] = useState('');
  const [showDraftPrompt, setShowDraftPrompt] = useState(false);
  const [savedDraft, setSavedDraft] = useState(null);
  const fileRef = useRef(null); // actual File object (not serialized)

  const { register, handleSubmit, formState: { errors }, trigger, watch, setValue, reset } = useForm({
    resolver: zodResolver(consultationSchema),
    mode: 'onTouched',
    defaultValues: {
      ...values,
      consultationType: initialType || values.consultationType || '',
      countryCode: values.countryCode || '+91',
      website: '', // honeypot
    },
  });

  const watchedValues = watch();
  const consultationType = watch('consultationType');
  const showBirth = BIRTH_REQUIRED_TYPES.includes(consultationType);
  const showProperty = PROPERTY_REQUIRED_TYPES.includes(consultationType);

  // Sync RHF values → Redux for autosave
  useDraftAutosave(watchedValues, currentStep);

  // On mount: check for saved draft
  useEffect(() => {
    const draft = loadDraft();
    if (draft && !initialType) {
      setSavedDraft(draft);
      setShowDraftPrompt(true);
    }
    if (initialType) {
      setValue('consultationType', initialType);
      dispatch(updateValues({ consultationType: initialType }));
    }
    Analytics.bookingOpen(initialType);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleResumeDraft = useCallback(() => {
    dispatch(restoreDraft(savedDraft));
    reset({ ...savedDraft.values, website: '', consent: false });
    setShowDraftPrompt(false);
  }, [dispatch, savedDraft, reset]);

  const handleDiscardDraft = useCallback(() => {
    discardDraft();
    dispatch(discardDraftAction());
    setShowDraftPrompt(false);
  }, [dispatch]);

  const goNext = useCallback(async () => {
    const fields = STEP_FIELDS[currentStep] || [];
    const valid = fields.length ? await trigger(fields) : true;
    if (!valid) return;
    Analytics.bookingStep(currentStep + 1, consultationType);
    setDirection(1);
    dispatch(setStep(currentStep + 1));
  }, [currentStep, trigger, consultationType, dispatch]);

  const goBack = useCallback(() => {
    setDirection(-1);
    dispatch(setStep(currentStep - 1));
  }, [currentStep, dispatch]);

  const openReview = useCallback(async () => {
    const valid = await trigger();
    if (!valid) {
      // Find first error and scroll to it
      const firstErrKey = Object.keys(errors)[0];
      document.getElementById(firstErrKey)?.focus();
      return;
    }
    dispatch(updateValues(watchedValues));
    Analytics.bookingStep(4, consultationType);
    setShowReview(true);
  }, [trigger, errors, dispatch, watchedValues, consultationType]);

  const handleConfirm = useCallback(async () => {
    dispatch(setStatus('submitting'));
    setShowReview(false);

    // Generate a lead ID
    const newLeadId = crypto.randomUUID();
    dispatch(setLeadId(newLeadId));

    Analytics.leadSubmitStart(consultationType);

    // Show undo toast — nothing is sent yet
    dispatch(setStatus('awaitingUndo'));
    toast.success('Request received. You can undo within 5 seconds.', {
      duration: 5500,
      id: 'undo-notice',
    });

    showUndoToast({
      durationMs: 5000,
      onUndo: () => {
        dispatch(setStatus('idle'));
        dispatch(setLeadId(null));
        toast.info('Request cancelled. Your draft has been kept.');
      },
      onCommit: async () => {
        dispatch(setStatus('committing'));
        const attribution = getAttribution();
        const payload = buildLeadPayload(
          { ...watchedValues, consent: true },
          newLeadId,
          fileMetadata,
          attribution
        );

        try {
          const result = await commitLead(payload);
          dispatch(setChannelResult({ channel: 'sheet', result: result.sent.sheet }));
          dispatch(setChannelResult({ channel: 'email', result: result.sent.email }));
          setWhatsAppUrl(result.whatsAppUrl);
          dispatch(setStatus('success'));
          setShowSuccess(true);
          Analytics.leadSubmitSuccess(consultationType, result.sent);
          discardDraft();
        } catch (err) {
          dispatch(setStatus('error'));
          dispatch(setErrorMessage(err?.message ?? 'Submission failed. Please try again.'));
          Analytics.leadSubmitError(consultationType, err?.message ?? 'unknown');
        }
      },
    });
  }, [dispatch, consultationType, watchedValues, fileMetadata]);

  const handleSuccessClose = useCallback(() => {
    dispatch(resetAfterSuccess());
    dismissUndoToast();
    onDone?.();
  }, [dispatch, onDone]);

  const handleFileSelected = useCallback((file, metadata) => {
    fileRef.current = file;
    dispatch(setFileMetadata(metadata));
  }, [dispatch]);

  const handleFileRemoved = useCallback(() => {
    fileRef.current = null;
    dispatch(setFileMetadata(null));
  }, [dispatch]);

  const today = new Date().toISOString().split('T')[0];

  return (
    <div className="w-full">
      {/* Draft prompt */}
      {showDraftPrompt && savedDraft && (
        <DraftPrompt
          savedAt={savedDraft.savedAt}
          onResume={handleResumeDraft}
          onDiscard={handleDiscardDraft}
        />
      )}

      <StepIndicator step={currentStep} total={3} />

      {/* Error banner */}
      {status === 'error' && errorMessage && (
        <FormAlert
          type="error"
          title="Submission failed"
          message={errorMessage}
          className="mb-4"
        />
      )}

      <form onSubmit={handleSubmit(openReview)} noValidate>
        <AnimatePresence mode="wait" custom={direction}>
          {/* Step 1: Service + contact */}
          {currentStep === 1 && (
            <motion.div key="step1" custom={direction} variants={stepVariants} initial="enter" animate="center" exit="exit" className="space-y-5">
              <h2 className="font-display text-2xl text-text">Service and contact</h2>

              {/* Consultation type */}
              <div>
                <FieldLabel htmlFor="consultationType" required>Consultation type</FieldLabel>
                <select
                  id="consultationType"
                  aria-describedby={errors.consultationType ? 'consultationType-error' : undefined}
                  aria-invalid={!!errors.consultationType}
                  className={`w-full h-11 px-3 rounded-lg border bg-bg text-text text-sm focus-visible:outline-2 focus-visible:outline-accent-text transition-colors ${errors.consultationType ? 'border-rose-text' : 'border-line'}`}
                  {...register('consultationType')}
                >
                  <option value="">Select a consultation type</option>
                  {CONSULTATION_TYPES.map((t) => (
                    <option key={t} value={t}>{CONSULTATION_LABELS[t]}</option>
                  ))}
                </select>
                <InlineError id="consultationType-error" message={errors.consultationType?.message} />
              </div>

              {/* Name */}
              <div>
                <FieldLabel htmlFor="name" required>Full name</FieldLabel>
                <TextInput id="name" type="text" autoComplete="name" placeholder="Your name" error={errors.name} {...register('name')} />
              </div>

              {/* Email */}
              <div>
                <FieldLabel htmlFor="email" required>Email address</FieldLabel>
                <TextInput id="email" type="email" autoComplete="email" placeholder="you@example.com" error={errors.email} {...register('email')} />
              </div>

              {/* Phone */}
              <PhoneField
                registerCode={register('countryCode')}
                registerPhone={register('phone')}
                errorCode={errors.countryCode}
                errorPhone={errors.phone}
              />

              {/* Honeypot — hidden from real users */}
              <div aria-hidden="true" className="hidden" tabIndex={-1}>
                <input type="text" autoComplete="off" tabIndex={-1} {...register('website')} />
              </div>

              <button type="button" onClick={goNext} className="w-full h-12 rounded-xl bg-brand-btn-bg text-brand-btn-text font-semibold hover:opacity-90 transition-opacity focus-visible:outline-2 focus-visible:outline-accent-text">
                Continue
              </button>
            </motion.div>
          )}

          {/* Step 2: Schedule */}
          {currentStep === 2 && (
            <motion.div key="step2" custom={direction} variants={stepVariants} initial="enter" animate="center" exit="exit" className="space-y-5">
              <h2 className="font-display text-2xl text-text">Preferred schedule</h2>

              <div>
                <FieldLabel htmlFor="preferredDate" required>Preferred date</FieldLabel>
                <TextInput id="preferredDate" type="date" min={today} error={errors.preferredDate} {...register('preferredDate')} />
              </div>

              <div>
                <FieldLabel htmlFor="preferredTime" required>Preferred time</FieldLabel>
                <TextInput id="preferredTime" type="time" error={errors.preferredTime} {...register('preferredTime')} />
              </div>

              <div>
                <FieldLabel htmlFor="timezone">Timezone</FieldLabel>
                <TextInput id="timezone" type="text" placeholder="e.g. Asia/Kolkata" error={errors.timezone} {...register('timezone')} />
              </div>

              <div className="flex gap-3">
                <button type="button" onClick={goBack} className="flex-1 h-12 rounded-xl border border-line text-text font-medium hover:bg-alt-surface transition-colors focus-visible:outline-2 focus-visible:outline-accent-text">Back</button>
                <button type="button" onClick={goNext} className="flex-1 h-12 rounded-xl bg-brand-btn-bg text-brand-btn-text font-semibold hover:opacity-90 transition-opacity focus-visible:outline-2 focus-visible:outline-accent-text">Continue</button>
              </div>
            </motion.div>
          )}

          {/* Step 3: Conditional details */}
          {currentStep === 3 && (
            <motion.div key="step3" custom={direction} variants={stepVariants} initial="enter" animate="center" exit="exit" className="space-y-5">
              <h2 className="font-display text-2xl text-text">Additional details</h2>

              {showBirth && (
                <>
                  <div>
                    <FieldLabel htmlFor="birthDate" required>Date of birth</FieldLabel>
                    <TextInput id="birthDate" type="date" max={today} autoComplete="bday" error={errors.birthDate} {...register('birthDate')} />
                  </div>
                  <div>
                    <FieldLabel htmlFor="birthTime">Time of birth</FieldLabel>
                    <TextInput id="birthTime" type="time" error={errors.birthTime} {...register('birthTime')} />
                  </div>
                  <div>
                    <FieldLabel htmlFor="birthPlace">Place of birth</FieldLabel>
                    <TextInput id="birthPlace" type="text" placeholder="City, Country" error={errors.birthPlace} {...register('birthPlace')} />
                  </div>
                </>
              )}

              {showProperty && (
                <>
                  <div>
                    <FieldLabel htmlFor="propertyNotes">Property notes</FieldLabel>
                    <textarea
                      id="propertyNotes"
                      rows={4}
                      maxLength={1000}
                      placeholder="Describe the property or add any relevant details..."
                      aria-describedby={errors.propertyNotes ? 'propertyNotes-error' : undefined}
                      aria-invalid={!!errors.propertyNotes}
                      className={`w-full px-3 py-2 rounded-lg border bg-bg text-text text-sm placeholder-muted-text focus-visible:outline-2 focus-visible:outline-accent-text transition-colors resize-none ${errors.propertyNotes ? 'border-rose-text' : 'border-line'}`}
                      {...register('propertyNotes')}
                    />
                    <InlineError id="propertyNotes-error" message={errors.propertyNotes?.message} />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-text mb-1">Floor plan (optional)</p>
                    <FileDropzone
                      onFile={handleFileSelected}
                      onRemove={handleFileRemoved}
                      currentFile={fileMetadata}
                    />
                  </div>
                </>
              )}

              <div>
                <FieldLabel htmlFor="notes">Additional notes</FieldLabel>
                <textarea
                  id="notes"
                  rows={3}
                  maxLength={1000}
                  placeholder="Anything else you'd like to share..."
                  aria-describedby={errors.notes ? 'notes-error' : undefined}
                  aria-invalid={!!errors.notes}
                  className={`w-full px-3 py-2 rounded-lg border bg-bg text-text text-sm placeholder-muted-text focus-visible:outline-2 focus-visible:outline-accent-text transition-colors resize-none ${errors.notes ? 'border-rose-text' : 'border-line'}`}
                  {...register('notes')}
                />
                <InlineError id="notes-error" message={errors.notes?.message} />
              </div>

              <div className="flex gap-3">
                <button type="button" onClick={goBack} className="flex-1 h-12 rounded-xl border border-line text-text font-medium hover:bg-alt-surface transition-colors focus-visible:outline-2 focus-visible:outline-accent-text">Back</button>
                <button type="submit" className="flex-1 h-12 rounded-xl bg-brand-btn-bg text-brand-btn-text font-semibold hover:opacity-90 transition-opacity focus-visible:outline-2 focus-visible:outline-accent-text">Review</button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </form>

      {/* Review modal (step 4) */}
      {showReview && (
        <ReviewModal
          values={{ ...watchedValues, consent: values.consent }}
          onConfirm={handleConfirm}
          onEdit={(step) => { setShowReview(false); dispatch(setStep(step)); }}
          onClose={() => setShowReview(false)}
          isSubmitting={status === 'submitting'}
        />
      )}

      {/* Success modal */}
      {showSuccess && (
        <SuccessModal
          leadId={leadId}
          channelResults={channelResults}
          whatsAppUrl={whatsAppUrl}
          onClose={handleSuccessClose}
        />
      )}
    </div>
  );
}
