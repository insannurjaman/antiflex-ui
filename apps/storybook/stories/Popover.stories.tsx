import type { Meta, StoryObj } from '@storybook/react-vite';
import { StrictMode, useRef, useState } from 'react';
import {
  Button,
  Field,
  Input,
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverTitle,
  PopoverDescription,
  PopoverClose,
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogTitle,
  DialogClose,
} from '@antiflex/ui';
const meta = {
  title: 'Components/Popover',
  component: Popover,
  parameters: { layout: 'padded' },
} satisfies Meta<typeof Popover>;
export default meta;
type Story = StoryObj;
function Basic({
  side = 'bottom',
  align = 'start',
  defaultOpen = false,
  long = false,
}: {
  side?: 'top' | 'right' | 'bottom' | 'left';
  align?: 'start' | 'center' | 'end';
  defaultOpen?: boolean;
  long?: boolean;
}) {
  return (
    <Popover defaultOpen={defaultOpen}>
      <PopoverTrigger>Edit view</PopoverTrigger>
      <PopoverContent side={side} align={align}>
        <PopoverTitle>View settings</PopoverTitle>
        <PopoverDescription>Changes stay in this sample.</PopoverDescription>
        <Field label="View name">
          <Input defaultValue="Active projects" />
        </Field>
        {long &&
          Array.from({ length: 18 }, (_, i) => (
            <p key={i}>
              Sample note {i + 1}: a long description remains scrollable within the available
              viewport.
            </p>
          ))}
        <PopoverClose>Done</PopoverClose>
      </PopoverContent>
    </Popover>
  );
}
function Controlled({ refuse = false }: { refuse?: boolean }) {
  const [open, setOpen] = useState(false);
  return (
    <Popover
      open={open}
      onOpenChange={(next) => {
        if (next || !refuse) setOpen(next);
      }}
    >
      <PopoverTrigger>Open controlled panel</PopoverTrigger>
      <PopoverContent>
        <PopoverTitle>Controlled panel</PopoverTitle>
        <PopoverClose>Request close</PopoverClose>
        <Button onClick={() => setOpen(false)}>Close from owner</Button>
      </PopoverContent>
    </Popover>
  );
}
function Nested() {
  return (
    <Popover>
      <PopoverTrigger>Open parent panel</PopoverTrigger>
      <PopoverContent>
        <PopoverTitle>Parent panel</PopoverTitle>
        <Popover>
          <PopoverTrigger>Open child panel</PopoverTrigger>
          <PopoverContent side="right">
            <PopoverTitle>Child panel</PopoverTitle>
            <PopoverClose>Close child</PopoverClose>
          </PopoverContent>
        </Popover>
        <PopoverClose>Close parent</PopoverClose>
      </PopoverContent>
    </Popover>
  );
}
function InDialog() {
  return (
    <Dialog>
      <DialogTrigger>Open task</DialogTrigger>
      <DialogContent>
        <DialogTitle>Project task</DialogTitle>
        <Basic />
        <DialogClose>Close task</DialogClose>
      </DialogContent>
    </Dialog>
  );
}
function Removable() {
  const [mounted, setMounted] = useState(true);
  const restore = useRef<HTMLButtonElement>(null);
  return (
    <>
      <Button ref={restore} onClick={() => setMounted(true)}>
        Mount panel
      </Button>
      {mounted && (
        <Popover>
          <PopoverTrigger>Open removable panel</PopoverTrigger>
          <PopoverContent returnFocusRef={restore}>
            <PopoverTitle>Removable panel</PopoverTitle>
            <Button onClick={() => setMounted(false)}>Remove panel tree</Button>
          </PopoverContent>
        </Popover>
      )}
    </>
  );
}
export const Default: Story = {
  render: () => (
    <>
      <Basic />
      <Button variant="ghost">Outside action</Button>
      <Input aria-label="Outside field" />
    </>
  ),
};
export const Open: Story = { render: () => <Basic defaultOpen /> };
export const Top: Story = {
  render: () => (
    <div style={{ paddingTop: 260 }}>
      <Basic side="top" defaultOpen />
    </div>
  ),
};
export const Right: Story = { render: () => <Basic side="right" defaultOpen /> };
export const Left: Story = {
  render: () => (
    <div style={{ paddingInlineStart: 360 }}>
      <Basic side="left" defaultOpen />
    </div>
  ),
};
export const ControlledState: Story = { render: () => <Controlled /> };
export const ControlledRefusal: Story = { render: () => <Controlled refuse /> };
export const NestedPanels: Story = { render: () => <Nested /> };
export const InsideDialog: Story = { render: () => <InDialog /> };
export const LongContent: Story = { render: () => <Basic long defaultOpen /> };
export const ScrollAnchor: Story = {
  render: () => (
    <div
      role="region"
      aria-label="Scrollable anchor"
      style={{ height: 160, overflow: 'auto', border: '1px solid var(--af-semantic-border)' }}
    >
      <div style={{ padding: 24, height: 600 }}>
        <Basic />
      </div>
    </div>
  ),
};
export const Unmount: Story = { render: () => <Removable /> };
export const StrictLifecycle: Story = {
  render: () => (
    <StrictMode>
      <Basic defaultOpen />
    </StrictMode>
  ),
};
export const RTL: Story = {
  render: () => (
    <div dir="rtl">
      <Basic defaultOpen />
    </div>
  ),
};
export const ExplicitName: Story = {
  render: () => (
    <Popover>
      <PopoverTrigger>Open named panel</PopoverTrigger>
      <PopoverContent aria-label="Named panel">
        <p>Content can use an explicit accessible name.</p>
        <PopoverClose>Close named panel</PopoverClose>
      </PopoverContent>
    </Popover>
  ),
};
