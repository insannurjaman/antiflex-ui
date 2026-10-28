'use client';
import {
  forwardRef,
  type HTMLAttributes,
  type AnchorHTMLAttributes,
  type LiHTMLAttributes,
} from 'react';
import { cx } from './utils';
export const Breadcrumb = forwardRef<HTMLElement, HTMLAttributes<HTMLElement>>(function Breadcrumb(
  { className, 'aria-label': label = 'Breadcrumb', ...props },
  ref,
) {
  return <nav {...props} aria-label={label} ref={ref} className={cx('af-breadcrumb', className)} />;
});
export const BreadcrumbList = forwardRef<HTMLOListElement, HTMLAttributes<HTMLOListElement>>(
  function BreadcrumbList({ className, ...props }, ref) {
    return <ol {...props} ref={ref} className={cx('af-breadcrumb__list', className)} />;
  },
);
export const BreadcrumbItem = forwardRef<HTMLLIElement, LiHTMLAttributes<HTMLLIElement>>(
  function BreadcrumbItem({ className, ...props }, ref) {
    return <li {...props} ref={ref} className={cx('af-breadcrumb__item', className)} />;
  },
);
export const BreadcrumbLink = forwardRef<
  HTMLAnchorElement,
  AnchorHTMLAttributes<HTMLAnchorElement>
>(function BreadcrumbLink({ className, ...props }, ref) {
  return <a {...props} ref={ref} className={cx('af-breadcrumb__link', className)} />;
});
export const BreadcrumbPage = forwardRef<HTMLSpanElement, HTMLAttributes<HTMLSpanElement>>(
  function BreadcrumbPage({ className, ...props }, ref) {
    return (
      <span
        {...props}
        ref={ref}
        aria-current="page"
        className={cx('af-breadcrumb__page', className)}
      />
    );
  },
);
export const BreadcrumbSeparator = forwardRef<HTMLLIElement, LiHTMLAttributes<HTMLLIElement>>(
  function BreadcrumbSeparator({ className, children, ...props }, ref) {
    return (
      <li
        {...props}
        ref={ref}
        role="presentation"
        aria-hidden="true"
        className={cx('af-breadcrumb__separator', className)}
      >
        {children ?? (
          <svg width="12" height="12" viewBox="0 0 16 16" fill="none">
            <path d="m6 3 5 5-5 5" stroke="currentColor" strokeWidth="1.5" />
          </svg>
        )}
      </li>
    );
  },
);
