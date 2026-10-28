'use client';
import { forwardRef, type ButtonHTMLAttributes } from 'react';
import { useControllable } from './interaction-utils';
import { cx, type Size } from './utils';
export interface ToggleProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  pressed?: boolean;
  defaultPressed?: boolean;
  onPressedChange?: (pressed: boolean) => void;
  variant?: 'default' | 'outline';
  size?: Size;
}
export const Toggle = forwardRef<HTMLButtonElement, ToggleProps>(function Toggle(
  {
    pressed,
    defaultPressed = false,
    onPressedChange,
    variant = 'default',
    size = 'md',
    type = 'button',
    className,
    onClick,
    disabled,
    ...props
  },
  ref,
) {
  const [active, setActive] = useControllable(pressed, defaultPressed, onPressedChange);
  return (
    <button
      {...props}
      ref={ref}
      type={type}
      disabled={disabled}
      aria-pressed={active}
      className={cx('af-toggle', `af-toggle--${variant}`, `af-toggle--${size}`, className)}
      onClick={(event) => {
        onClick?.(event);
        if (!event.defaultPrevented && !disabled) setActive(!active);
      }}
    />
  );
});
