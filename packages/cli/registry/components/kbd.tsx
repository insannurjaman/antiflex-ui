'use client';
import { forwardRef, type HTMLAttributes } from 'react';
import { cx } from './utils';
export const Kbd = forwardRef<HTMLElement, HTMLAttributes<HTMLElement>>(function Kbd(
  { className, ...props },
  ref,
) {
  return <kbd {...props} ref={ref} className={cx('af-kbd', className)} />;
});
export const KbdGroup = forwardRef<HTMLSpanElement, HTMLAttributes<HTMLSpanElement>>(
  function KbdGroup({ className, ...props }, ref) {
    return <span {...props} ref={ref} className={cx('af-kbd-group', className)} />;
  },
);
