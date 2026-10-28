'use client';
import { useRef, useState } from 'react';
import {
  Button,
  Checkbox,
  Field,
  Input,
  ToastProvider,
  ToastViewport,
  useToast,
  Badge,
} from '@antiflex/ui';
import { IconArchive, IconDeviceFloppy, IconBell } from '@tabler/icons-react';
function ToastTask({ fixed = false }: { fixed?: boolean }) {
  const { toast, update, dismissAll } = useToast();
  const [name, setName] = useState('Atlas workspace'),
    [saved, setSaved] = useState('Atlas workspace'),
    [archived, setArchived] = useState(false),
    [persistent, setPersistent] = useState(false),
    [saving, setSaving] = useState(false);
  const viewport = useRef<HTMLDivElement>(null);
  const save = async () => {
    const requested = name.trim();
    if (!requested) {
      toast({
        id: 'project-save',
        title: 'Project name is required',
        description: 'Enter a name before saving your local project.',
        variant: 'danger',
      });
      return;
    }
    if (saving) return;
    setSaving(true);
    const id = toast({
      id: 'project-save',
      title: 'Saving local project…',
      description: 'Your changes stay in this demonstration.',
      duration: 0,
    });
    await new Promise((resolve) => setTimeout(resolve, 650));
    setSaved(requested);
    setSaving(false);
    if (id)
      update(id, {
        title: 'Project saved',
        description: `${requested} is the saved local name.`,
        variant: 'success',
        duration: persistent ? 0 : 6000,
      });
  };
  const archive = () => {
    setArchived(true);
    toast({
      id: 'project-archive',
      title: 'Project archived',
      description: 'You can restore it from this notification.',
      variant: 'neutral',
      action: {
        label: 'Undo archive',
        onAction: () => {
          setArchived(false);
        },
      },
    });
  };
  return (
    <div className="toast-example">
      <div className="toast-example__project">
        <div>
          <strong>{saved}</strong>
          <p>Synthetic project · Changes stay in this page</p>
        </div>
        <Badge variant={archived ? 'neutral' : 'success'}>{archived ? 'Archived' : 'Active'}</Badge>
      </div>
      <Field label="Local project name">
        <Input value={name} onChange={(event) => setName(event.target.value)} />
      </Field>
      <label className="toast-example__preference">
        <Checkbox checked={persistent} onChange={(event) => setPersistent(event.target.checked)} />
        Keep save confirmations until dismissed
      </label>
      <div className="demo-row">
        <Button loading={saving} onClick={() => void save()}>
          <IconDeviceFloppy />
          Save local project
        </Button>
        <Button variant="secondary" disabled={archived} onClick={archive}>
          <IconArchive />
          Archive sample
        </Button>
        <Button variant="ghost" onClick={() => viewport.current?.focus()}>
          <IconBell />
          Review notifications
        </Button>
      </div>
      <div className="demo-row">
        <Button
          variant="ghost"
          size="sm"
          onClick={() =>
            toast({
              title: 'Changes are local',
              description: 'Connect application data when using these components in your product.',
              variant: 'warning',
            })
          }
        >
          Show warning
        </Button>
        <Button variant="ghost" size="sm" onClick={dismissAll}>
          Clear notifications
        </Button>
      </div>
      {!fixed && (
        <p className="toast-example__hint">
          Notifications appear here. Hover or focus pauses timed messages. Archive actions stay
          available until dismissed.
        </p>
      )}
      <ToastViewport
        ref={viewport}
        layout={fixed ? 'fixed' : 'inline'}
        label="Project notifications"
      />
    </div>
  );
}
export function ToastExample({ fixed = false }: { fixed?: boolean }) {
  return (
    <ToastProvider>
      <ToastTask fixed={fixed} />
    </ToastProvider>
  );
}
export function ToastComponentDemo() {
  return <ToastExample />;
}
