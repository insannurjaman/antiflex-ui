'use client';
import { forwardRef, type HTMLAttributes } from 'react';
import { cx, type Size } from './utils';
export interface SpinnerProps extends Omit<HTMLAttributes<HTMLSpanElement>, 'children'> {
  size?: Size;
  label?: string;
}
export const Spinner = forwardRef<HTMLSpanElement, SpinnerProps>(function Spinner(
  { size = 'sm', label, className, ...props },
  ref,
) {
  return (
    <span
      role={label ? 'status' : undefined}
      aria-hidden={label ? undefined : true}
      {...props}
      ref={ref}
      className={cx('af-loading', `af-loading--${size}`, className)}
    >
      <span className="af-spinner" aria-hidden="true" />
      {label && <span className="af-sr-only">{label}</span>}
    </span>
  );
});
