import { useState, useEffect } from 'react';
import { rafThrottle } from '@/utils/throttle.js';

/**
 * Returns a number between 0 and 1 representing how far the page has been scrolled.
 * Uses requestAnimationFrame throttling — no forced layouts.
 */
export default function useScrollProgress() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const calculate = () => {
      const scrollTop = window.scrollY || document.documentElement.scrollTop;
      const docHeight =
        document.documentElement.scrollHeight - document.documentElement.clientHeight;
      setProgress(docHeight > 0 ? Math.min(scrollTop / docHeight, 1) : 0);
    };

    const throttled = rafThrottle(calculate);

    window.addEventListener('scroll', throttled, { passive: true });
    // Run once on mount so the bar initialises correctly
    calculate();

    return () => {
      window.removeEventListener('scroll', throttled);
    };
  }, []);

  return progress;
}
