import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';
import { Switch, Label } from '@antiflex/ui';
const meta = {
  title: 'Components/Switch',
  component: Switch,
  args: { 'aria-label': 'Desktop notifications' },
} satisfies Meta<typeof Switch>;
export default meta;
type Story = StoryObj<typeof meta>;
export const Default: Story = {};
export const Checked: Story = { args: { defaultChecked: true } };
export const Disabled: Story = { args: { disabled: true, defaultChecked: true } };
function ControlledExample() {
  const [checked, setChecked] = useState(false);
  return (
    <div>
      <label className="af-choice">
        <Switch checked={checked} onChange={(event) => setChecked(event.target.checked)} />
        <span>Desktop notifications</span>
      </label>
      <p role="status">{checked ? 'On' : 'Off'}</p>
    </div>
  );
}
export const Controlled: Story = { render: () => <ControlledExample /> };
export const Sizes: Story = {
  render: () => (
    <div style={{ display: 'grid', gap: 16 }}>
      {(['sm', 'md', 'lg'] as const).map((size) => (
        <div className="af-choice" key={size}>
          <Switch size={size} id={'switch-' + size} defaultChecked />
          <Label htmlFor={'switch-' + size}>{size}</Label>
        </div>
      ))}
    </div>
  ),
};
