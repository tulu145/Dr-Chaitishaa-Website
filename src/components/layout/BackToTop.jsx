import { useEffect, useState } from 'react';
import { ChevronUp } from 'lucide-react';

export default function BackToTop() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    let ticking = false;
    const onScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          setIsVisible(window.scrollY > 600);
          ticking = false;
        });
        ticking = true;
      }
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const scrollToTop = () => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    window.scrollTo({
      top: 0,
      behavior: prefersReducedMotion ? 'auto' : 'smooth'
    });
  };

  if (!isVisible) return null;

  return (
    <button
      onClick={scrollToTop}
      className="fixed bottom-6 left-6 z-40 bg-alt-surface text-text p-3 rounded-full shadow-lg hover:bg-bg border border-line transition-all focus-visible:outline-accent-text animate-in fade-in slide-in-from-bottom-4 no-print"
      aria-label="Back to top"
    >
      <ChevronUp className="w-6 h-6" />
    </button>
  );
}
