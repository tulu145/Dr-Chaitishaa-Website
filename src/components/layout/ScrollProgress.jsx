import { useEffect, useRef } from 'react';

export default function ScrollProgress() {
  const barRef = useRef(null);

  useEffect(() => {
    let ticking = false;
    const onScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          if (barRef.current) {
            const winScroll = document.documentElement.scrollTop;
            const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
            const scrolled = height > 0 ? (winScroll / height) : 0;
            barRef.current.style.transform = `scaleX(${scrolled})`;
          }
          ticking = false;
        });
        ticking = true;
      }
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <div
      className="fixed top-0 left-0 h-[2px] w-full bg-accent-text z-50 origin-left no-print"
      style={{ transform: 'scaleX(0)', transition: 'transform 0.1s ease-out' }}
      ref={barRef}
    />
  );
}
