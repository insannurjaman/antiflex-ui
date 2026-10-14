import Link from 'next/link';
import { DocsNavigation } from '../../components/docs-navigation';
export default function DocsLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="docs-layout">
      <aside className="docs-sidebar">
        <DocsNavigation />
        <div className="sidebar-foot">
          <span className="token-name">CHAMFER / FOUNDATION</span>
          <p>
            Eight components.
            <br />
            One clear language.
          </p>
          <Link href="/dashboard">See it in context ↗</Link>
        </div>
      </aside>
      <main id="main-content" className="docs-main">
        {children}
      </main>
    </div>
  );
}
