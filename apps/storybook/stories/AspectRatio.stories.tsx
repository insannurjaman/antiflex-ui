import type { Meta, StoryObj } from '@storybook/react-vite';
import { AspectRatio } from '@antiflex/ui';
const meta = {
  title: 'Components/Aspect Ratio',
  component: AspectRatio,
  parameters: { layout: 'padded' },
} satisfies Meta<typeof AspectRatio>;
export default meta;
type Story = StoryObj;

export const Default: Story = {
  render: () => (
    <AspectRatio>
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'grid',
          placeItems: 'center',
          background: 'var(--af-semantic-accent-soft)',
          color: 'var(--af-semantic-accent)',
        }}
      >
        16:9 media placeholder
      </div>
    </AspectRatio>
  ),
};
export const Square: Story = {
  render: () => (
    <div style={{ maxWidth: 240 }}>
      <AspectRatio ratio={1}>
        <div
          style={{
            width: '100%',
            height: '100%',
            display: 'grid',
            placeItems: 'center',
            background: 'var(--af-semantic-inset)',
          }}
        >
          Square media placeholder
        </div>
      </AspectRatio>
    </div>
  ),
};
export const InvalidRatio: Story = {
  render: () => (
    <AspectRatio ratio={0}>
      <div style={{ width: '100%', height: '100%', background: 'var(--af-semantic-inset)' }}>
        Invalid ratio falls back to 16:9
      </div>
    </AspectRatio>
  ),
};
