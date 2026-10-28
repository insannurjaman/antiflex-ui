import type { Meta, StoryObj } from '@storybook/react-vite';
import { RadioGroup } from '@antiflex/ui';
const meta = {
  title: 'Components/Radio Group',
  component: RadioGroup,
  args: {
    label: 'Workspace visibility',
    defaultValue: 'team',
    options: [
      { value: 'team', label: 'Team', description: 'Everyone in your workspace.' },
      { value: 'private', label: 'Private' },
      { value: 'public', label: 'Public', disabled: true },
    ],
  },
} satisfies Meta<typeof RadioGroup>;
export default meta;
type Story = StoryObj<typeof meta>;
export const Default: Story = {};
export const Horizontal: Story = { args: { orientation: 'horizontal' } };
export const Disabled: Story = { args: { disabled: true } };
export const Invalid: Story = {
  args: { error: 'Choose a visibility.', required: true, defaultValue: undefined },
};
export const Sizes: Story = {
  render: (args) => (
    <div style={{ display: 'grid', gap: 32 }}>
      {(['sm', 'md', 'lg'] as const).map((size) => (
        <RadioGroup {...args} key={size} label={'Visibility ' + size} size={size} />
      ))}
    </div>
  ),
};
