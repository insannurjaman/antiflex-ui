import type { Meta, StoryObj } from '@storybook/react-vite';
import { Label, Input } from '@antiflex/ui';
const meta = {
  title: 'Components/Label',
  component: Label,
  args: { children: 'Workspace name', htmlFor: 'story-label-input' },
} satisfies Meta<typeof Label>;
export default meta;
type Story = StoryObj<typeof meta>;
export const Default: Story = {
  render: (args) => (
    <div style={{ display: 'grid', gap: 8, maxWidth: 360 }}>
      <Label {...args} />
      <Input id="story-label-input" />
    </div>
  ),
};
export const Required: Story = { ...Default, args: { required: true } };
