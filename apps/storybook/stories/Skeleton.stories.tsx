import type { Meta, StoryObj } from '@storybook/react-vite';
import { Skeleton } from '@chamfer/ui';
const meta = {
  title: 'Components/Skeleton',
  component: Skeleton,
  parameters: { layout: 'padded' },
  args: { style: { width: 240, height: 20 } },
} satisfies Meta<typeof Skeleton>;
export default meta;
type Story = StoryObj<typeof meta>;
export const Default: Story = {};
export const LoadingContent: Story = {
  render: () => (
    <div role="status" aria-label="Loading workspace">
      <Skeleton style={{ height: 24, width: 200 }} />
      <Skeleton style={{ height: 14, width: 280, marginTop: 12 }} />
    </div>
  ),
};
