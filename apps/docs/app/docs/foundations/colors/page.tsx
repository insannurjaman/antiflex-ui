import tokens from '@antiflex/tokens/json';
import { ColorFoundation } from '../../../../components/color-foundation';
import { Code } from '../../../../components/code';
export const metadata = { title: 'Color foundation' };
export default function ColorsPage() {
  return (
    <>
      <h1>Color, at every step.</h1>
      <p className="doc-lead">
        Twenty-six palettes. Eleven shades each. A broad reference library alongside antiflex’s
        purpose-built light and dark themes.
      </p>
      <ColorFoundation />
      <h2>Palette, purpose, component</h2>
      <p>
        These reference ramps match Tailwind CSS {tokens.reference.version}. antiflex’s existing
        neutral tokens define the default light and dark themes; mint remains available as an
        optional primitive palette. Use semantic roles for interface meaning and raw palettes for
        deliberate customization.
      </p>
      <Code label="CSS and Tailwind">
        {
          '/* Reference primitive */\nbackground: var(--af-palette-blue-500);\n/* Tailwind: bg-af-blue-500 text-af-blue-950 */\n\n/* antiflex semantic role follows the current theme */\ncolor: var(--af-semantic-foreground);\n\n/* Component alias */\nbackground: var(--af-component-button-bg);'
        }
      </Code>
      <details className="foundation-details">
        <summary>
          antiflex semantic roles · {Object.keys(tokens.semantic.light).length} roles
        </summary>
        <div className="foundation-role-list">
          {Object.keys(tokens.semantic.light).map((role) => (
            <div key={role}>
              <span
                className="foundation-inspector-swatch"
                style={{ background: `var(--af-semantic-${role})` }}
                aria-hidden="true"
              />
              <code>{role}</code>
            </div>
          ))}
        </div>
      </details>
      <h2>Wide gamut, clear boundaries</h2>
      <p>
        CSS preserves canonical OKLCH values. HEX and Figma swatches use a clipped sRGB preview;
        very vivid colors can differ on wide-gamut displays. Raw shades do not switch automatically
        in dark mode. Choose accessible foreground/background pairs, or use antiflex’s theme-aware
        semantic roles.
      </p>
      <p>
        Reference values are distributed under the{' '}
        <a href="https://github.com/tailwindlabs/tailwindcss/blob/v4.3.3/LICENSE">
          Tailwind CSS MIT license
        </a>
        . See the <a href="https://tailwindcss.com/docs/colors">official color documentation</a>.
      </p>
    </>
  );
}
