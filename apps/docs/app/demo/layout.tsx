import { Suspense } from 'react';
import { DemoProvider } from '../../components/demo/store';
import { DemoShell } from '../../components/demo/shell';
import './showcase.css';
export default function DemoLayout({ children }: { children: React.ReactNode }) {
  return (
    <Suspense fallback={<div className="demo-loading">Loading workspace…</div>}>
      <DemoProvider>
        <DemoShell>{children}</DemoShell>
      </DemoProvider>
    </Suspense>
  );
}
