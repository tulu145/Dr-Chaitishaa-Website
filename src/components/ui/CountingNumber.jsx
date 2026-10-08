import { useCountUp } from '@/hooks/useCountUp';

export default function CountingNumber({ target, suffix = '', duration = 2000, inView = true }) {
  const animatedValue = useCountUp(target, duration, inView);
  
  return (
    <>
      {animatedValue}{suffix}
    </>
  );
}