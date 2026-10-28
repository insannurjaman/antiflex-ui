import type { Meta, StoryObj } from '@storybook/react-vite';
import { NativeSelect, Field } from '@antiflex/ui';
const meta = {
  title: 'Components/NativeSelect',
  component: NativeSelect,
  parameters: { layout: 'padded' },
  args: {
    'aria-label': 'Timezone',
    defaultValue: 'jakarta',
    children: (
      <>
        <option value="jakarta">Jakarta</option>
        <option value="utc">UTC</option>
      </>
    ),
  },
} satisfies Meta<typeof NativeSelect>;
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
          <NativeSelect size={size}>
            <option>Jakarta</option>
            <option>UTC</option>
          </NativeSelect>
        </Field>
      ))}
    </div>
  ),
};
