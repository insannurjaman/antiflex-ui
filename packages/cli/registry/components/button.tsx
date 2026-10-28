'use client';
import { forwardRef, type ButtonHTMLAttributes } from 'react';
import { type Size, cx } from './utils';
import { Spinner } from './spinner';
export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost' | 'danger';
  size?: Size;
  loading?: boolean;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(function Button(
  {
    variant = 'primary',
    size = 'md',
    loading = false,
    disabled,
    className,
    children,
    type = 'button',
    ...props
  },
  ref,
) {
  return (
    <button
      {...props}
      ref={ref}
      type={type}
      disabled={disabled || loading}
      aria-busy={loading || undefined}
      className={cx('af-button', `af-button--${variant}`, `af-button--${size}`, className)}
    >
      {loading && <Spinner aria-hidden="true" />}
      {children}
    </button>
  );
});
