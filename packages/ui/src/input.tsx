'use client';
import { forwardRef, type InputHTMLAttributes } from 'react';
import { cx, type Size } from './utils';
import { useFieldControl } from './form-utils';
export interface InputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'size'> {
  size?: Size;
}
export const Input = forwardRef<HTMLInputElement, InputProps>(function Input(
  { size = 'md', className, type = 'text', ...props },
  ref,
) {
  const field = useFieldControl(props);
  return (
    <input
      {...props}
      {...field}
      ref={ref}
      type={type}
      className={cx('af-input', `af-input--${size}`, className)}
    />
  );
});

Object.assign(Input, { __antiflexControl: true });
