'use client';
import { forwardRef, type ProgressHTMLAttributes } from 'react';
import { cx, type Size } from './utils';
export interface ProgressProps extends Omit<
  ProgressHTMLAttributes<HTMLProgressElement>,
  'value' | 'max'
> {
  value?: number;
  max?: number;
  size?: Size;
}
export const Progress = forwardRef<HTMLProgressElement, ProgressProps>(function Progress(
  { value, max = 100, size = 'md', className, ...props },
  ref,
) {
  const limit = Number.isFinite(max) && max > 0 ? max : 100;
  const amount =
    value === undefined || !Number.isFinite(value)
      ? undefined
      : Math.max(0, Math.min(limit, value));
  return (
    <progress
      {...props}
      ref={ref}
      max={limit}
      value={amount}
      className={cx('af-progress', `af-progress--${size}`, className)}
    />
  );
});
