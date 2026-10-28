'use client';
import { forwardRef, type HTMLAttributes, type ReactNode } from 'react';
import { cx } from './utils';
export interface EmptyProps extends Omit<HTMLAttributes<HTMLDivElement>, 'title'> {
  title: ReactNode;
  description?: ReactNode;
  icon?: ReactNode;
}
export const Empty = forwardRef<HTMLDivElement, EmptyProps>(function Empty(
  { title, description, icon, children, className, ...props },
  ref,
) {
  return (
    <div {...props} ref={ref} className={cx('af-empty', className)}>
      {icon && (
        <div className="af-empty__icon" aria-hidden="true">
          {icon}
        </div>
      )}
      <div className="af-empty__title">{title}</div>
      {description && <div className="af-empty__description">{description}</div>}
      {children && <div className="af-empty__actions">{children}</div>}
    </div>
  );
});
