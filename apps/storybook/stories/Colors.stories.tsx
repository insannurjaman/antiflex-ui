import type { Meta, StoryObj } from '@storybook/react-vite';
import tokens from '@antiflex/tokens/json';
import { paletteRamps } from '@antiflex/tokens/foundations';
const meta = { title: 'Foundations/Colors', parameters: { layout: 'padded' } } satisfies Meta;
export default meta;
type Story = StoryObj;
export const CompletePalette: Story = {
  render: () => (
    <div style={{ display: 'grid', gap: 24 }}>
      <h1 style={{ fontSize: 28, margin: 0 }}>Reference color palette</h1>
      <p>
        26 palettes × 11 shades. Canonical values from Tailwind CSS {tokens.reference.version};
        antiflex’s semantic theme remains distinct.
      </p>
      {paletteRamps.map((ramp) => (
        <section key={ramp.name}>
          <h2 style={{ fontSize: 16, margin: '0 0 12px', textTransform: 'capitalize' }}>
            {ramp.name}
          </h2>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit,minmax(44px,1fr))',
              gap: 8,
            }}
          >
            {ramp.shades.map((shade) => (
              <div key={shade.step}>
                <div
                  style={{
                    background: `var(${shade.variable})`,
                    height: 48,
                    border: '1px solid var(--af-semantic-border)',
                  }}
                />
                <span style={{ fontSize: 12 }}>{shade.step}</span>
              </div>
            ))}
          </div>
        </section>
      ))}
    </div>
  ),
};
export const SemanticRoles: Story = {
  render: () => (
    <div>
      <h1 style={{ fontSize: 28 }}>antiflex semantic roles</h1>
      <p>These roles resolve in the selected theme.</p>
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit,minmax(180px,1fr))',
          gap: 24,
        }}
      >
        {Object.keys(tokens.semantic.light).map((role) => (
          <div key={role}>
            <div
              style={{
                height: 56,
                background: `var(--af-semantic-${role})`,
                border: '1px solid var(--af-semantic-border)',
              }}
            />
            <code>{role}</code>
          </div>
        ))}
      </div>
    </div>
  ),
};
export const BaseColors: Story = {
  render: () => (
    <div>
      <h1 style={{ fontSize: 28 }}>Base colors</h1>
      {['black', 'white', 'transparent'].map((name) => (
        <div key={name} style={{ marginBlock: 24 }}>
          <div
            style={{
              background: `var(--af-palette-${name})`,
              height: 56,
              border: '1px dashed var(--af-semantic-border-strong)',
            }}
          />
          <code>{name}</code>
        </div>
      ))}
    </div>
  ),
};
