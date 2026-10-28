'use client';
import { forwardRef, type HTMLAttributes } from 'react';
import { cx } from './utils';
export interface CardProps extends HTMLAttributes<HTMLDivElement> {
  variant?: 'outline' | 'subtle';
  padding?: 'none' | 'sm' | 'md' | 'lg';
}

export const Card = forwardRef<HTMLDivElement, CardProps>(function Card(
  { variant = 'outline', padding = 'md', className, ...props },
  ref,
) {
  return (
    <div
      {...props}
      ref={ref}
      className={cx('af-card', `af-card--${variant}`, `af-card--${padding}`, className)}
    />
  );
});
