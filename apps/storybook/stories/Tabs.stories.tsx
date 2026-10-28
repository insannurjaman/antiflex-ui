import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@antiflex/ui';
const meta = {
  title: 'Components/Tabs',
  component: Tabs,
  parameters: { layout: 'padded' },
} satisfies Meta<typeof Tabs>;
export default meta;
type Story = StoryObj;
function SampleTabs({
  manual = false,
  vertical = false,
}: {
  manual?: boolean;
  vertical?: boolean;
}) {
  return (
    <Tabs
      defaultValue="overview"
      activationMode={manual ? 'manual' : 'automatic'}
      orientation={vertical ? 'vertical' : 'horizontal'}
    >
      <TabsList aria-label="Project sections">
        <TabsTrigger value="overview">Overview</TabsTrigger>
        <TabsTrigger value="activity">Activity</TabsTrigger>
        <TabsTrigger value="billing" disabled>
          Billing
        </TabsTrigger>
        <TabsTrigger value="settings">Settings</TabsTrigger>
      </TabsList>
      <TabsContent value="overview">A concise project summary.</TabsContent>
      <TabsContent value="activity">Recent changes and review activity.</TabsContent>
      <TabsContent value="billing">Billing is unavailable.</TabsContent>
      <TabsContent value="settings">
        <label>
          Project name <input defaultValue="Orbit" />
        </label>
      </TabsContent>
    </Tabs>
  );
}
function ControlledTabs() {
  const [value, setValue] = useState('one');
  return (
    <>
      <Tabs value={value} onValueChange={setValue}>
        <TabsList aria-label="Controlled sections">
          <TabsTrigger value="one">First</TabsTrigger>
          <TabsTrigger value="two">Second</TabsTrigger>
        </TabsList>
        <TabsContent value="one">First panel</TabsContent>
        <TabsContent value="two">Second panel</TabsContent>
      </Tabs>
      <button onClick={() => setValue('one')}>Reset selection</button>
    </>
  );
}
export const Default: Story = { render: () => <SampleTabs /> };
export const Manual: Story = { render: () => <SampleTabs manual /> };
export const Vertical: Story = { render: () => <SampleTabs vertical /> };
export const Controlled: Story = { render: () => <ControlledTabs /> };
export const RTL: Story = {
  render: () => (
    <div dir="rtl">
      <SampleTabs />
    </div>
  ),
};

function WrappedTab({ value, disabled }: { value: string; disabled?: boolean }) {
  return (
    <TabsTrigger value={value} disabled={disabled}>
      {value}
    </TabsTrigger>
  );
}
function WrappedTabList() {
  return (
    <TabsList aria-label="Wrapped whole list">
      <WrappedTab value="One" />
      <WrappedTab value="Disabled" disabled />
      <WrappedTab value="Two" />
    </TabsList>
  );
}
function WrappedTabsExample() {
  const [disabled, setDisabled] = useState(false);
  return (
    <>
      <Tabs defaultValue="Two">
        <TabsList aria-label="Wrapped individual tabs">
          <WrappedTab value="One" />
          <WrappedTab value="Disabled" disabled />
          <WrappedTab value="Two" disabled={disabled} />
        </TabsList>
        <TabsContent value="One">First wrapped panel.</TabsContent>
        <TabsContent value="Two">Second wrapped panel.</TabsContent>
        <TabsContent value="Disabled">Unavailable panel.</TabsContent>
      </Tabs>
      <button onClick={() => setDisabled(!disabled)}>Change availability</button>
      <Tabs>
        <WrappedTabList />
        <TabsContent value="One">First inferred panel.</TabsContent>
        <TabsContent value="Two">Second inferred panel.</TabsContent>
        <TabsContent value="Disabled">Unavailable panel.</TabsContent>
      </Tabs>
    </>
  );
}
export const CustomWrappers: Story = { render: () => <WrappedTabsExample /> };
