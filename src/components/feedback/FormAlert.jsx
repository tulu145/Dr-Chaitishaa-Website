/**
 * FormAlert — a banner-level alert shown above a form on submit failure
 * (e.g. "Please fix the errors below before continuing.").
 * Receives focus when rendered so screen-reader users hear it immediately.
 *
 * Props:
 *   type     'error' | 'success' | 'warning' | 'info'   default 'error'
 *   title    string   bold heading line
 *   message  string   optional body text
 *   id       string   optional id for aria-describedby chains
 */
import { useEffect, useRef } from 'react';

const STYLES = {
  error:   'border-rose-text/40 bg-rose-text/8 text-rose-text',
  success: 'border-accent-text/40 bg-accent-text/8 text-accent-text',
  warning: 'border-amber-600/40 bg-amber-50 text-amber-900 dark:bg-amber-950/30 dark:text-amber-300',
  info:    'border-line bg-alt-surface text-text',
};

const ICONS = {
  error:   <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v4m0 4h.01M10.29 3.86 1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />,
  success: <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 1 1-18 0 9 9 0 0 1 18 0z" />,
  warning: <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v4m0 4h.01M10.29 3.86 1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />,
  info:    <path strokeLinecap="round" strokeLinejoin="round" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0z" />,
};

export default function FormAlert({ type = 'error', title, message, id }) {
  const ref = useRef(null);

  // Move focus to alert so screen readers announce it on appearance
  useEffect(() => {
    ref.current?.focus();
  }, []);

  if (!title) return null;

  return (
    <div
      ref={ref}
      id={id}
      role={type === 'error' ? 'alert' : 'status'}
      aria-live={type === 'error' ? 'assertive' : 'polite'}
      tabIndex={-1}
      className={`flex gap-3 rounded-lg border p-4 text-sm outline-none ${STYLES[type] ?? STYLES.error}`}
    >
      <svg
        width="18"
        height="18"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        className="mt-0.5 shrink-0"
        aria-hidden="true"
      >
        {ICONS[type]}
      </svg>
      <div>
        <p className="font-semibold leading-snug">{title}</p>
        {message && <p className="mt-1 opacity-90">{message}</p>}
      </div>
    </div>
  );
}
