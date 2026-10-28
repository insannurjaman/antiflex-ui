'use client';
import { forwardRef, type HTMLAttributes } from 'react';
import { cx } from './utils';
export const Skeleton = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(
  function Skeleton({ className, ...props }, ref) {
    return <div {...props} ref={ref} aria-hidden="true" className={cx('af-skeleton', className)} />;
  },
);
