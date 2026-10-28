'use client';
import { forwardRef, type HTMLAttributes, type ReactNode } from 'react';
import { cx } from './utils';
export interface AlertProps extends Omit<HTMLAttributes<HTMLDivElement>, 'title'> {
  variant?: 'neutral' | 'success' | 'warning' | 'danger';
  title: ReactNode;
  icon?: ReactNode;
}
export const Alert = forwardRef<HTMLDivElement, AlertProps>(function Alert(
  { variant = 'neutral', title, icon, children, className, ...props },
  ref,
) {
  return (
    <div {...props} ref={ref} className={cx('af-alert', `af-alert--${variant}`, className)}>
      {icon && (
        <span className="af-alert__icon" aria-hidden="true">
          {icon}
        </span>
      )}
      <div className="af-alert__body">
        <div className="af-alert__title">{title}</div>
        {children && <div className="af-alert__description">{children}</div>}
      </div>
    </div>
  );
});
