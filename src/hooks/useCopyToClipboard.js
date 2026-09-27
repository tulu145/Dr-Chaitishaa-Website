import { useState, useCallback } from 'react';

/**
 * Returns [copied, copy] where:
 *   copied  — boolean, true for `resetMs` milliseconds after a successful copy
 *   copy(text) — async function that writes `text` to the clipboard
 *
 * Falls back to a hidden <textarea> trick for browsers without
 * navigator.clipboard (older iOS, non-secure contexts).
 */
export default function useCopyToClipboard(resetMs = 1500) {
  const [copied, setCopied] = useState(false);

  const copy = useCallback(
    async (text) => {
      if (!text) return;
      try {
        if (navigator.clipboard) {
          await navigator.clipboard.writeText(text);
        } else {
          // Fallback for older browsers / non-HTTPS
          const ta = document.createElement('textarea');
          ta.value = text;
          ta.style.cssText = 'position:fixed;top:-9999px;left:-9999px;opacity:0';
          document.body.appendChild(ta);
          ta.focus();
          ta.select();
          document.execCommand('copy');
          document.body.removeChild(ta);
        }
        setCopied(true);
        const id = setTimeout(() => setCopied(false), resetMs);
        return () => clearTimeout(id);
      } catch (err) {
        console.warn('Copy to clipboard failed:', err);
      }
    },
    [resetMs]
  );

  return [copied, copy];
}
