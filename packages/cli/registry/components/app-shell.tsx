'use client';

import { forwardRef, useId, useRef, useState, type HTMLAttributes, type ReactNode } from 'react';
import { cx } from './utils';
import { Button } from './button';

export interface AppShellProps extends HTMLAttributes<HTMLDivElement> {
    sidebar: ReactNode;
    header: ReactNode;
    navigationLabel?: string;
    contentAs?: 'main' | 'div';
    mainId?: string;
}

export const AppShell = forwardRef<HTMLDivElement, AppShellProps>(function AppShell({ sidebar, header, children, className, navigationLabel = 'Workspace navigation', contentAs: Content = 'main', mainId = 'main-content', ...props }, ref) {
    const [open, setOpen] = useState(false);
    const id = useId();
    const toggle = useRef<HTMLButtonElement>(null);
    return (<div {...props} ref={ref} className={cx('ch-shell', className)} data-navigation-open={open} onKeyDown={(e) => {
            props.onKeyDown?.(e);
            if (e.key === 'Escape' && open) {
                setOpen(false);
                toggle.current?.focus();
            }
        }}>
      <div className="ch-shell-topbar">
        <Button ref={toggle} className="ch-shell-toggle" variant="ghost" aria-expanded={open} aria-controls={id} onClick={(event) => {
            event.currentTarget.focus();
            setOpen(!open);
        }}>
          {open ? 'Close menu' : 'Menu'}
        </Button>
        {header}
      </div>
      <aside id={id} className="ch-shell-sidebar" aria-label={navigationLabel} onClick={(e) => {
            if ((e.target as HTMLElement).closest('a'))
                setOpen(false);
        }}>
        {sidebar}
      </aside>
      <Content id={mainId} className="ch-shell-main">
        {children}
      </Content>
    </div>);
});
