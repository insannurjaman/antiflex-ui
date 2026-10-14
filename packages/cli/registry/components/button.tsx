'use client';

import { forwardRef, type ButtonHTMLAttributes } from 'react';
import { cx, type Size } from './utils';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: 'primary' | 'secondary' | 'ghost' | 'danger';
    size?: Size;
    loading?: boolean;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(function Button({ variant = 'primary', size = 'md', loading = false, disabled, className, children, type = 'button', ...props }, ref) {
    return (<button {...props} ref={ref} type={type} disabled={disabled || loading} aria-busy={loading || undefined} className={cx('ch-button', `ch-button--${variant}`, `ch-button--${size}`, className)}>
      {loading && <span className="ch-spinner" aria-hidden="true"/>}
      {children}
    </button>);
});
