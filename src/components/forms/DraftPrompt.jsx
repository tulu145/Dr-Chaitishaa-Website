/**
 * DraftPrompt — shown when a saved booking draft is detected on mount.
 * Offers "Resume Draft" or "Discard".
 *
 * Props:
 *   savedAt   string  ISO date string when draft was saved
 *   onResume  () => void
 *   onDiscard () => void
 */
import { formatDate } from '@/utils/format.js';

export default function DraftPrompt({ savedAt, onResume, onDiscard }) {
  const saved = savedAt ? new Date(savedAt) : null;
  const dateStr = saved ? formatDate(saved.toISOString().split('T')[0]) : '';
  const timeStr = saved ? saved.toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' }) : '';

  return (
    <div
      role="alert"
      className="mb-6 rounded-xl border border-accent-text/30 bg-accent-text/8 p-5 flex flex-col sm:flex-row sm:items-center gap-4"
    >
      <div className="flex-1">
        <p className="font-semibold text-text text-sm">You have a saved draft</p>
        {saved && (
          <p className="text-xs text-muted-text mt-0.5">
            Saved on {dateStr} at {timeStr}. Drafts are stored on this device only and expire after 24 hours.
          </p>
        )}
      </div>
      <div className="flex gap-3 shrink-0">
        <button
          type="button"
          onClick={onDiscard}
          className="px-4 py-2 rounded-lg text-sm border border-line text-muted-text hover:text-text hover:border-text transition-colors focus-visible:outline-2 focus-visible:outline-accent-text"
        >
          Discard
        </button>
        <button
          type="button"
          onClick={onResume}
          className="px-4 py-2 rounded-lg text-sm bg-brand-btn-bg text-brand-btn-text hover:opacity-90 transition-opacity focus-visible:outline-2 focus-visible:outline-accent-text"
        >
          Resume draft
        </button>
      </div>
    </div>
  );
}
