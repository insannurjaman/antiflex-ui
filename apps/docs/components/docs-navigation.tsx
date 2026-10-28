'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import { Button } from '@antiflex/ui';
import { componentCatalog, componentCount } from '@antiflex/ui/catalog';
export const components = componentCatalog.map(({ slug, name }) => [slug, name]);
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
          {link('/docs/foundations/colors', 'Colors')}
          {link('/docs/foundations/typography', 'Typography')}
          {link('/docs/accessibility', 'Accessibility')}
        </div>
        <div className="nav-group">
          <h2>
            Components <span>{componentCount}</span>
          </h2>
          {link('/docs/components', 'Overview')}
          {components.map(([s, n]) => link('/docs/components/' + s, n))}
        </div>
        <div className="nav-group">
          <h2>Examples</h2>
          {link('/dashboard', 'SaaS dashboard')}
          {link('/docs/forms', 'Composing forms')}
          {link('/docs/feedback', 'Feedback and navigation')}
          {link('/docs/modals', 'Tasks and confirmations')}
          {link('/docs/floating', 'Anchored panels and help')}
          {link('/docs/panels', 'Edge panels and bottom tasks')}
          {link('/docs/menus', 'Actions and contextual menus')}
          {link('/docs/notifications', 'Feedback without interruption')}
          {link('/docs/workspace-tools', 'Workspace navigation and planning')}
        </div>
      </nav>
    </>
  );
}
