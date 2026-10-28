import type { Meta, StoryObj } from '@storybook/react-vite';
import { Card } from '@antiflex/ui';
const meta = {
  title: 'Components/Card',
  component: Card,
  parameters: { layout: 'padded' },
  args: {
    children: (
      <>
        <h3>Workspace</h3>
        <p>Give related content a clear boundary.</p>
      </>
    ),
  },
} satisfies Meta<typeof Card>;
export default meta;
type Story = StoryObj<typeof meta>;
export const Outline: Story = {};
export const Subtle: Story = { args: { variant: 'subtle' } };
export const Spacing: Story = {
  render: () => (
    <div style={{ display: 'grid', gap: 16 }}>
      {(['none', 'sm', 'md', 'lg'] as const).map((padding) => (
        <Card key={padding} padding={padding}>
          {padding} padding
        </Card>
      ))}
    </div>
  ),
};
