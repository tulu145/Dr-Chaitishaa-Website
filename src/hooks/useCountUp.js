import { useState, useEffect } from 'react';

/**
 * Custom hook for counter animation
 * @param {number} target - Target number to count to
 * @param {number} duration - Duration in milliseconds
 * @param {boolean} trigger - When to start animation
 * @returns {number} Current count value
 */
export function useCountUp(target, duration = 2000, trigger = true) {
  const [count, setCount] = useState(0);
  const [hasStarted, setHasStarted] = useState(false);

  useEffect(() => {
    if (!trigger || hasStarted) return;
    
    setHasStarted(true);
    const startTime = Date.now();
    
    const animate = () => {
      const now = Date.now();
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      
      // Easing function for smooth animation
      const easeOutCubic = 1 - Math.pow(1 - progress, 3);
      const currentValue = Math.floor(easeOutCubic * target);
      
      setCount(currentValue);
      
      if (progress < 1) {
        requestAnimationFrame(animate);
      } else {
        setCount(target);
      }
    };
    
    requestAnimationFrame(animate);
  }, [target, duration, trigger, hasStarted]);

  return count;
}