'use client';
import { useRef, useState } from 'react';
import {
  Badge,
  Button,
  Field,
  Input,
  NativeSelect,
  RadioGroup,
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
  DrawerDescription,
  DrawerBody,
  DrawerFooter,
  DrawerClose,
} from '@antiflex/ui';

export function ProjectSheet() {
  const [open, setOpen] = useState(false);
  const [saved, setSaved] = useState({ name: 'Orbit workspace', visibility: 'Private' });
  const [draft, setDraft] = useState(saved);
  const [notice, setNotice] = useState('Changes stay in this local demonstration.');
  const name = useRef<HTMLInputElement>(null);
  return (
    <div className="floating-specimen">
      <div className="floating-summary">
        <strong>{saved.name}</strong>
        <Badge>{saved.visibility}</Badge>
      </div>
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetTrigger onClick={() => setDraft(saved)}>Edit workspace settings</SheetTrigger>
        <SheetContent initialFocusRef={name}>
          <form
            onSubmit={(event) => {
              event.preventDefault();
              setSaved({ ...draft, name: draft.name.trim() });
              setNotice('Workspace settings saved. No server request was made.');
              setOpen(false);
            }}
          >
            <SheetHeader>
              <SheetTitle>Workspace settings</SheetTitle>
              <SheetDescription>
                Update this sample workspace without leaving the page.
              </SheetDescription>
            </SheetHeader>
            <SheetBody>
              <Field label="Workspace name" description="Use a name your team will recognize.">
                <Input
                  ref={name}
                  required
                  pattern=".*\S.*"
                  maxLength={80}
                  value={draft.name}
                  onChange={(event) => setDraft({ ...draft, name: event.target.value })}
                />
              </Field>
              <Field label="Visibility" description="This changes the sample label only.">
                <NativeSelect
                  value={draft.visibility}
                  onChange={(event) => setDraft({ ...draft, visibility: event.target.value })}
                >
                  <option>Private</option>
                  <option>Team</option>
                </NativeSelect>
              </Field>
              <p>
                Private workspaces are visible to invited members. Team workspaces are visible to
                everyone in the sample team.
              </p>
            </SheetBody>
            <SheetFooter>
              <SheetClose>Cancel</SheetClose>
              <Button type="submit">Save settings</Button>
            </SheetFooter>
          </form>
        </SheetContent>
      </Sheet>
      <p role="status">{notice}</p>
    </div>
  );
}

const records = [
  { id: 'AF-1042', project: 'Orbit workspace', status: 'Active' },
  { id: 'AF-1043', project: 'Atlas reports', status: 'In review' },
];
export function ExportDrawer() {
  const [open, setOpen] = useState(false);
  const [format, setFormat] = useState('csv');
  const [notice, setNotice] = useState('Two sample records. No account or server required.');
  return (
    <div className="floating-specimen">
      <div className="floating-summary">
        <strong>Project export</strong>
        <Badge>2 records</Badge>
      </div>
      <Drawer open={open} onOpenChange={setOpen}>
        <DrawerTrigger>Export sample records</DrawerTrigger>
        <DrawerContent>
          <form
            onSubmit={(event) => {
              event.preventDefault();
              const data =
                format === 'json'
                  ? JSON.stringify(records, null, 2)
                  : 'id,project,status\n' +
                    records.map((record) => Object.values(record).join(',')).join('\n');
              const url = URL.createObjectURL(
                new Blob([data], {
                  type: format === 'json' ? 'application/json' : 'text/csv;charset=utf-8',
                }),
              );
              const link = document.createElement('a');
              link.href = url;
              link.download = `antiflex-sample-projects.${format}`;
              document.body.append(link);
              link.click();
              link.remove();
              setTimeout(() => URL.revokeObjectURL(url), 1000);
              setNotice(`Sample ${format.toUpperCase()} downloaded. No server request was made.`);
              setOpen(false);
            }}
          >
            <DrawerHeader>
              <DrawerTitle>Export project records</DrawerTitle>
              <DrawerDescription>
                Download two local sample records in your preferred format.
              </DrawerDescription>
            </DrawerHeader>
            <DrawerBody>
              <RadioGroup
                label="File format"
                name="format"
                value={format}
                onValueChange={setFormat}
                options={[
                  {
                    value: 'csv',
                    label: 'CSV',
                    description: 'For spreadsheets and reporting tools.',
                  },
                  { value: 'json', label: 'JSON', description: 'For scripts and structured data.' },
                ]}
              />
              <p>The file contains sample project IDs, names, and statuses.</p>
            </DrawerBody>
            <DrawerFooter>
              <DrawerClose>Cancel</DrawerClose>
              <Button type="submit">Download {format.toUpperCase()}</Button>
            </DrawerFooter>
          </form>
        </DrawerContent>
      </Drawer>
      <p role="status">{notice}</p>
    </div>
  );
}
export function PanelComponentDemo({ name }: { name: string }) {
  return name === 'sheet' ? <ProjectSheet /> : <ExportDrawer />;
}
export function PanelExample() {
  return (
    <div className="floating-examples">
      <ProjectSheet />
      <ExportDrawer />
    </div>
  );
}
