import type { Meta, StoryObj } from '@storybook/react-vite';
import { StrictMode, useRef, useState } from 'react';
import {
  Button,
  Field,
  Input,
  Drawer,
  DrawerTrigger,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerDescription,
  DrawerBody,
  DrawerFooter,
  DrawerClose,
  type DrawerContentProps,
} from '@antiflex/ui';
const meta = {
  title: 'Components/Drawer',
  component: Drawer,
  parameters: { layout: 'padded' },
} satisfies Meta<typeof Drawer>;
export default meta;
type Story = StoryObj;
function Sample({
  size = 'md',
  defaultOpen = true,
  long = false,
}: Pick<DrawerContentProps, 'size'> & { defaultOpen?: boolean; long?: boolean }) {
  const title = useRef<HTMLHeadingElement>(null);
  return (
    <Drawer defaultOpen={defaultOpen}>
      <DrawerTrigger>Open export drawer</DrawerTrigger>
      <DrawerContent
        size={size}
        initialFocusRef={long ? title : undefined}
        aria-describedby={long ? '' : undefined}
      >
        <DrawerHeader>
          <DrawerTitle ref={title}>Export project records</DrawerTitle>
          <DrawerDescription>Choose the scope for your local sample export.</DrawerDescription>
        </DrawerHeader>
        <DrawerBody>
          <Field label="Export name">
            <Input defaultValue="Project records" />
          </Field>
          {long &&
            Array.from({ length: 20 }, (_, i) => (
              <p key={i}>
                Included field {i + 1}: this sample text demonstrates the scrollable content region.
                The title and closing action stay within reach.
              </p>
            ))}
        </DrawerBody>
        <DrawerFooter>
          <DrawerClose>Close drawer</DrawerClose>
          <Button disabled>Export unavailable</Button>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}
function NativeForm() {
  return (
    <Drawer>
      <DrawerTrigger>Open native export form</DrawerTrigger>
      <DrawerContent>
        <form method="dialog">
          <DrawerHeader>
            <DrawerTitle>Native export form</DrawerTitle>
          </DrawerHeader>
          <DrawerBody>
            <Field label="Required file name">
              <Input name="file" required />
            </Field>
          </DrawerBody>
          <DrawerFooter>
            <DrawerClose>Cancel</DrawerClose>
            <Button type="submit">Complete export form</Button>
          </DrawerFooter>
        </form>
      </DrawerContent>
    </Drawer>
  );
}
function Removable() {
  const [mounted, setMounted] = useState(true);
  const target = useRef<HTMLButtonElement>(null);
  return (
    <>
      <Button ref={target} onClick={() => setMounted(true)}>
        Mount drawer
      </Button>
      {mounted && (
        <Drawer>
          <DrawerTrigger>Open removable drawer</DrawerTrigger>
          <DrawerContent returnFocusRef={target}>
            <DrawerHeader>
              <DrawerTitle>Removable task</DrawerTitle>
            </DrawerHeader>
            <DrawerFooter>
              <Button onClick={() => setMounted(false)}>Remove drawer</Button>
            </DrawerFooter>
          </DrawerContent>
        </Drawer>
      )}
    </>
  );
}
export const Default: Story = { render: () => <Sample defaultOpen={false} /> };
export const Open: Story = { render: () => <Sample /> };
export const Small: Story = { render: () => <Sample size="sm" /> };
export const Large: Story = { render: () => <Sample size="lg" /> };
export const LongContent: Story = { render: () => <Sample long /> };
export const NativeCompletion: Story = { render: () => <NativeForm /> };
export const Unmount: Story = { render: () => <Removable /> };
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
