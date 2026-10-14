import tokens from '@chamfer/tokens/json';
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
      <h2>Color</h2>
      <p>
        Cool neutral surfaces keep the work in focus. Cyan marks actions and selected states.
        Semantic colors communicate feedback.
      </p>
      <div className="color-specimen">
        {['canvas', 'subtle', 'border', 'foreground', 'accent', 'success', 'warning', 'danger'].map(
          (role) => (
            <div key={role}>
              <div className="color-swatch" style={{ background: `var(--ch-semantic-${role})` }} />
              <code>{role}</code>
            </div>
          ),
        )}
      </div>
      <Code label="CSS">
        {
          ':root {\n  --ch-semantic-accent: var(--ch-color-cyan-700);\n  --ch-component-button-bg: var(--ch-semantic-accent);\n}\n\n[data-theme="dark"] {\n  --ch-semantic-accent: var(--ch-color-cyan-400);\n}'
        }
      </Code>
      <h2>Typography</h2>
      <div className="type-specimen">
        <div>
          <span>IBM Plex Sans</span>
          <strong>Clarity at every scale.</strong>
          <p>A practical interface face, with room to breathe.</p>
        </div>
        <div>
          <span>IBM Plex Mono</span>
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
        Four-pixel control corners and six-pixel content corners. Thin borders create structure.
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
