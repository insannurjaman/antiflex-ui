import type { Meta, StoryObj } from '@storybook/react-vite';
import { StrictMode, useRef, useState } from 'react';
import {
  Button,
  Toast,
  ToastProvider,
  ToastViewport,
  useToast,
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogTitle,
  DialogClose,
  type ToastOptions,
  type ToastViewportProps,
} from '@antiflex/ui';
const meta = {
  title: 'Components/Toast',
  component: Toast,
  parameters: { layout: 'padded' },
} satisfies Meta<typeof Toast>;
export default meta;
type Story = StoryObj;
function Controls({
  mode = '',
  layout = 'inline',
  position = 'bottom-end',
}: {
  mode?: string;
  layout?: 'fixed' | 'inline';
  position?: ToastViewportProps['position'];
}) {
  const { toast, update, dismiss, dismissAll } = useToast();
  const viewport = useRef<HTMLDivElement>(null),
    last = useRef<string | null>(null),
    attemptCount = useRef(0);
  const [result, setResult] = useState('No action yet.'),
    [attempts, setAttempts] = useState(0),
    [details, setDetails] = useState(false);
  const notify = (options: ToastOptions) => {
    last.current = toast(options);
    if (!last.current) setResult('Notification not added.');
  };
  return (
    <div dir={mode === 'rtl' ? 'rtl' : 'ltr'} style={{ maxWidth: 640, padding: 8 }}>
      <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
        <Button
          onClick={() =>
            notify({
              title: 'Project saved',
              description: 'Changes are local.',
              variant: 'success',
              duration: mode === 'timing' ? 1200 : 0,
            })
          }
        >
          Show notification
        </Button>
        <Button
          variant="secondary"
          onClick={() => notify({ id: 'stable', title: 'Saving project', duration: 0 })}
        >
          Show progress
        </Button>
        <Button
          variant="secondary"
          onClick={() => {
            if (last.current)
              update(last.current, {
                title: 'Project ready',
                variant: 'success',
                duration: mode === 'timing' ? 1200 : 0,
              });
          }}
        >
          Update notification
        </Button>
        <Button
          variant="secondary"
          onClick={() =>
            notify({
              title: 'Undo available',
              description: 'This action restores the local sample.',
              action: { label: 'Undo change', onAction: () => setResult('Change restored') },
            })
          }
        >
          Show action
        </Button>
        <Button
          variant="secondary"
          onClick={() =>
            notify({
              title: 'Retry local action',
              action: {
                label: 'Retry save',
                onAction: async () => {
                  const attempt = ++attemptCount.current;
                  setAttempts(attempt);
                  await new Promise((resolve) => setTimeout(resolve, 250));
                  if (attempt === 1) throw Error('Sample failure');
                  setResult('Retry succeeded');
                },
                errorMessage: 'Sample save failed. Try Retry save again.',
              },
            })
          }
        >
          Show async action
        </Button>
        <Button
          variant="secondary"
          onClick={() =>
            notify({
              title: 'Open details',
              action: { label: 'Review details', onAction: () => setDetails(true) },
            })
          }
        >
          Show dialog action
        </Button>
        <Button variant="ghost" onClick={() => viewport.current?.focus()}>
          Review notifications
        </Button>
        <Button
          variant="ghost"
          onClick={() => {
            if (last.current) dismiss(last.current);
          }}
        >
          Dismiss latest
        </Button>
        <Button variant="ghost" onClick={dismissAll}>
          Clear notifications
        </Button>
        <Button
          variant="ghost"
          onClick={() => {
            for (let i = 1; i <= 5; i++)
              toast({
                id: 'queued-' + i,
                title: 'Queued message ' + i,
                duration: mode === 'timing' ? 1200 : 0,
              });
          }}
        >
          Queue five
        </Button>
        <Button
          variant="ghost"
          onClick={() =>
            notify({ title: 'Urgent sample error', variant: 'danger', priority: 'assertive' })
          }
        >
          Urgent notification
        </Button>
        <Button
          variant="ghost"
          onClick={() => {
            toast({ title: '', duration: 0 });
            toast({ title: 'Invalid duration', duration: -1 });
            toast({ title: 'Unnamed action', action: { label: ' ', onAction: () => {} } });
          }}
        >
          Reject invalid input
        </Button>
      </div>
      <p data-testid="action-result">
        {result} · Attempts {attempts}
      </p>
      <ToastViewport ref={viewport} layout={layout} position={position} />
      <Dialog open={details} onOpenChange={setDetails}>
        <DialogContent>
          <DialogTitle>Notification details</DialogTitle>
          <DialogClose>Close details</DialogClose>
        </DialogContent>
      </Dialog>
    </div>
  );
}
function Example({
  mode = '',
  initial = [],
  layout = 'inline',
  position = 'bottom-end',
  capacity = 50,
}: {
  mode?: string;
  initial?: ToastOptions[];
  layout?: 'fixed' | 'inline';
  position?: ToastViewportProps['position'];
  capacity?: number;
}) {
  return (
    <ToastProvider initialToasts={initial} maxToasts={capacity}>
      <Controls mode={mode} layout={layout} position={position} />
    </ToastProvider>
  );
}
export const Default: Story = { render: () => <Example /> };
export const Neutral: Story = {
  render: () => (
    <Example
      initial={[
        {
          title: 'Changes are local',
          description: 'Your application owns persistence.',
          duration: 0,
        },
      ]}
    />
  ),
};
export const Success: Story = {
  render: () => (
    <Example
      initial={[
        {
          title: 'Project saved',
          description: 'Your changes are ready.',
          variant: 'success',
          duration: 0,
        },
      ]}
    />
  ),
};
export const Warning: Story = {
  render: () => (
    <Example
      initial={[
        {
          title: 'Storage nearly full',
          description: 'Review the local example before continuing.',
          variant: 'warning',
        },
      ]}
    />
  ),
};
export const Danger: Story = {
  render: () => (
    <Example
      initial={[
        {
          title: 'Project could not be saved',
          description: 'Check the project name and try again.',
          variant: 'danger',
        },
      ]}
    />
  ),
};
export const WithAction: Story = { render: () => <Example /> };
export const AsyncAction: Story = { render: () => <Example /> };
export const Queue: Story = { render: () => <Example capacity={4} /> };
export const LongContent: Story = {
  render: () => (
    <Example
      initial={[
        {
          title: 'A long project name needs a readable confirmation without truncating its purpose',
          description:
            'This synthetic description includes averylongunbrokentoken1234567890abcdefghijklmnopqrstuvwxyz that must wrap within the viewport instead of pushing controls off the screen.',
          variant: 'warning',
        },
      ]}
    />
  ),
};
export const Rtl: Story = {
  render: () => (
    <Example
      mode="rtl"
      initial={[
        {
          title: 'تم حفظ المشروع',
          description: 'يمكنك متابعة العمل.',
          variant: 'success',
          duration: 0,
        },
      ]}
    />
  ),
};
export const Persistent: Story = {
  render: () => (
    <ToastProvider defaultDuration={0}>
      <Controls />
    </ToastProvider>
  ),
};
export const Timing: Story = { render: () => <Example mode="timing" /> };
function Cleanup() {
  const [mounted, setMounted] = useState(true);
  return (
    <>
      <Button onClick={() => setMounted((v) => !v)}>Toggle notification mount</Button>
      {mounted && <Example />}
    </>
  );
}
export const StrictCleanup: Story = {
  render: () => (
    <StrictMode>
      <Cleanup />
    </StrictMode>
  ),
};
export const InsideDialog: Story = {
  render: () => (
    <Dialog>
      <DialogTrigger>Open notification task</DialogTrigger>
      <DialogContent>
        <DialogTitle>Local notification task</DialogTitle>
        <Example layout="fixed" />
        <DialogClose>Close notification task</DialogClose>
      </DialogContent>
    </Dialog>
  ),
};
export const FixedPositions: Story = {
  render: () => <Example layout="fixed" position="top-start" />,
};
export const ExplicitPriority: Story = {
  render: () => (
    <Example
      initial={[
        {
          title: 'Urgent sample error',
          description: 'Assertive is an explicit application choice.',
          variant: 'danger',
          priority: 'assertive',
        },
      ]}
    />
  ),
};
