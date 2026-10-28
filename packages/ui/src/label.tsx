'use client';
import { forwardRef, type LabelHTMLAttributes } from 'react';
import { cx } from './utils';
export interface LabelProps extends LabelHTMLAttributes<HTMLLabelElement> {
  required?: boolean;
}
export const Label = forwardRef<HTMLLabelElement, LabelProps>(function Label(
  { className, required, children, ...props },
  ref,
) {
  return (
    <label {...props} ref={ref} className={cx('af-field-label', className)}>
      {children}
      {required && <span aria-hidden="true"> *</span>}
    </label>
  );
});
