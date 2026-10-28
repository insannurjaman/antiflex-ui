import type { Meta, StoryObj } from '@storybook/react-vite';
import { Input, Field } from '@antiflex/ui';
const meta = {
  title: 'Components/Input',
  component: Input,
  parameters: { layout: 'padded' },
  args: { 'aria-label': 'Project name', placeholder: 'Orbit workspace' },
} satisfies Meta<typeof Input>;
export default meta;
type Story = StoryObj<typeof meta>;
export const Default: Story = {};
export const Disabled: Story = { args: { disabled: true } };
export const Invalid: Story = { args: { 'aria-invalid': true } };
export const Sizes: Story = {
  render: () => (
    <div style={{ display: 'grid', gap: 20, maxWidth: 400 }}>
      {(['sm', 'md', 'lg'] as const).map((size) => (
        <Field key={size} label={`Size ${size}`}>
          <Input size={size} />
        </Field>
      ))}
    </div>
  ),
};
