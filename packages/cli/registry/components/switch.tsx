'use client';
import { forwardRef, type InputHTMLAttributes } from 'react';
import { cx, type Size } from './utils';
import { useFieldControl } from './form-utils';
export interface SwitchProps extends Omit<
  InputHTMLAttributes<HTMLInputElement>,
  'type' | 'size' | 'role'
> {
  size?: Size;
}
export const Switch = forwardRef<HTMLInputElement, SwitchProps>(function Switch(
  { size = 'md', className, ...props },
  ref,
) {
  const field = useFieldControl(props);
  return (
    <span className={cx('af-switch', `af-switch--${size}`)}>
      <input
        {...props}
        {...field}
        ref={ref}
        type="checkbox"
        role="switch"
        className={cx('af-switch-input', className)}
      />
      <span className="af-switch-track" aria-hidden="true">
        <span className="af-switch-thumb" />
      </span>
    </span>
  );
});

Object.assign(Switch, { __antiflexControl: true });
