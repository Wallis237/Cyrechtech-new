import React, { Children, cloneElement, isValidElement } from 'react';
import AnimationWrapper from './AnimationWrapper';

interface StaggeredAnimationGroupProps {
  children: React.ReactNode;
  animation?: 'fadeUp' | 'fadeIn' | 'slideLeft' | 'slideRight' | 'scaleIn' | 'fadeUpScale';
  staggerDelay?: number;
  baseDelay?: number;
  trigger?: 'scroll' | 'load';
  threshold?: number;
  className?: string;
}

const StaggeredAnimationGroup: React.FC<StaggeredAnimationGroupProps> = ({
  children,
  animation = 'fadeUp',
  staggerDelay = 100,
  baseDelay = 0,
  trigger = 'scroll',
  threshold = 0.1,
  className = ''
}) => {
  const childArray = Children.toArray(children);

  return (
    <div className={className}>
      {childArray.map((child, index) => {
        if (isValidElement(child)) {
          return (
            <AnimationWrapper
              key={index}
              animation={animation}
              delay={baseDelay}
              stagger={index * staggerDelay}
              trigger={trigger}
              threshold={threshold}
            >
              {child}
            </AnimationWrapper>
          );
        }
        return child;
      })}
    </div>
  );
};

export default StaggeredAnimationGroup;