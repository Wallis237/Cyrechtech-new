
import React, { useEffect, useRef, useState } from 'react';

interface AnimationWrapperProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  animation?: 'fadeUp' | 'fadeIn' | 'slideLeft' | 'slideRight' | 'scaleIn' | 'fadeUpScale' | 'dropDown';
  trigger?: 'scroll' | 'load';
  threshold?: number;
  stagger?: number;
}

const AnimationWrapper: React.FC<AnimationWrapperProps> = ({ 
  children, 
  className = "", 
  delay = 0,
  animation = 'fadeUp',
  trigger = 'scroll',
  threshold = 0.1,
  stagger = 0
}) => {
  const elementRef = useRef<HTMLDivElement>(null);
  const animationTimeoutRef = useRef<number | undefined>(undefined);
  const [hasAnimated, setHasAnimated] = useState(false);

  useEffect(() => {
    const element = elementRef.current;
    if (!element || hasAnimated) return;

    // Add initial animation class
    element.classList.add(`animate-${animation}-initial`);

    if (trigger === 'load') {
      // Trigger animation immediately with delay
      animationTimeoutRef.current = window.setTimeout(() => {
        if (!hasAnimated) {
          element.classList.remove(`animate-${animation}-initial`);
          element.classList.add(`animate-${animation}-visible`);
          setHasAnimated(true);
        }
      }, delay + stagger);
      
      return () => {
        if (animationTimeoutRef.current !== undefined) {
          window.clearTimeout(animationTimeoutRef.current);
        }
      };
    }

    // Enhanced scroll-based animation with once-only trigger
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !hasAnimated) {
            animationTimeoutRef.current = window.setTimeout(() => {
              if (!hasAnimated) {
                entry.target.classList.remove(`animate-${animation}-initial`);
                entry.target.classList.add(`animate-${animation}-visible`);
                setHasAnimated(true);
                observer.unobserve(entry.target);
              }
            }, delay + stagger);
          }
        });
      },
      { 
        threshold,
        rootMargin: '0px 0px -50px 0px' // Trigger slightly before element fully visible
      }
    );

    observer.observe(element);

    return () => {
      if (element) {
        observer.unobserve(element);
        if (animationTimeoutRef.current !== undefined) {
          window.clearTimeout(animationTimeoutRef.current);
        }
      }
    };
  }, [delay, animation, trigger, threshold, stagger, hasAnimated]);

  return (
    <div ref={elementRef} className={`animation-wrapper ${className}`}>
      {children}
    </div>
  );
};

export default AnimationWrapper;
