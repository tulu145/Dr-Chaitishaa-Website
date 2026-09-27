/**
 * ReviewModal — step 4 of the booking wizard.
 * Lists every form value with "Edit" links per section, a consent checkbox,
 * and the "Confirm and send" primary action.
 *
 * Props:
 *   values        object   current wizard values
 *   onConfirm     () => void
 *   onEdit(step)  (number) => void   jump to a specific step
 *   onClose       () => void
 *   isSubmitting  boolean
 */
import { useRef, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { updateValues } from '@/redux/slices/bookingDraftSlice.js';
import useFocusTrap from '@/hooks/useFocusTrap.js';
import { formatDate, formatTime, formatConsultationType } from '@/utils/format.js';
import { BIRTH_REQUIRED_TYPES, PROPERTY_REQUIRED_TYPES } from '@/utils/constants.js';

function Row({ label, value }) {
  if (!value) return null;
  return (
    <div className="flex justify-between gap-4 py-2 border-b border-line last:border-0 text-sm">
      <span className="text-muted-text shrink-0">{label}</span>
      <span className="text-text text-right">{value}</span>
    </div>
  );
}

function Section({ title, onEdit, children }) {
  return (
    <div className="mb-5">
      <div className="flex items-center justify-between mb-2">
        <h3 className="text-xs font-semibold uppercase tracking-wider text-muted-text">{title}</h3>
        <button
          type="button"
          onClick={onEdit}
          className="text-xs text-accent-text underline underline-offset-2 hover:no-underline focus-visible:outline-2 focus-visible:outline-accent-text rounded"
        >
          Edit
        </button>
      </div>
      <div className="rounded-lg border border-line bg-alt-surface px-4">{children}</div>
    </div>
  );
}

export default function ReviewModal({ values, onConfirm, onEdit, onClose, isSubmitting }) {
  const dispatch = useDispatch();
  const dialogRef = useRef(null);
  useFocusTrap(dialogRef);

  // Close on Escape
  useEffect(() => {
    const handler = (e) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [onClose]);

  const showBirth = BIRTH_REQUIRED_TYPES.includes(values.consultationType);
  const showProperty = PROPERTY_REQUIRED_TYPES.includes(values.consultationType);

  const handleConsentChange = (e) => {
    dispatch(updateValues({ consent: e.target.checked }));
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-4">
      <div className="absolute inset-0 bg-text/50 backdrop-blur-sm" onClick={onClose} aria-hidden="true" />
      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="review-title"
        className="relative w-full max-w-lg bg-bg rounded-2xl shadow-2xl max-h-[90vh] flex flex-col"
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 pt-6 pb-4 border-b border-line shrink-0">
          <h2 id="review-title" className="font-display text-2xl text-text">Review your request</h2>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close review"
            className="text-muted-text hover:text-text transition-colors focus-visible:outline-2 focus-visible:outline-accent-text rounded"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" /></svg>
          </button>
        </div>

        {/* Scrollable body */}
        <div className="overflow-y-auto px-6 py-4 flex-1">
          <Section title="Service" onEdit={() => onEdit(1)}>
            <Row label="Consultation type" value={formatConsultationType(values.consultationType)} />
          </Section>

          <Section title="Contact details" onEdit={() => onEdit(1)}>
            <Row label="Name" value={values.name} />
            <Row label="Email" value={values.email} />
            <Row label="Phone" value={`${values.countryCode} ${values.phone}`} />
          </Section>

          <Section title="Schedule" onEdit={() => onEdit(2)}>
            <Row label="Preferred date" value={formatDate(values.preferredDate)} />
            <Row label="Preferred time" value={formatTime(values.preferredTime)} />
            <Row label="Timezone" value={values.timezone} />
          </Section>

          {showBirth && (
            <Section title="Birth details" onEdit={() => onEdit(3)}>
              <Row label="Birth date" value={formatDate(values.birthDate)} />
              <Row label="Birth time" value={values.birthTime ? formatTime(values.birthTime) : undefined} />
              <Row label="Birth place" value={values.birthPlace} />
            </Section>
          )}

          {showProperty && (
            <Section title="Property details" onEdit={() => onEdit(3)}>
              <Row label="Notes" value={values.propertyNotes} />
            </Section>
          )}

          {values.notes && (
            <Section title="Additional notes" onEdit={() => onEdit(3)}>
              <Row label="Notes" value={values.notes} />
            </Section>
          )}

          {/* Consent */}
          <label className="flex items-start gap-3 cursor-pointer mt-2">
            <input
              type="checkbox"
              checked={!!values.consent}
              onChange={handleConsentChange}
              className="mt-0.5 w-4 h-4 accent-brand-btn-bg focus-visible:outline-2 focus-visible:outline-accent-text"
              aria-describedby="consent-description"
            />
            <span id="consent-description" className="text-sm text-muted-text leading-relaxed">
              I agree to share the above information for arranging my consultation. I have read the{' '}
              <a href="/privacy" target="_blank" rel="noopener noreferrer" className="text-accent-text underline underline-offset-2">Privacy Policy</a>.
            </span>
          </label>
        </div>

        {/* Footer */}
        <div className="px-6 py-4 border-t border-line shrink-0">
          <button
            type="button"
            onClick={onConfirm}
            disabled={!values.consent || isSubmitting}
            className="w-full h-12 rounded-xl bg-brand-btn-bg text-brand-btn-text font-semibold hover:opacity-90 transition-opacity disabled:opacity-50 focus-visible:outline-2 focus-visible:outline-accent-text"
          >
            {isSubmitting ? 'Sending...' : 'Confirm and send'}
          </button>
        </div>
      </div>
    </div>
  );
}
