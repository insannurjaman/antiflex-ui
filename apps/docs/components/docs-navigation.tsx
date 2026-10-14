'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import { Button } from '@chamfer/ui';
export const components = [
  ['button', 'Button'],
  ['text-field', 'TextField'],
  ['badge', 'Badge'],
  ['card', 'Card'],
  ['separator', 'Separator'],
  ['skeleton', 'Skeleton'],
  ['table', 'Table'],
  ['app-shell', 'AppShell'],
];
export function DocsNavigation() {
  const p = usePathname();
  const [open, setOpen] = useState(false);
  const link = (href: string, label: string) => (
    <Link
      key={href}
      href={href}
      aria-current={p === href ? 'page' : undefined}
      onClick={() => setOpen(false)}
    >
      {label}
    </Link>
  );
  return (
    <>
      <Button
        variant="secondary"
        className="docs-menu-toggle"
        aria-expanded={open}
        aria-controls="docs-navigation"
        onClick={() => setOpen(!open)}
      >
        Documentation menu
      </Button>
      <nav id="docs-navigation" data-open={open} aria-label="Documentation">
        <div className="nav-group">
          <h2>Getting started</h2>
          {link('/docs', 'Introduction')}
          {link('/docs/installation', 'Installation')}
          {link('/docs/foundations', 'Foundations')}
          {link('/docs/accessibility', 'Accessibility')}
        </div>
        <div className="nav-group">
          <h2>
            Components <span>8</span>
          </h2>
          {link('/docs/components', 'Overview')}
          {components.map(([s, n]) => link('/docs/components/' + s, n))}
        </div>
        <div className="nav-group">
          <h2>Examples</h2>
          {link('/dashboard', 'SaaS dashboard')}
        </div>
      </nav>
    </>
  );
}
