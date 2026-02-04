'use client';

import { useEffect, useRef, useState, ReactNode } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

interface ScrollRevealProps {
  children: ReactNode;
  delay?: number;
  direction?: 'up' | 'down' | 'left' | 'right' | 'fade' | 'scale';
  className?: string;
  threshold?: number;
}

export function ScrollReveal({
  children,
  delay = 0,
  direction = 'up',
  className = '',
  threshold = 0.2
}: ScrollRevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold, rootMargin: '0px 0px -50px 0px' }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, [threshold]);

  const getInitialPosition = () => {
    switch (direction) {
      case 'up':
        return { y: 30, opacity: 0 };
      case 'down':
        return { y: -30, opacity: 0 };
      case 'left':
        return { x: 30, opacity: 0 };
      case 'right':
        return { x: -30, opacity: 0 };
      case 'scale':
        return { scale: 0.95, opacity: 0 };
      case 'fade':
        return { opacity: 0 };
      default:
        return { y: 30, opacity: 0 };
    }
  };

  return (
    <motion.div
      ref={ref}
      initial={getInitialPosition()}
      animate={isVisible ? { x: 0, y: 0, scale: 1, opacity: 1 } : getInitialPosition()}
      transition={{
        duration: 0.6,
        delay,
        ease: [0.25, 0.46, 0.45, 0.94], // Custom easing similar to Apple
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

interface ParallaxSectionProps {
  children: ReactNode;
  speed?: number;
  className?: string;
}

export function ParallaxSection({ children, speed = 0.5, className = '' }: ParallaxSectionProps) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });

  // Simplified parallax - only y transform for better performance
  const y = useTransform(scrollYProgress, [0, 1], ['0%', `${speed * 30}%`]);

  return (
    <motion.div
      ref={ref}
      style={{ y, willChange: 'transform' }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

interface StickyScrollProps {
  children: ReactNode;
  className?: string;
  offset?: number;
}

export function StickyScroll({ children, className = '', offset = 128 }: StickyScrollProps) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end end'],
  });

  const opacity = useTransform(scrollYProgress, [0, 0.1, 0.9, 1], [0, 1, 1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.1, 0.9, 1], [0.95, 1, 1, 0.95]);
  const y = useTransform(scrollYProgress, [0, 0.5, 1], [0, -20, 0]);

  return (
    <div ref={ref} className={className}>
      <motion.div
        className="sticky"
        style={{
          top: `${offset}px`,
          opacity,
          scale,
          y,
        }}
      >
        {children}
      </motion.div>
    </div>
  );
}

