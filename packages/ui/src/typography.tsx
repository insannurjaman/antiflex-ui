'use client';
import { forwardRef, type HTMLAttributes } from 'react';
import { cx } from './utils';
export interface TypographyProps extends HTMLAttributes<HTMLDivElement> {
  size?: 'sm' | 'md';
}
/** Styles semantic HTML descendants. The wrapper does not infer document headings. */
export const Typography = forwardRef<HTMLDivElement, TypographyProps>(function Typography(
  { size = 'md', className, ...props },
  ref,
) {
  return (
    <div
      {...props}
      ref={ref}
      className={cx('af-typography', `af-typography--${size}`, className)}
    />
  );
});
