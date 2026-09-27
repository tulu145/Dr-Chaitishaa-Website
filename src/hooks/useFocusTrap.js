import { useEffect, useRef } from 'react';

export default function useFocusTrap(isActive) {
  const ref = useRef(null);

  useEffect(() => {
    if (!isActive) return;
    const el = ref.current;
    if (!el) return;

    const focusableEls = el.querySelectorAll(
      'a[href], button, textarea, input[type="text"], input[type="radio"], input[type="checkbox"], select, [tabindex]:not([tabindex="-1"])'
    );
    const first = focusableEls[0];
    const last = focusableEls[focusableEls.length - 1];

    const handleKeyDown = (e) => {
      if (e.key === 'Tab') {
        if (e.shiftKey) {
          if (document.activeElement === first) {
            last.focus();
            e.preventDefault();
          }
        } else {
          if (document.activeElement === last) {
            first.focus();
            e.preventDefault();
          }
        }
      }
    };

    el.addEventListener('keydown', handleKeyDown);
    if (first) first.focus();

    return () => {
      el.removeEventListener('keydown', handleKeyDown);
    };
  }, [isActive]);

  return ref;
}
