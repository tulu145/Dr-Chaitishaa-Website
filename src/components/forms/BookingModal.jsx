/**
 * BookingModal — global deep-linkable booking modal.
 * Controlled by uiSlice (bookingModalOpen / bookingModalType).
 * Deep-link: any route can open it with ?book=<consultationType>.
 *
 * Mounted once in PageShell so it's available on every page.
 */
import { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useSearchParams } from 'react-router-dom';
import {
  closeBookingModal,
  selectBookingModalOpen,
  selectBookingModalType,
  openBookingModal,
} from '@/redux/slices/uiSlice.js';
import useFocusTrap from '@/hooks/useFocusTrap.js';
import BookingWizard from './BookingWizard.jsx';

export default function BookingModal() {
  const dispatch = useDispatch();
  const open = useSelector(selectBookingModalOpen);
  const consultationType = useSelector(selectBookingModalType);
  const dialogRef = useRef(null);
  const [searchParams, setSearchParams] = useSearchParams();

  useFocusTrap(dialogRef, open);

  // Deep-link: ?book=<type> opens the modal
  useEffect(() => {
    const bookParam = searchParams.get('book');
    if (bookParam) {
      dispatch(openBookingModal(bookParam));
      // Clean the param from the URL without navigation
      const next = new URLSearchParams(searchParams);
      next.delete('book');
      setSearchParams(next, { replace: true });
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Escape closes
  useEffect(() => {
    if (!open) return;
    const handler = (e) => { if (e.key === 'Escape') dispatch(closeBookingModal()); };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [open, dispatch]);

  // Prevent body scroll while open
  useEffect(() => {
    if (open) {
      document.documentElement.style.overflow = 'hidden';
    } else {
      document.documentElement.style.overflow = '';
    }
    return () => { document.documentElement.style.overflow = ''; };
  }, [open]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-40 flex items-end sm:items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-text/50 backdrop-blur-sm"
        onClick={() => dispatch(closeBookingModal())}
        aria-hidden="true"
      />

      {/* Panel */}
      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="booking-modal-title"
        className="relative w-full max-w-lg bg-bg rounded-2xl shadow-2xl max-h-[92vh] flex flex-col overflow-hidden"
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 pt-6 pb-4 border-b border-line shrink-0">
          <h2 id="booking-modal-title" className="font-display text-2xl text-text">
            Book a Consultation
          </h2>
          <button
            type="button"
            onClick={() => dispatch(closeBookingModal())}
            aria-label="Close booking form"
            className="text-muted-text hover:text-text transition-colors focus-visible:outline-2 focus-visible:outline-accent-text rounded p-1"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>

        {/* Scrollable wizard */}
        <div className="overflow-y-auto px-6 py-6 flex-1">
          <BookingWizard
            initialType={consultationType}
            onDone={() => dispatch(closeBookingModal())}
          />
        </div>
      </div>
    </div>
  );
}
