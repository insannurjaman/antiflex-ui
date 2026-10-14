'use client';

import {
  forwardRef,
  useId,
  useRef,
  useState,
  type ButtonHTMLAttributes,
  type HTMLAttributes,
  type InputHTMLAttributes,
  type ReactNode,
  type TableHTMLAttributes,
  type ThHTMLAttributes,
  type TdHTMLAttributes,
} from 'react';

export type Size = 'sm' | 'md' | 'lg';
export const cx = (...values: (string | undefined | false)[]) => values.filter(Boolean).join(' ');

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
      className={cx('ch-button', `ch-button--${variant}`, `ch-button--${size}`, className)}
    >
      {loading && <span className="ch-spinner" aria-hidden="true" />}
      {children}
    </button>
  );
});

export interface TextFieldProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'size'> {
  label: string;
  description?: string;
  error?: string;
  size?: Size;
  leading?: ReactNode;
  hideLabel?: boolean;
}
export const TextField = forwardRef<HTMLInputElement, TextFieldProps>(function TextField(
  {
    id,
    label,
    description,
    error,
    size = 'md',
    leading,
    hideLabel,
    className,
    'aria-describedby': describedBy,
    ...props
  },
  ref,
) {
  const generated = useId();
  const inputId = id || generated;
  const helpId = `${inputId}-help`;
  const help = error || description;
  return (
    <div className={cx('ch-field', className)}>
      <label className={hideLabel ? 'ch-sr-only' : 'ch-field-label'} htmlFor={inputId}>
        {label}
      </label>
      <div
        className={cx(
          'ch-field-control',
          `ch-field-control--${size}`,
          Boolean(error) && 'ch-field-control--error',
        )}
      >
        {leading && (
          <span className="ch-field-leading" aria-hidden="true">
            {leading}
          </span>
        )}
        <input
          {...props}
          ref={ref}
          id={inputId}
          aria-invalid={error ? true : props['aria-invalid']}
          aria-describedby={
            [describedBy, help ? helpId : undefined].filter(Boolean).join(' ') || undefined
          }
        />
      </div>
      {help && (
        <span id={helpId} className={cx('ch-field-help', Boolean(error) && 'ch-field-error')}>
          {help}
        </span>
      )}
    </div>
  );
});

export interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  variant?: 'neutral' | 'accent' | 'success' | 'warning' | 'danger';
  size?: 'sm' | 'md';
}
export const Badge = forwardRef<HTMLSpanElement, BadgeProps>(function Badge(
  { variant = 'neutral', size = 'md', className, ...props },
  ref,
) {
  return (
    <span
      {...props}
      ref={ref}
      className={cx('ch-badge', `ch-badge--${variant}`, `ch-badge--${size}`, className)}
    />
  );
});
export interface CardProps extends HTMLAttributes<HTMLDivElement> {
  variant?: 'outline' | 'subtle';
  padding?: 'none' | 'sm' | 'md' | 'lg';
}
export const Card = forwardRef<HTMLDivElement, CardProps>(function Card(
  { variant = 'outline', padding = 'md', className, ...props },
  ref,
) {
  return (
    <div
      {...props}
      ref={ref}
      className={cx('ch-card', `ch-card--${variant}`, `ch-card--${padding}`, className)}
    />
  );
});
export interface SeparatorProps extends HTMLAttributes<HTMLDivElement> {
  orientation?: 'horizontal' | 'vertical';
  decorative?: boolean;
}
export const Separator = forwardRef<HTMLDivElement, SeparatorProps>(function Separator(
  { orientation = 'horizontal', decorative = true, className, ...props },
  ref,
) {
  return (
    <div
      {...props}
      ref={ref}
      role={decorative ? 'presentation' : 'separator'}
      aria-orientation={decorative ? undefined : orientation}
      className={cx('ch-separator', `ch-separator--${orientation}`, className)}
    />
  );
});
export const Skeleton = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(
  function Skeleton({ className, ...props }, ref) {
    return <div {...props} ref={ref} aria-hidden="true" className={cx('ch-skeleton', className)} />;
  },
);
export const Table = forwardRef<HTMLTableElement, TableHTMLAttributes<HTMLTableElement>>(
  function Table({ className, ...props }, ref) {
    return <table {...props} ref={ref} className={cx('ch-table', className)} />;
  },
);
export const TableHeader = forwardRef<
  HTMLTableSectionElement,
  HTMLAttributes<HTMLTableSectionElement>
>(function TableHeader(props, ref) {
  return <thead {...props} ref={ref} />;
});
export const TableBody = forwardRef<
  HTMLTableSectionElement,
  HTMLAttributes<HTMLTableSectionElement>
>(function TableBody(props, ref) {
  return <tbody {...props} ref={ref} />;
});
export const TableRow = forwardRef<HTMLTableRowElement, HTMLAttributes<HTMLTableRowElement>>(
  function TableRow(props, ref) {
    return <tr {...props} ref={ref} />;
  },
);
export const TableHead = forwardRef<HTMLTableCellElement, ThHTMLAttributes<HTMLTableCellElement>>(
  function TableHead({ scope = 'col', ...props }, ref) {
    return <th {...props} ref={ref} scope={scope} />;
  },
);
export const TableCell = forwardRef<HTMLTableCellElement, TdHTMLAttributes<HTMLTableCellElement>>(
  function TableCell(props, ref) {
    return <td {...props} ref={ref} />;
  },
);
export const TableCaption = forwardRef<
  HTMLTableCaptionElement,
  HTMLAttributes<HTMLTableCaptionElement>
>(function TableCaption(props, ref) {
  return <caption {...props} ref={ref} />;
});

export interface AppShellProps extends HTMLAttributes<HTMLDivElement> {
  sidebar: ReactNode;
  header: ReactNode;
  navigationLabel?: string;
  contentAs?: 'main' | 'div';
  mainId?: string;
}
export const AppShell = forwardRef<HTMLDivElement, AppShellProps>(function AppShell(
  {
    sidebar,
    header,
    children,
    className,
    navigationLabel = 'Workspace navigation',
    contentAs: Content = 'main',
    mainId = 'main-content',
    ...props
  },
  ref,
) {
  const [open, setOpen] = useState(false);
  const id = useId();
  const toggle = useRef<HTMLButtonElement>(null);
  return (
    <div
      {...props}
      ref={ref}
      className={cx('ch-shell', className)}
      data-navigation-open={open}
      onKeyDown={(e) => {
        props.onKeyDown?.(e);
        if (e.key === 'Escape' && open) {
          setOpen(false);
          toggle.current?.focus();
        }
      }}
    >
      <div className="ch-shell-topbar">
        <Button
          ref={toggle}
          className="ch-shell-toggle"
          variant="ghost"
          aria-expanded={open}
          aria-controls={id}
          onClick={(event) => {
            event.currentTarget.focus();
            setOpen(!open);
          }}
        >
          {open ? 'Close menu' : 'Menu'}
        </Button>
        {header}
      </div>
      <aside
        id={id}
        className="ch-shell-sidebar"
        aria-label={navigationLabel}
        onClick={(e) => {
          if ((e.target as HTMLElement).closest('a')) setOpen(false);
        }}
      >
        {sidebar}
      </aside>
      <Content id={mainId} className="ch-shell-main">
        {children}
      </Content>
    </div>
  );
});
