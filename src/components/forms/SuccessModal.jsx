/**
 * SuccessModal — shown after the undo window closes and the lead is committed.
 * Displays the reference number, channel results, and the WhatsApp CTA.
 *
 * Props:
 *   leadId        string
 *   channelResults  { sheet: string, email: string }
 *   whatsAppUrl   string
 *   onClose       () => void
 */
import { useRef, useEffect } from 'react';
import { openWhatsApp } from '@/services/whatsapp.js';
import useFocusTrap from '@/hooks/useFocusTrap.js';

function ChannelBadge({ label, status }) {
  const ok = status === 'ok';
  const skipped = status === 'skipped';
  return (
    <div className={`flex items-center gap-1.5 text-xs px-2 py-1 rounded-full ${
      ok ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300' :
      skipped ? 'bg-alt-surface text-muted-text' :
      'bg-rose-text/10 text-rose-text'
    }`}>
      {ok && <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><polyline points="20 6 9 17 4 12" /></svg>}
      {!ok && !skipped && <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" /></svg>}
      {label} {ok ? 'sent' : skipped ? 'skipped' : 'failed'}
    </div>
  );
}

export default function SuccessModal({ leadId, channelResults, whatsAppUrl, onClose }) {
  const dialogRef = useRef(null);
  const waButtonRef = useRef(null);
  useFocusTrap(dialogRef);

  const bothFailed =
    channelResults.sheet === 'failed' && channelResults.email === 'failed';

  useEffect(() => {
    const handler = (e) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [onClose]);

  // Attempt one automatic WhatsApp open
  useEffect(() => {
    if (whatsAppUrl && !bothFailed) {
      openWhatsApp(whatsAppUrl);
    }
  // Only run once on mount
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-4">
      <div className="absolute inset-0 bg-text/50 backdrop-blur-sm" onClick={onClose} aria-hidden="true" />
      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="success-title"
        className="relative w-full max-w-md bg-bg rounded-2xl shadow-2xl p-8 text-center"
      >
        {/* Icon */}
        <div className="mx-auto mb-4 w-14 h-14 rounded-full bg-accent-text/10 flex items-center justify-center">
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-accent-text" aria-hidden="true">
            <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" /><polyline points="22 4 12 14.01 9 11.01" />
          </svg>
        </div>

        <h2 id="success-title" className="font-display text-2xl text-text mb-2">
          {bothFailed ? 'Submission issue' : 'Request received'}
        </h2>

        {bothFailed ? (
          <p className="text-sm text-muted-text mb-4">
            We could not record your request automatically. Please contact Dr. Chaitishaa directly.
          </p>
        ) : (
          <p className="text-sm text-muted-text mb-4">
            Your consultation request has been sent. Dr. Chaitishaa will be in touch soon.
          </p>
        )}

        {/* Reference number */}
        {leadId && (
          <p className="text-xs text-muted-text mb-4">
            Reference: <span className="font-mono text-text">{leadId.slice(0, 8).toUpperCase()}</span>
          </p>
        )}

        {/* Channel results */}
        <div className="flex justify-center gap-2 mb-6 flex-wrap">
          <ChannelBadge label="Booking form" status={channelResults.sheet} />
          <ChannelBadge label="Email" status={channelResults.email} />
        </div>

        {/* WhatsApp CTA */}
        {whatsAppUrl && (
          <a
            ref={waButtonRef}
            href={whatsAppUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 w-full h-12 rounded-xl bg-brand-btn-bg text-brand-btn-text font-semibold text-sm hover:opacity-90 transition-opacity focus-visible:outline-2 focus-visible:outline-accent-text mb-3"
          >
            <svg width="18" height="18" viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M16 2C8.268 2 2 8.268 2 16c0 2.49.64 4.83 1.77 6.87L2 30l7.32-1.73A13.92 13.92 0 0 0 16 30c7.732 0 14-6.268 14-14S23.732 2 16 2z" />
              <path d="M11.5 10.5c.3.8 1 2.5 1.1 2.7.1.2.2.4.1.7-.2.3-.3.5-.5.7-.2.2-.4.5-.2.9.2.4 1 1.7 2.2 2.7 1.5 1.3 2.8 1.7 3.2 1.9.4.2.6.1.9-.1.2-.2.9-1.1 1.2-1.5.3-.4.5-.3.9-.2.4.1 2.5 1.2 2.9 1.4.4.2.7.3.8.5.1.5-.1 1.8-1 2.5-.7.6-1.5.9-2.5.9-1.7 0-4.1-1-6.5-3.3-2.5-2.4-3.5-4.9-3.5-6.6 0-1 .3-1.8.9-2.5.5-.5 1.1-.8 1.5-.8.4 0 .7 0 1 .1z" />
            </svg>
            Continue on WhatsApp
          </a>
        )}

        {/* Fallback contacts if both failed */}
        {bothFailed && (
          <div className="mb-4 text-sm space-y-1">
            <a href="tel:+919051375635" className="block text-accent-text underline underline-offset-2 focus-visible:outline-2 focus-visible:outline-accent-text rounded">
              Call +91 9051375635
            </a>
          </div>
        )}

        <button
          type="button"
          onClick={onClose}
          className="text-sm text-muted-text underline underline-offset-2 hover:text-text focus-visible:outline-2 focus-visible:outline-accent-text rounded"
        >
          Close
        </button>
      </div>
    </div>
  );
}
