import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';
import { Checkbox, Label } from '@antiflex/ui';
const meta = {
  title: 'Components/Checkbox',
  component: Checkbox,
  args: { 'aria-label': 'Product updates' },
} satisfies Meta<typeof Checkbox>;
export default meta;
type Story = StoryObj<typeof meta>;
export const Default: Story = {};
export const Checked: Story = { args: { defaultChecked: true } };
export const Disabled: Story = { args: { disabled: true, defaultChecked: true } };
export const Invalid: Story = { args: { 'aria-invalid': true, required: true } };
function MixedExample() {
  const [mixed, setMixed] = useState(true);
  return (
    <label className="af-choice">
      <Checkbox indeterminate={mixed} onChange={() => setMixed(false)} />
      <span>Select all projects</span>
    </label>
  );
}
export const Indeterminate: Story = { render: () => <MixedExample /> };
export const Sizes: Story = {
  render: () => (
    <div style={{ display: 'grid', gap: 12 }}>
      {(['sm', 'md', 'lg'] as const).map((size) => (
        <div className="af-choice" key={size}>
          <Checkbox size={size} id={'checkbox-' + size} defaultChecked />
          <Label htmlFor={'checkbox-' + size}>{size}</Label>
        </div>
      ))}
    </div>
  ),
};
