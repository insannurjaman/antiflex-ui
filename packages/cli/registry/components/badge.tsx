'use client';

import { forwardRef, type HTMLAttributes } from 'react';
import { cx } from './utils';

export interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
    variant?: 'neutral' | 'accent' | 'success' | 'warning' | 'danger';
    size?: 'sm' | 'md';
}

export const Badge = forwardRef<HTMLSpanElement, BadgeProps>(function Badge({ variant = 'neutral', size = 'md', className, ...props }, ref) {
    return (<span {...props} ref={ref} className={cx('ch-badge', `ch-badge--${variant}`, `ch-badge--${size}`, className)}/>);
});
