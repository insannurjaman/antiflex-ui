import type { Meta, StoryObj } from '@storybook/react-vite';
import { Badge } from '@antiflex/ui';
const meta = {
  title: 'Components/Badge',
  component: Badge,
  parameters: { layout: 'padded' },
  args: { children: 'Active' },
} satisfies Meta<typeof Badge>;
export default meta;
type Story = StoryObj<typeof meta>;
export const Neutral: Story = {};
export const AllVariants: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: 12 }}>
      {(['neutral', 'accent', 'success', 'warning', 'danger'] as const).map((variant) => (
        <Badge key={variant} variant={variant}>
          {variant}
        </Badge>
      ))}
    </div>
  ),
};
export const Small: Story = { args: { size: 'sm' } };
