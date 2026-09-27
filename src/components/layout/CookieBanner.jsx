import { useDispatch, useSelector } from 'react-redux';
import {
  acceptCookies,
  declineCookies,
  selectCookieConsent,
} from '@/redux/slices/uiSlice.js';
import { loadGtm } from '@/services/analytics.js';

const GTM_ID = import.meta.env.VITE_GTM_ID ?? '';

export default function CookieBanner() {
  const dispatch = useDispatch();
  const consent = useSelector(selectCookieConsent);

  // Banner only shown when consent is unset
  if (consent !== 'unset') return null;

  const handleAccept = () => {
    dispatch(acceptCookies());
    if (GTM_ID) loadGtm(GTM_ID);
  };

  const handleDecline = () => {
    dispatch(declineCookies());
  };

  return (
    <div
      role="region"
      aria-label="Cookie consent"
      className="fixed bottom-0 left-0 w-full bg-alt-surface border-t border-line p-4 md:p-6 z-50 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.1)]"
    >
      <div className="max-w-[1200px] mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        <p className="text-sm text-text flex-1">
          We use cookies to improve your experience and analyse site traffic. By continuing, you
          agree to our{' '}
          <a
            href="/privacy"
            className="text-accent-text underline underline-offset-2 focus-visible:outline-2 focus-visible:outline-accent-text rounded"
          >
            Privacy Policy
          </a>
          .
        </p>
        <div className="flex items-center gap-3 w-full md:w-auto">
          {/* Decline and Accept have equal visual weight per spec §5.6f */}
          <button
            type="button"
            onClick={handleDecline}
            className="flex-1 md:flex-none px-4 py-2 border border-line rounded text-text font-medium hover:bg-bg transition-colors focus-visible:outline-2 focus-visible:outline-accent-text"
          >
            Decline
          </button>
          <button
            type="button"
            onClick={handleAccept}
            className="flex-1 md:flex-none px-4 py-2 bg-brand-btn-bg text-brand-btn-text rounded font-medium hover:opacity-90 transition-opacity focus-visible:outline-2 focus-visible:outline-accent-text"
          >
            Accept
          </button>
        </div>
      </div>
    </div>
  );
}
