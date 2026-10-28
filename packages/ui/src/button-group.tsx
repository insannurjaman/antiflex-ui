'use client';
import { forwardRef, type HTMLAttributes } from 'react';
import { cx } from './utils';
export interface ButtonGroupProps extends HTMLAttributes<HTMLDivElement> {
  orientation?: 'horizontal' | 'vertical';
}
export const ButtonGroup = forwardRef<HTMLDivElement, ButtonGroupProps>(function ButtonGroup(
  { orientation = 'horizontal', className, ...props },
  ref,
) {
  return (
    <div
      {...props}
      ref={ref}
      role="group"
      className={cx('af-button-group', className)}
      data-orientation={orientation}
    />
  );
});
