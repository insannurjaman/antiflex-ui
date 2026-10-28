'use client';
import {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useRef,
  type InputHTMLAttributes,
} from 'react';
import { cx, type Size } from './utils';
import { useFieldControl } from './form-utils';
export interface CheckboxProps extends Omit<
  InputHTMLAttributes<HTMLInputElement>,
  'type' | 'size'
> {
  size?: Size;
  indeterminate?: boolean;
}
export const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(function Checkbox(
  { size = 'md', indeterminate = false, className, ...props },
  ref,
) {
  const local = useRef<HTMLInputElement>(null);
  useImperativeHandle(ref, () => local.current!, []);
  useEffect(() => {
    if (local.current) local.current.indeterminate = indeterminate;
  }, [indeterminate]);
  const field = useFieldControl(props);
  return (
    <input
      {...props}
      {...field}
      ref={local}
      type="checkbox"
      className={cx('af-checkbox', `af-checkbox--${size}`, className)}
    />
  );
});

Object.assign(Checkbox, { __antiflexControl: true });
