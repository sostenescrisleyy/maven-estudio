import { useEffect, useRef, useState } from 'react';
import { useInView } from 'framer-motion';

interface CounterProps {
  target: number;
  suffix?: string;
  duration?: number;
  className?: string;
}

export function Counter({ target, suffix = '', duration = 2000, className = '' }: CounterProps) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const hasAnimated = useRef(false);

  useEffect(() => {
    if (isInView && !hasAnimated.current) {
      hasAnimated.current = true;
      const startTime = Date.now();
      
      const animate = () => {
        const elapsed = Date.now() - startTime;
        const progress = Math.min(elapsed / duration, 1);
        
        // Easing function (ease-out)
        const easeOut = 1 - Math.pow(1 - progress, 3);
        const currentCount = Math.floor(easeOut * target);
        
        setCount(currentCount);
        
        if (progress < 1) {
          requestAnimationFrame(animate);
        } else {
          setCount(target);
        }
      };
      
      requestAnimationFrame(animate);
    }
  }, [isInView, target, duration]);

  return (
    <span ref={ref} className={className}>
      {count}{suffix}
    </span>
  );
}
