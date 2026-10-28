'use client';
import { forwardRef, type TextareaHTMLAttributes } from 'react';
import { cx, type Size } from './utils';
import { useFieldControl } from './form-utils';
export interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  size?: Size;
}
export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(function Textarea(
  { size = 'md', rows = 4, className, ...props },
  ref,
) {
  const field = useFieldControl(props);
  return (
    <textarea
      {...props}
      {...field}
      ref={ref}
      rows={rows}
      className={cx('af-input', 'af-textarea', `af-input--${size}`, className)}
    />
  );
});

Object.assign(Textarea, { __antiflexControl: true });
