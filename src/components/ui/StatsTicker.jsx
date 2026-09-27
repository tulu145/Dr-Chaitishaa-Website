import { useEffect, useState, useRef } from 'react';
import { companyStats } from '@/data/stats';

export default function StatsTicker() {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);
  
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.2 }
    );
    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className="py-12 bg-alt-surface border-y border-line">
      <div className="max-w-[1200px] mx-auto px-6 grid grid-cols-2 md:grid-cols-5 gap-6 md:gap-4 text-center">
        {companyStats.map((stat, i) => (
          <div 
            key={stat.id} 
            className={`flex flex-col gap-2 transition-all duration-700 delay-${i * 100} ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
            } motion-reduce:transition-none motion-reduce:opacity-100 motion-reduce:translate-y-0`}
          >
            <span className="font-display text-4xl text-accent-text">{stat.value}</span>
            <span className="text-sm text-muted-text font-medium uppercase tracking-wider">{stat.label}</span>
          </div>
        ))}
      </div>
    </section>
  );
}
