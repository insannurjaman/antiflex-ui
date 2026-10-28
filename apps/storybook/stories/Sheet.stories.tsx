import type { Meta, StoryObj } from '@storybook/react-vite';
import { StrictMode, useRef, useState } from 'react';
import {
  Button,
  Field,
  Input,
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
  SheetBody,
  SheetFooter,
  SheetClose,
  Drawer,
  DrawerTrigger,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerBody,
  DrawerFooter,
  DrawerClose,
  type SheetContentProps,
} from '@antiflex/ui';
const meta = {
  title: 'Components/Sheet',
  component: Sheet,
  parameters: { layout: 'padded' },
} satisfies Meta<typeof Sheet>;
export default meta;
type Story = StoryObj;
function Sample({
  side = 'right',
  size = 'md',
  defaultOpen = true,
  long = false,
  nested = false,
  dismissOnOutside = true,
}: Pick<SheetContentProps, 'side' | 'size' | 'dismissOnOutside'> & {
  defaultOpen?: boolean;
  long?: boolean;
  nested?: boolean;
}) {
  const title = useRef<HTMLHeadingElement>(null);
  return (
    <Sheet defaultOpen={defaultOpen}>
      <SheetTrigger>Open workspace sheet</SheetTrigger>
      <SheetContent
        side={side}
        size={size}
        dismissOnOutside={dismissOnOutside}
        initialFocusRef={long ? title : undefined}
        aria-describedby={long ? '' : undefined}
      >
        <SheetHeader>
          <SheetTitle ref={title}>Workspace settings</SheetTitle>
          <SheetDescription>Review this local sample workspace.</SheetDescription>
        </SheetHeader>
        <SheetBody>
          <Field label="Workspace name">
            <Input defaultValue="Orbit workspace" />
          </Field>
          {nested && (
            <Drawer>
              <DrawerTrigger>Open export drawer</DrawerTrigger>
              <DrawerContent>
                <DrawerHeader>
                  <DrawerTitle>Export options</DrawerTitle>
                </DrawerHeader>
                <DrawerBody>
                  <p>Sample nested task.</p>
                </DrawerBody>
                <DrawerFooter>
                  <DrawerClose>Close export drawer</DrawerClose>
                </DrawerFooter>
              </DrawerContent>
            </Drawer>
          )}
          {long &&
            Array.from({ length: 20 }, (_, i) => (
              <p key={i}>
                Review topic {i + 1}: shared components give product teams a consistent foundation.
                Keep each setting clear and review the impact before saving changes.
              </p>
            ))}
        </SheetBody>
        <SheetFooter>
          <SheetClose>Close sheet</SheetClose>
          <Button disabled>Save settings</Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
function Controlled() {
  const [open, setOpen] = useState(false);
  return (
    <Sheet
      open={open}
      onOpenChange={(next) => {
        if (next) setOpen(true);
      }}
    >
      <SheetTrigger>Open controlled sheet</SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Controlled task</SheetTitle>
        </SheetHeader>
        <SheetBody>
          <p>The owner declines close requests.</p>
        </SheetBody>
        <SheetFooter>
          <SheetClose>Request close</SheetClose>
          <Button onClick={() => setOpen(false)}>Close from owner</Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
export const Default: Story = { render: () => <Sample defaultOpen={false} /> };
export const Right: Story = { render: () => <Sample /> };
export const Left: Story = { render: () => <Sample side="left" /> };
export const Top: Story = { render: () => <Sample side="top" /> };
export const Bottom: Story = { render: () => <Sample side="bottom" /> };
export const Small: Story = { render: () => <Sample size="sm" /> };
export const Large: Story = { render: () => <Sample size="lg" /> };
export const LongContent: Story = { render: () => <Sample long /> };
export const Nested: Story = { render: () => <Sample nested /> };
export const ControlledRefusal: Story = { render: () => <Controlled /> };
export const OutsideDisabled: Story = { render: () => <Sample dismissOnOutside={false} /> };
export const RTL: Story = {
  render: () => (
    <div dir="rtl">
      <Sample />
    </div>
  ),
};
export const StrictLifecycle: Story = {
  render: () => (
    <StrictMode>
      <Sample />
    </StrictMode>
  ),
};
