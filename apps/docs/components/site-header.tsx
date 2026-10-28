'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Brand } from './brand';
import { ThemeToggle } from './theme';
import { Badge } from '@antiflex/ui';
export function SiteHeader() {
  const path = usePathname();
  return (
    <>
      <a className="skip-link" href="#main-content">
        Skip to content
      </a>
      <header className="site-header">
        <Link className="brand-link" href="/" aria-label="antiflex/ui home">
          <Brand />
        </Link>
        <nav aria-label="Main navigation">
          <Link href="/docs" aria-current={path === '/docs' ? 'page' : undefined}>
            Documentation
          </Link>
          <Link
            href="/docs/components"
            aria-current={path.includes('/components') ? 'page' : undefined}
          >
            Components
          </Link>
          <Link
            href="/docs/foundations"
            aria-current={path.includes('/foundations') ? 'page' : undefined}
          >
            Foundations
          </Link>
          <Link
            href="/examples"
            aria-current={
              path.startsWith('/examples') || path.startsWith('/demo') ? 'page' : undefined
            }
          >
            Examples
          </Link>
        </nav>
        <div className="header-right">
          <Badge size="sm">v0.1.0</Badge>
          <ThemeToggle />
        </div>
      </header>
    </>
  );
}
