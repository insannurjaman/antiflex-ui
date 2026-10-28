import type { Meta, StoryObj } from '@storybook/react-vite';
import { useRef, useState } from 'react';
import {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogCancel,
  AlertDialogAction,
} from '@antiflex/ui';
const meta = {
  title: 'Components/Alert Dialog',
  component: AlertDialog,
  parameters: { layout: 'padded' },
} satisfies Meta<typeof AlertDialog>;
export default meta;
type Story = StoryObj;
function Sample({
  defaultOpen = false,
  size = 'sm',
  disabled = false,
}: {
  defaultOpen?: boolean;
  size?: 'sm' | 'md' | 'lg';
  disabled?: boolean;
}) {
  return (
    <AlertDialog defaultOpen={defaultOpen}>
      <AlertDialogTrigger variant="danger" disabled={disabled}>
        Archive project
      </AlertDialogTrigger>
      <AlertDialogContent size={size}>
        <AlertDialogHeader>
          <AlertDialogTitle>Archive this project?</AlertDialogTitle>
          <AlertDialogDescription>
            Members will no longer see this sample in their active list. The demo sends no request.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Keep project</AlertDialogCancel>
          <AlertDialogAction>Archive project</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
function PendingExample() {
  const [open, setOpen] = useState(false);
  const [pending, setPending] = useState(false);
  const [message, setMessage] = useState('');
  const action = useRef<HTMLButtonElement>(null);
  return (
    <AlertDialog
      open={open}
      onOpenChange={(next) => {
        if (!pending) setOpen(next);
      }}
    >
      <AlertDialogTrigger>Try pending confirmation</AlertDialogTrigger>
      <AlertDialogContent
        onCancel={(event) => {
          if (pending) event.preventDefault();
        }}
      >
        <AlertDialogHeader>
          <AlertDialogTitle>Apply sample change?</AlertDialogTitle>
          <AlertDialogDescription>
            This controlled example simulates pending and failed work locally.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogBody>{message && <p role="alert">{message}</p>}</AlertDialogBody>
        <AlertDialogFooter>
          <AlertDialogCancel disabled={pending}>Cancel change</AlertDialogCancel>
          <AlertDialogAction
            ref={action}
            loading={pending}
            onClick={(event) => {
              event.preventDefault();
              setMessage('');
              setPending(true);
              setTimeout(() => {
                setPending(false);
                setMessage('The sample operation failed. Try again or cancel.');
              }, 300);
            }}
          >
            Apply change
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
export const Default: Story = { render: () => <Sample /> };
export const Open: Story = { render: () => <Sample defaultOpen /> };
export const Medium: Story = { render: () => <Sample defaultOpen size="md" /> };
export const Large: Story = { render: () => <Sample defaultOpen size="lg" /> };
export const DisabledTrigger: Story = { render: () => <Sample disabled /> };
export const PendingAndError: Story = { render: () => <PendingExample /> };
export const RTL: Story = {
  render: () => (
    <div dir="rtl">
      <Sample defaultOpen />
    </div>
  ),
};
