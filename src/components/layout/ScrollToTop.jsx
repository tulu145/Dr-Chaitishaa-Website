import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

/**
 * ScrollToTop — automatically scrolls to the top when the pathname changes.
 * If there's a #hash fragment, scrolls to that element instead.
 * Works seamlessly with Framer Motion page transitions.
 *
 * Mount this once in the root layout (e.g., PageShell).
 */
export default function ScrollToTop() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    // If there's a hash, scroll to that element after a brief delay
    // (allows the page to mount first)
    if (hash) {
      const element = document.querySelector(hash);
      if (element) {
        setTimeout(() => {
          element.scrollIntoView({ behavior: 'smooth' });
        }, 50);
      }
    } else {
      // No hash — scroll to top
      window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
    }
  }, [pathname, hash]);

  return null;
}
