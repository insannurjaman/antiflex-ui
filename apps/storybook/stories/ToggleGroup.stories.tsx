import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';
import { ToggleGroup, ToggleGroupItem } from '@antiflex/ui';
const meta = {
  title: 'Components/Toggle Group',
  component: ToggleGroup,
  parameters: { layout: 'padded' },
} satisfies Meta<typeof ToggleGroup>;
export default meta;
type Story = StoryObj;
function SampleToggleGroup({
  multiple = false,
  vertical = false,
}: {
  multiple?: boolean;
  vertical?: boolean;
}) {
  const [value, setValue] = useState(['bold']);
  return (
    <>
      <ToggleGroup
        type={multiple ? 'multiple' : 'single'}
        value={value}
        onValueChange={setValue}
        orientation={vertical ? 'vertical' : 'horizontal'}
        aria-label="Text formatting"
      >
        <ToggleGroupItem value="bold">Bold</ToggleGroupItem>
        <ToggleGroupItem value="italic">Italic</ToggleGroupItem>
        <ToggleGroupItem value="underline" disabled>
          Underline
        </ToggleGroupItem>
      </ToggleGroup>
      <p>Pressed: {value.join(', ') || 'none'}</p>
    </>
  );
}
export const Default: Story = { render: () => <SampleToggleGroup /> };
export const Multiple: Story = { render: () => <SampleToggleGroup multiple /> };
export const Vertical: Story = { render: () => <SampleToggleGroup vertical /> };
export const Disabled: Story = {
  render: () => (
    <ToggleGroup disabled defaultValue={['bold']} aria-label="Unavailable formatting">
      <ToggleGroupItem value="bold">Bold</ToggleGroupItem>
      <ToggleGroupItem value="italic">Italic</ToggleGroupItem>
    </ToggleGroup>
  ),
};
export const RTL: Story = {
  render: () => (
    <div dir="rtl">
      <SampleToggleGroup />
    </div>
  ),
};

function WrappedToggle({ value, disabled }: { value: string; disabled?: boolean }) {
  return (
    <ToggleGroupItem value={value} disabled={disabled}>
      {value}
    </ToggleGroupItem>
  );
}
function WrappedItems() {
  return (
    <>
      <WrappedToggle value="One" />
      <WrappedToggle value="Disabled" disabled />
      <WrappedToggle value="Two" />
    </>
  );
}
function WrappedGroupsExample() {
  const [disabled, setDisabled] = useState(false);
  return (
    <>
      <ToggleGroup defaultValue={['Two']} aria-label="Wrapped individual toggles">
        <WrappedToggle value="One" />
        <WrappedToggle value="Disabled" disabled />
        <WrappedToggle value="Two" disabled={disabled} />
      </ToggleGroup>
      <button onClick={() => setDisabled(!disabled)}>Change availability</button>
      <ToggleGroup aria-label="Wrapped whole collection">
        <WrappedItems />
      </ToggleGroup>
    </>
  );
}
export const CustomWrappers: Story = { render: () => <WrappedGroupsExample /> };
