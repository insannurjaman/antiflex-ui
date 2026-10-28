import type { Meta, StoryObj } from '@storybook/react-vite';
import { StrictMode, useRef, useState } from 'react';
import {
  Button,
  Input,
  Field,
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogBody,
  DialogFooter,
  DialogClose,
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogCancel,
  AlertDialogAction,
} from '@antiflex/ui';
const meta = {
  title: 'Components/Dialog',
  component: Dialog,
  parameters: { layout: 'padded' },
} satisfies Meta<typeof Dialog>;
export default meta;
type Story = StoryObj;
function Basic({
  size = 'md',
  defaultOpen = false,
  long = false,
}: {
  size?: 'sm' | 'md' | 'lg';
  defaultOpen?: boolean;
  long?: boolean;
}) {
  const title = useRef<HTMLHeadingElement>(null);
  return (
    <Dialog defaultOpen={defaultOpen}>
      <DialogTrigger>Edit project</DialogTrigger>
      <DialogContent
        size={size}
        initialFocusRef={long ? title : undefined}
        aria-describedby={long ? '' : undefined}
      >
        <DialogHeader>
          <DialogTitle ref={title}>Project details</DialogTitle>
          <DialogDescription>Changes stay in this demonstration.</DialogDescription>
        </DialogHeader>
        <DialogBody>
          {long ? (
            Array.from({ length: 12 }, (_, i) => (
              <p key={i}>
                Review topic {i + 1}: shared components bring consistent meaning and behavior to
                product screens. This example deliberately contains enough content to scroll on a
                small device.
              </p>
            ))
          ) : (
            <Field label="Project name">
              <Input defaultValue="Orbit workspace" />
            </Field>
          )}
        </DialogBody>
        <DialogFooter>
          <DialogClose>Cancel</DialogClose>
          <DialogClose variant="primary">Save project</DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
function ControlledExample({ ignore = false }: { ignore?: boolean }) {
  const [open, setOpen] = useState(false);
  return (
    <Dialog
      open={open}
      onOpenChange={(next) => {
        if (!ignore || next) setOpen(next);
      }}
    >
      <DialogTrigger>Open controlled dialog</DialogTrigger>
      <DialogContent
        onCancel={(event) => {
          if (ignore) event.preventDefault();
        }}
      >
        <DialogHeader>
          <DialogTitle>Controlled project</DialogTitle>
          <DialogDescription>The application owns open state.</DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <DialogClose>Request close</DialogClose>
          <Button onClick={() => setOpen(false)}>Close from owner</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
function NestedExample() {
  return (
    <Dialog>
      <DialogTrigger>Open parent</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Parent task</DialogTitle>
          <DialogDescription>The child returns focus to its own invoker.</DialogDescription>
        </DialogHeader>
        <DialogBody>
          <AlertDialog>
            <AlertDialogTrigger>Open child confirmation</AlertDialogTrigger>
            <AlertDialogContent size="sm">
              <AlertDialogHeader>
                <AlertDialogTitle>Child confirmation</AlertDialogTitle>
                <AlertDialogDescription>
                  Only this confirmation closes first.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Keep editing</AlertDialogCancel>
                <AlertDialogAction>Confirm child</AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </DialogBody>
        <DialogFooter>
          <DialogClose>Close parent</DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
function NativeFormExample() {
  return (
    <Dialog>
      <DialogTrigger>Open native form</DialogTrigger>
      <DialogContent>
        <form method="dialog">
          <DialogHeader>
            <DialogTitle>Native completion</DialogTitle>
          </DialogHeader>
          <DialogBody>
            <Field label="Required name">
              <Input required name="name" />
            </Field>
          </DialogBody>
          <DialogFooter>
            <DialogClose>Cancel</DialogClose>
            <Button type="submit" value="done">
              Complete native form
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
function MountExample() {
  const [mounted, setMounted] = useState(true);
  const restore = useRef<HTMLButtonElement>(null);
  return (
    <>
      <Button ref={restore} onClick={() => setMounted(true)}>
        Mount dialog
      </Button>
      {mounted && (
        <Dialog>
          <DialogTrigger>Open removable dialog</DialogTrigger>
          <DialogContent returnFocusRef={restore}>
            <DialogHeader>
              <DialogTitle>Removable task</DialogTitle>
              <DialogDescription>
                Unmounting cleans up native modality and scroll.
              </DialogDescription>
            </DialogHeader>
            <DialogFooter>
              <Button onClick={() => setMounted(false)}>Remove dialog tree</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
    </>
  );
}
function UnlabelledDescriptionExample() {
  return (
    <Dialog>
      <DialogTrigger>Open named dialog</DialogTrigger>
      <DialogContent aria-label="Named task">
        <DialogBody>
          <p>No description component is rendered.</p>
        </DialogBody>
        <DialogFooter>
          <DialogClose>Close named task</DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
export const Default: Story = { render: () => <Basic /> };
export const Small: Story = { render: () => <Basic size="sm" defaultOpen /> };
export const Large: Story = { render: () => <Basic size="lg" defaultOpen /> };
export const Open: Story = { render: () => <Basic defaultOpen /> };
export const LongContent: Story = { render: () => <Basic long defaultOpen size="lg" /> };
export const Controlled: Story = { render: () => <ControlledExample /> };
export const ControlledRefusal: Story = { render: () => <ControlledExample ignore /> };
export const Nested: Story = { render: () => <NestedExample /> };
export const NativeForm: Story = { render: () => <NativeFormExample /> };
export const Unmount: Story = { render: () => <MountExample /> };
export const ExplicitName: Story = { render: () => <UnlabelledDescriptionExample /> };
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
