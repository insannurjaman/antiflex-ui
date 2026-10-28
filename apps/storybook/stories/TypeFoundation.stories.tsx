import type { Meta, StoryObj } from '@storybook/react-vite';
import { typography, fontFamilies } from '@antiflex/tokens/foundations';
const meta = { title: 'Foundations/Typography', parameters: { layout: 'padded' } } satisfies Meta;
export default meta;
type Story = StoryObj;
export const CompleteScale: Story = {
  render: () => (
    <div>
      <h1 style={{ fontSize: 28 }}>Type scale · xs–9xl</h1>
      {Object.entries(typography.size).map(([name, size]) => (
        <div
          key={name}
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'center',
            gap: 24,
            borderBottom: '1px solid var(--af-semantic-border)',
            paddingBlock: 16,
          }}
        >
          <code style={{ minWidth: 140 }}>
            {name} · {size}px
          </code>
          <span
            style={{
              fontSize: `var(--af-typography-size-${name})`,
              lineHeight: `var(--af-typography-line-height-${name})`,
            }}
          >
            Aa
          </span>
        </div>
      ))}
    </div>
  ),
};
export const Weights: Story = {
  render: () => (
    <div>
      <h1 style={{ fontSize: 28 }}>Weight · 100–900</h1>
      {Object.entries(typography.weight).map(([name, weight]) => (
        <div
          key={name}
          style={{ borderBottom: '1px solid var(--af-semantic-border)', paddingBlock: 16 }}
        >
          <code>
            {name} · {weight}
          </code>
          <p style={{ fontSize: 28, fontWeight: weight, fontSynthesis: 'none' }}>
            Clear forms. Considered details.
          </p>
        </div>
      ))}
    </div>
  ),
};
export const Families: Story = {
  render: () => (
    <div>
      <h1 style={{ fontSize: 28 }}>Font families</h1>
      {Object.entries(fontFamilies).map(([name, face]) => (
        <section key={name} style={{ marginBlock: 32 }}>
          <h2 style={{ fontSize: 16 }}>{face.label}</h2>
          <p style={{ fontSize: 28, fontFamily: face.css }}>Clarity at every scale. 0123456789</p>
          <code>font-{name}</code>
        </section>
      ))}
    </div>
  ),
};
export const LeadingAndTracking: Story = {
  render: () => (
    <div>
      <h1 style={{ fontSize: 28 }}>Leading and tracking</h1>
      {Object.entries(typography.leading).map(([name, value]) => (
        <div key={name} style={{ marginBlock: 24 }}>
          <code>
            leading-af-{name} · {value}
          </code>
          <p style={{ lineHeight: value, maxWidth: 420 }}>
            A shared scale helps teams compose interfaces with clear hierarchy and comfortable
            reading rhythm.
          </p>
        </div>
      ))}
      {Object.entries(typography.tracking).map(([name, value]) => (
        <div key={name} style={{ marginBlock: 24 }}>
          <code>
            tracking-af-{name} · {value}em
          </code>
          <p style={{ letterSpacing: `${value}em` }}>antiflex typography</p>
        </div>
      ))}
    </div>
  ),
};
