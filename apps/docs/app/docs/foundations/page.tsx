import tokens from '@antiflex/tokens/json';
import Link from 'next/link';
import { Code } from '../../../components/code';
export const metadata = { title: 'Foundations' };
export default function Foundations() {
  return (
    <>
      <div className="doc-breadcrumb">Documentation / Design language</div>
      <h1>One shared language.</h1>
      <p className="doc-lead">
        Primitives become purpose. Purpose becomes interface. Every layer has a name.
      </p>
      <div className="foundation-links">
        <Link href="/docs/foundations/colors">
          <strong>Color foundation</strong>
          <span>26 palettes · 50–950 · inspect and copy</span>
        </Link>
        <Link href="/docs/foundations/typography">
          <strong>Typography foundation</strong>
          <span>xs–9xl · 100–900 · interactive playground</span>
        </Link>
      </div>
      <h2>antiflex color roles</h2>
      <p>
        Neutral is the default theme: white and gray surfaces, charcoal actions in light mode, and
        light actions in dark mode. Links, selection, and focus use the same neutral scale. Success,
        warning, and error colors communicate feedback.
      </p>
      <div className="color-specimen">
        {['canvas', 'subtle', 'border', 'foreground', 'accent', 'success', 'warning', 'danger'].map(
          (role) => (
            <div key={role}>
              <div className="color-swatch" style={{ background: `var(--af-semantic-${role})` }} />
              <code>{role}</code>
            </div>
          ),
        )}
      </div>
      <Code label="CSS">
        {
          ':root {\n  --af-semantic-action: var(--af-color-neutral-900);\n  --af-component-button-bg: var(--af-semantic-action);\n}\n\n[data-theme="dark"] {\n  --af-semantic-action: var(--af-color-neutral-200);\n}'
        }
      </Code>
      <h2>Typography</h2>
      <div className="type-specimen">
        <div>
          <span>Anybody · display</span>
          <strong style={{ fontFamily: 'var(--af-font-display), sans-serif' }}>
            less flex. More function.
          </strong>
          <p>Bold, wide headings give the brand its voice.</p>
        </div>
        <div>
          <span>DM Sans</span>
          <strong>Clarity at every scale.</strong>
          <p>A practical interface face, with room to breathe.</p>
        </div>
        <div>
          <span>Space Mono</span>
          <strong className="mono">0123456789</strong>
          <code>const precision = 'intentional';</code>
        </div>
      </div>
      <h2>Spacing</h2>
      <p>
        A four-pixel base keeps compact layouts consistent. Use semantic composition and component
        spacing rather than scattered values.
      </p>
      <div className="space-specimen">
        {Object.entries(tokens.primitives.space)
          .filter(([, v]) => v > 0 && v <= 48)
          .map(([k, v]) => (
            <div key={k}>
              <code>space / {k}</code>
              <div style={{ width: v * 3 }} />
              <span>{v}px</span>
            </div>
          ))}
      </div>
      <h2>Shape and motion</h2>
      <p>
        One-pixel control corners and square content corners. Thin borders create structure.
        Feedback transitions use 120ms; general transitions use 200ms. Reduced motion removes
        decorative animation.
      </p>
      <h2>Change the source, once.</h2>
      <p>
        <code>packages/tokens/src/tokens.json</code> is the token source. Run{' '}
        <code>pnpm tokens:build</code> to regenerate CSS variables and Tailwind mappings. The Figma
        generation scripts consume this same source.
      </p>
      <h2>Themes</h2>
      <Code label="HTML">
        {'<html data-theme="light">...</html>\n<html data-theme="dark">...</html>'}
      </Code>
      <p>
        The site honors a saved choice, otherwise the operating system preference. Theme selection
        persists locally.
      </p>
    </>
  );
}
