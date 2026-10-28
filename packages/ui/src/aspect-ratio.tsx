'use client';
import { forwardRef, type HTMLAttributes } from 'react';
import { cx } from './utils';
export interface AspectRatioProps extends HTMLAttributes<HTMLDivElement> {
  ratio?: number;
}
export const AspectRatio = forwardRef<HTMLDivElement, AspectRatioProps>(function AspectRatio(
  { ratio = 16 / 9, style, className, ...props },
  ref,
) {
  return (
    <div
      {...props}
      ref={ref}
      className={cx('af-aspect-ratio', className)}
      style={{ ...style, aspectRatio: Number.isFinite(ratio) && ratio > 0 ? ratio : 16 / 9 }}
    />
  );
});
