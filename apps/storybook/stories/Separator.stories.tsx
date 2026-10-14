import type { Meta, StoryObj } from '@storybook/react-vite';
import { Separator } from '@chamfer/ui';
const meta = {
  title: 'Components/Separator',
  component: Separator,
  parameters: { layout: 'padded' },
} satisfies Meta<typeof Separator>;
export default meta;
type Story = StoryObj<typeof meta>;
export const Horizontal: Story = { args: { decorative: false } };
export const Vertical: Story = {
  render: () => (
    <div style={{ display: 'flex', height: 48, gap: 16, alignItems: 'center' }}>
      <span>Design</span>
      <Separator orientation="vertical" decorative={false} />
      <span>Code</span>
    </div>
  ),
};
