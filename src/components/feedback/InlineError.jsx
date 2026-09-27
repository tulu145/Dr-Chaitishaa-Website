/**
 * InlineError — renders a single field-level validation error message.
 * Pair with a form input via aria-describedby on the input.
 *
 * Props:
 *   id       string   must match the input's aria-describedby value
 *   message  string   error text; renders nothing when falsy
 */
export default function InlineError({ id, message }) {
  if (!message) return null;
  return (
    <p
      id={id}
      role="alert"
      aria-live="polite"
      className="mt-1 text-sm text-rose-text flex items-center gap-1"
    >
      <span aria-hidden="true">
        {/* Simple X circle using inline SVG — no Lucide import needed at this size */}
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <circle cx="12" cy="12" r="10" />
          <line x1="15" y1="9" x2="9" y2="15" />
          <line x1="9" y1="9" x2="15" y2="15" />
        </svg>
      </span>
      {message}
    </p>
  );
}
