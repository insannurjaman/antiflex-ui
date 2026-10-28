import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';
import { Collapsible, CollapsibleTrigger, CollapsibleContent } from '@antiflex/ui';
const meta = {
  title: 'Components/Collapsible',
  component: Collapsible,
  parameters: { layout: 'padded' },
} satisfies Meta<typeof Collapsible>;
export default meta;
type Story = StoryObj;
function ControlledDisclosure() {
  const [open, setOpen] = useState(false);
  return (
    <Collapsible open={open} onOpenChange={setOpen}>
      <CollapsibleTrigger>Advanced settings</CollapsibleTrigger>
      <CollapsibleContent>
        <label>
          Connection label <input defaultValue="Development" />
        </label>
        <button onClick={() => setOpen(false)}>Close from inside</button>
      </CollapsibleContent>
    </Collapsible>
  );
}
export const Default: Story = {
  render: () => (
    <Collapsible>
      <CollapsibleTrigger>Show connection details</CollapsibleTrigger>
      <CollapsibleContent>Development connection. No network request is made.</CollapsibleContent>
    </Collapsible>
  ),
};
export const Open: Story = {
  render: () => (
    <Collapsible defaultOpen>
      <CollapsibleTrigger>Connection details</CollapsibleTrigger>
      <CollapsibleContent>Development connection. No network request is made.</CollapsibleContent>
    </Collapsible>
  ),
};
export const Disabled: Story = {
  render: () => (
    <Collapsible disabled>
      <CollapsibleTrigger>Unavailable details</CollapsibleTrigger>
      <CollapsibleContent>Unavailable.</CollapsibleContent>
    </Collapsible>
  ),
};
export const Controlled: Story = { render: () => <ControlledDisclosure /> };
