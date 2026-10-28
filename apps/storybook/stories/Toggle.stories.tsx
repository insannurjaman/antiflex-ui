import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';
import { Toggle } from '@antiflex/ui';
const meta = {
  title: 'Components/Toggle',
  component: Toggle,
  parameters: { layout: 'padded' },
} satisfies Meta<typeof Toggle>;
export default meta;
type Story = StoryObj;
function ControlledToggle() {
  const [pressed, setPressed] = useState(false);
  return (
    <>
      <Toggle pressed={pressed} onPressedChange={setPressed}>
        Bold
      </Toggle>
      <p role="status">Bold is {pressed ? 'on' : 'off'}</p>
      <button onClick={() => setPressed(false)}>Reset bold</button>
    </>
  );
}
export const Default: Story = { render: () => <Toggle>Bold</Toggle> };
export const Pressed: Story = {
  render: () => (
    <Toggle defaultPressed variant="outline">
      Bold
    </Toggle>
  ),
};
export const Sizes: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: 12 }}>
      {(['sm', 'md', 'lg'] as const).map((size) => (
        <Toggle key={size} size={size} variant="outline">
          {size}
        </Toggle>
      ))}
    </div>
  ),
};
export const Disabled: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: 12 }}>
      <Toggle disabled>Bold</Toggle>
      <Toggle disabled defaultPressed variant="outline">
        Italic
      </Toggle>
    </div>
  ),
};
export const Controlled: Story = { render: () => <ControlledToggle /> };
