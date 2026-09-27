/**
 * UndoToast — manages the 5-second undo countdown after a lead is "received".
 *
 * This is a helper module, not a rendered component itself. It exposes:
 *
 *   showUndoToast({ onUndo, onCommit, durationMs = 5000 })
 *     → Fires a Sonner toast with a live countdown and Undo button.
 *       When the timer expires, calls onCommit().
 *       When Undo is pressed, calls onUndo() and dismisses the toast.
 *
 * The actual <Toaster /> is already mounted in PageShell via Sonner.
 */

import { toast } from 'sonner';

const TOAST_ID = 'booking-undo';

/**
 * @param {object} opts
 * @param {() => void}  opts.onUndo     called when the user presses Undo
 * @param {() => void}  opts.onCommit   called when the 5-second window closes
 * @param {number}      [opts.durationMs=5000]
 */
export function showUndoToast({ onUndo, onCommit, durationMs = 5000 }) {
  let committed = false;

  // Dismiss any existing undo toast first
  toast.dismiss(TOAST_ID);

  // Build a promise that resolves when the duration elapses
  const commitTimer = new Promise((resolve) => {
    setTimeout(() => {
      if (!committed) {
        committed = true;
        resolve();
      }
    }, durationMs);
  });

  commitTimer.then(() => {
    toast.dismiss(TOAST_ID);
    onCommit();
  });

  toast('Request received.', {
    id: TOAST_ID,
    duration: durationMs,
    // Sonner renders the description slot below the title
    description: 'Your consultation request is being processed.',
    action: {
      label: 'Undo',
      onClick: () => {
        if (!committed) {
          committed = true;
          toast.dismiss(TOAST_ID);
          onUndo();
        }
      },
    },
    // Keep visible; Sonner auto-dismisses based on duration
    closeButton: false,
  });
}

/**
 * Cancel a pending undo toast (e.g. when the page unmounts mid-countdown).
 * Does NOT call onCommit or onUndo — the caller is responsible for cleanup.
 */
export function dismissUndoToast() {
  toast.dismiss(TOAST_ID);
}
