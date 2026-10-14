import type { Meta, StoryObj } from '@storybook/react-vite';
import { TextField } from '@chamfer/ui';
const meta = {
  title: 'Components/TextField',
  component: TextField,
  parameters: { layout: 'padded' },
  args: {
    label: 'Project name',
    placeholder: 'A new workspace',
    description: 'Choose a clear name.',
  },
} satisfies Meta<typeof TextField>;
export default meta;
type Story = StoryObj<typeof meta>;
export const Default: Story = {};
export const Error: Story = { args: { error: 'Enter a project name.' } };
export const Disabled: Story = { args: { disabled: true } };
export const HiddenLabel: Story = { args: { hideLabel: true } };
export const Sizes: Story = {
  render: () => (
    <div style={{ display: 'grid', gap: 16, maxWidth: 400 }}>
      {(['sm', 'md', 'lg'] as const).map((size) => (
        <TextField key={size} label={size} size={size} />
      ))}
    </div>
  ),
};
