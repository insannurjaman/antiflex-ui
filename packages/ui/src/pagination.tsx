'use client';
import {
  forwardRef,
  type HTMLAttributes,
  type LiHTMLAttributes,
  type AnchorHTMLAttributes,
  type ButtonHTMLAttributes,
} from 'react';
import { cx } from './utils';
export const Pagination = forwardRef<HTMLElement, HTMLAttributes<HTMLElement>>(function Pagination(
  { className, 'aria-label': label = 'Pagination', ...props },
  ref,
) {
  return <nav {...props} ref={ref} aria-label={label} className={cx('af-pagination', className)} />;
});
export const PaginationContent = forwardRef<HTMLUListElement, HTMLAttributes<HTMLUListElement>>(
  function PaginationContent({ className, ...props }, ref) {
    return <ul {...props} ref={ref} className={cx('af-pagination__content', className)} />;
  },
);
export const PaginationItem = forwardRef<HTMLLIElement, LiHTMLAttributes<HTMLLIElement>>(
  function PaginationItem({ className, ...props }, ref) {
    return <li {...props} ref={ref} className={cx('af-pagination__item', className)} />;
  },
);
export interface PaginationLinkProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  isActive?: boolean;
  disabled?: boolean;
}
export const PaginationLink = forwardRef<HTMLAnchorElement, PaginationLinkProps>(
  function PaginationLink(
    { isActive, disabled, href, tabIndex, className, onClick, ...props },
    ref,
  ) {
    return (
      <a
        {...props}
        ref={ref}
        href={disabled ? undefined : href}
        aria-current={isActive ? 'page' : undefined}
        aria-disabled={disabled || undefined}
        tabIndex={disabled ? -1 : tabIndex}
        onClick={(event) => {
          if (disabled) {
            event.preventDefault();
            return;
          }
          onClick?.(event);
        }}
        className={cx('af-page', className)}
      />
    );
  },
);
export interface PaginationButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  isActive?: boolean;
}
export const PaginationButton = forwardRef<HTMLButtonElement, PaginationButtonProps>(
  function PaginationButton({ isActive, type = 'button', className, ...props }, ref) {
    return (
      <button
        {...props}
        ref={ref}
        type={type}
        aria-current={isActive ? 'page' : undefined}
        className={cx('af-page', className)}
      />
    );
  },
);
export const PaginationPrevious = forwardRef<HTMLAnchorElement, PaginationLinkProps>(
  function PaginationPrevious({ children = 'Previous', ...props }, ref) {
    return (
      <PaginationLink aria-label="Previous page" {...props} ref={ref}>
        {children}
      </PaginationLink>
    );
  },
);
export const PaginationNext = forwardRef<HTMLAnchorElement, PaginationLinkProps>(
  function PaginationNext({ children = 'Next', ...props }, ref) {
    return (
      <PaginationLink aria-label="Next page" {...props} ref={ref}>
        {children}
      </PaginationLink>
    );
  },
);
export const PaginationEllipsis = forwardRef<HTMLSpanElement, HTMLAttributes<HTMLSpanElement>>(
  function PaginationEllipsis({ className, ...props }, ref) {
    return (
      <span {...props} ref={ref} className={cx('af-page af-page--ellipsis', className)}>
        <svg aria-hidden="true" width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
          <circle cx="3" cy="8" r="1" />
          <circle cx="8" cy="8" r="1" />
          <circle cx="13" cy="8" r="1" />
        </svg>
        <span className="af-sr-only">More pages</span>
      </span>
    );
  },
);
