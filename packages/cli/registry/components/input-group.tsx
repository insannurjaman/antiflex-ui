'use client';
import { forwardRef, type HTMLAttributes } from 'react';
import { cx, type Size } from './utils';
export interface InputGroupProps extends HTMLAttributes<HTMLDivElement> {
  size?: Size;
  invalid?: boolean;
}
export const InputGroup = forwardRef<HTMLDivElement, InputGroupProps>(function InputGroup(
  { size = 'md', invalid, className, ...props },
  ref,
) {
  return (
    <div
      {...props}
      ref={ref}
      className={cx('af-input-group', `af-input--${size}`, className)}
      data-invalid={invalid ? '' : undefined}
    />
  );
});
export const InputGroupAddon = forwardRef<
  HTMLSpanElement,
  HTMLAttributes<HTMLSpanElement> & { align?: 'start' | 'end' }
>(function InputGroupAddon({ align = 'start', className, ...props }, ref) {
  return (
    <span
      {...props}
      ref={ref}
      className={cx('af-input-group-addon', className)}
      data-align={align}
    />
  );
});
