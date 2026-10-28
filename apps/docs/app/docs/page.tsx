import Link from 'next/link';
import { componentCount } from '@antiflex/ui/catalog';
import { Badge, Separator } from '@antiflex/ui';
import { OverviewSpecimen } from '../../components/specimens';
export const metadata = { title: 'Introduction' };
export default function Introduction() {
  return (
    <>
      <div className="doc-breadcrumb">Documentation / Getting started</div>
      <h1>Introduction</h1>
      <p className="doc-lead">
        Familiar patterns, thoughtful defaults, and intuitive experiences. One foundation for design
        and code.
      </p>
      <div className="doc-meta">
        <Badge variant="accent">Foundation release</Badge>
        <span>React · TypeScript · Tailwind CSS</span>
      </div>
      <OverviewSpecimen />
      <h2>A shared foundation, growing together.</h2>
      <p>
        antiflex now includes {componentCount} component families. Each has a typed API, native
        semantics, light and dark themes, and a Storybook specimen. The dashboard shows them working
        together.
      </p>
      <Separator />
      <h2>From a value to a decision.</h2>
      <p>
        Primitives hold raw values. Semantic tokens describe their purpose. Component tokens make
        those decisions usable. Change a theme at the semantic layer, and the components follow.
      </p>
      <div className="token-flow">
        <span>
          Primitive
          <br />
          <code>neutral / 900</code>
        </span>
        <b aria-hidden="true">→</b>
        <span>
          Semantic
          <br />
          <code>action</code>
        </span>
        <b aria-hidden="true">→</b>
        <span>
          Component
          <br />
          <code>button / bg</code>
        </span>
      </div>
      <h2>Own the foundation.</h2>
      <p>
        The core is MIT licensed. Components are written for this system with React and native
        browser behavior. Figma, tokens, documentation, and examples share the same names and
        conventions.
      </p>
      <div className="next-doc">
        <Link href="/docs/installation">
          Start with installation <span>→</span>
        </Link>
        <Link href="/docs/components">
          Explore components <span>→</span>
        </Link>
      </div>
    </>
  );
}
