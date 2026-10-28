'use client';
import { useId, useState, useEffect } from 'react';
import {
  Avatar,
  Badge,
  Button,
  Field,
  HoverCard,
  HoverCardTrigger,
  HoverCardToggle,
  HoverCardContent,
  HoverCardTitle,
  Menubar,
  MenubarMenu,
  MenubarTrigger,
  MenubarContent,
  MenubarItem,
  MenubarCheckboxItem,
  MenubarSeparator,
  MenubarSub,
  MenubarSubTrigger,
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
  NavigationMenuTrigger,
  NavigationMenuContent,
  NavigationMenuLink,
  Select,
  Combobox,
  Command,
  CommandDialog,
  Calendar,
  DatePicker,
} from '@antiflex/ui';
export const memberOptions = [
  {
    value: 'alex',
    label: 'Alex Morgan',
    description: 'Product designer',
    group: 'Design',
    keywords: ['design', 'owner'],
  },
  {
    value: 'sam',
    label: 'Sam Rivera',
    description: 'Frontend engineer',
    group: 'Engineering',
    keywords: ['react', 'code'],
  },
  {
    value: 'jordan',
    label: 'Jordan Lee',
    description: 'Unavailable in this example',
    group: 'Engineering',
    disabled: true,
  },
];
export const priorityOptions = [
  { value: 'low', label: 'Low priority' },
  { value: 'normal', label: 'Normal priority' },
  { value: 'high', label: 'High priority' },
  { value: 'restricted', label: 'Restricted priority', disabled: true },
];
function download() {
  const url = URL.createObjectURL(
    new Blob([JSON.stringify({ project: 'Atlas workspace', synthetic: true }, null, 2)], {
      type: 'application/json',
    }),
  );
  const a = document.createElement('a');
  a.href = url;
  a.download = 'antiflex-workspace-sample.json';
  a.click();
  URL.revokeObjectURL(url);
}
export function HoverCardExample() {
  const id = useId();
  return (
    <div className="workspace-tool">
      <div className="demo-row">
        <Avatar alt="Alex Morgan" />
        <HoverCard>
          <HoverCardTrigger href={`#${id}-profile`}>Alex Morgan</HoverCardTrigger>
          <HoverCardToggle size="sm" aria-label="Preview Alex Morgan">
            Preview member
          </HoverCardToggle>
          <HoverCardContent>
            <HoverCardTitle>Alex Morgan</HoverCardTitle>
            <p>Product designer · Sample member</p>
            <p>
              Designs the Atlas workspace. This is supplementary, synthetic profile information.
            </p>
            <Badge variant="success">Available for review</Badge>
          </HoverCardContent>
        </HoverCard>
      </div>
      <p id={`${id}-profile`}>
        Sample member · Product designer. The profile link and visible preview button also work
        without hover.
      </p>
    </div>
  );
}
export function MenubarExample() {
  const [count, setCount] = useState(1),
    [guides, setGuides] = useState(false);
  return (
    <div className="workspace-tool">
      <Menubar aria-label="Workspace commands">
        <MenubarMenu value="file">
          <MenubarTrigger>File</MenubarTrigger>
          <MenubarContent>
            <MenubarItem onSelect={() => setCount((n) => n + 1)}>New local project</MenubarItem>
            <MenubarSub>
              <MenubarSubTrigger>Export</MenubarSubTrigger>
              <MenubarContent aria-label="Export format">
                <MenubarItem onSelect={download}>Download sample JSON</MenubarItem>
              </MenubarContent>
            </MenubarSub>
            <MenubarSeparator />
            <MenubarItem disabled>Publish to production</MenubarItem>
          </MenubarContent>
        </MenubarMenu>
        <MenubarMenu value="edit">
          <MenubarTrigger>Edit</MenubarTrigger>
          <MenubarContent>
            <MenubarItem onSelect={() => setCount(1)}>Reset local projects</MenubarItem>
          </MenubarContent>
        </MenubarMenu>
        <MenubarMenu value="view">
          <MenubarTrigger>View</MenubarTrigger>
          <MenubarContent>
            <MenubarCheckboxItem checked={guides} onCheckedChange={setGuides}>
              Show layout guides
            </MenubarCheckboxItem>
          </MenubarContent>
        </MenubarMenu>
      </Menubar>
      <p role="status">
        {count} local {count === 1 ? 'project' : 'projects'} · Layout guides{' '}
        {guides ? 'shown' : 'hidden'}. Synthetic workspace.
      </p>
    </div>
  );
}
export function NavigationExample() {
  return (
    <NavigationMenu aria-label="antiflex resources">
      <NavigationMenuList>
        <NavigationMenuItem value="learn">
          <NavigationMenuTrigger>Learn</NavigationMenuTrigger>
          <NavigationMenuContent>
            <NavigationMenuLink href="/docs">
              Introduction<small>Understand the shared foundation.</small>
            </NavigationMenuLink>
            <NavigationMenuLink href="/docs/foundations">
              Foundations<small>Inspect colors, typography and tokens.</small>
            </NavigationMenuLink>
          </NavigationMenuContent>
        </NavigationMenuItem>
        <NavigationMenuItem value="build">
          <NavigationMenuTrigger>Build</NavigationMenuTrigger>
          <NavigationMenuContent>
            <NavigationMenuLink href="/docs/components">
              Components<small>Explore the original React catalog.</small>
            </NavigationMenuLink>
            <NavigationMenuLink href="/docs/installation">
              Installation<small>Copy source into your project.</small>
            </NavigationMenuLink>
          </NavigationMenuContent>
        </NavigationMenuItem>
        <li>
          <NavigationMenuLink href="/dashboard">Dashboard</NavigationMenuLink>
        </li>
      </NavigationMenuList>
    </NavigationMenu>
  );
}
export function SelectionExample({ mode = 'select' }: { mode?: 'select' | 'combobox' }) {
  const [value, setValue] = useState('');
  return (
    <form
      className="workspace-tool"
      onSubmit={(e) => {
        e.preventDefault();
        const data = new FormData(e.currentTarget);
        setValue(`Submitted ${data.get('selection')}`);
      }}
    >
      <Field label={mode === 'select' ? 'Project priority' : 'Assign reviewer'}>
        {mode === 'select' ? (
          <Select options={priorityOptions} name="selection" defaultValue="normal" required />
        ) : (
          <Combobox
            options={memberOptions}
            name="selection"
            placeholder="Search sample members…"
            required
          />
        )}
      </Field>
      <div className="demo-row">
        <Button type="submit">Save selection</Button>
        <Button type="reset" variant="secondary" onClick={() => setValue('Selection reset.')}>
          Reset selection
        </Button>
      </div>
      <p role="status">{value || 'Choose a value, then submit the local form.'}</p>
    </form>
  );
}
export function CalendarExample() {
  const [day, setDay] = useState('2026-10-23');
  return (
    <div className="workspace-tool">
      <Calendar
        value={day}
        onValueChange={setDay}
        today="2026-10-23"
        min="2026-10-01"
        max="2027-12-31"
      />
      <p role="status">Review date: {day}. Local date-only value.</p>
    </div>
  );
}
export function DatePickerExample() {
  const [result, setResult] = useState('');
  return (
    <form
      className="workspace-tool"
      onSubmit={(e) => {
        e.preventDefault();
        setResult(`Due date: ${new FormData(e.currentTarget).get('due')}`);
      }}
    >
      <Field label="Review due date">
        <DatePicker
          label="Review due date"
          name="due"
          today="2026-10-23"
          min="2026-10-01"
          max="2027-12-31"
          required
        />
      </Field>
      <div className="demo-row">
        <Button type="submit">Save due date</Button>
        <Button type="reset" variant="secondary" onClick={() => setResult('Due date reset.')}>
          Reset date
        </Button>
      </div>
      <p role="status">{result || 'Pick a date and submit the sample form.'}</p>
    </form>
  );
}
export function CommandExample({ inline = false }: { inline?: boolean }) {
  const [open, setOpen] = useState(false),
    [result, setResult] = useState('No command run yet.');
  const items = [
    {
      value: 'new',
      label: 'Create sample project',
      group: 'Projects',
      keywords: ['new', 'add'],
      onSelect: () => setResult('A sample project was created.'),
    },
    { value: 'export', label: 'Download sample JSON', group: 'Projects', onSelect: download },
    {
      value: 'reset',
      label: 'Reset local result',
      group: 'Workspace',
      onSelect: () => setResult('Local result reset.'),
    },
    {
      value: 'publish',
      label: 'Publish production data',
      group: 'Workspace',
      disabled: true,
      onSelect: () => {},
    },
  ];
  return (
    <div className="workspace-tool">
      {inline ? (
        <Command items={items} label="Search workspace commands" />
      ) : (
        <>
          <Button variant="secondary" onClick={() => setOpen(true)}>
            Open workspace commands
          </Button>
          <CommandDialog
            open={open}
            onOpenChange={setOpen}
            items={items}
            label="Search workspace commands"
            title="Workspace commands"
          />
        </>
      )}
      <p role="status">{result} No global shortcut is installed.</p>
    </div>
  );
}
export function WorkspaceComponentDemo({ name }: { name: string }) {
  switch (name) {
    case 'hover-card':
      return <HoverCardExample />;
    case 'menubar':
      return <MenubarExample />;
    case 'navigation-menu':
      return <NavigationExample />;
    case 'select':
      return <SelectionExample />;
    case 'combobox':
      return <SelectionExample mode="combobox" />;
    case 'command':
      return <CommandExample />;
    case 'calendar':
      return <CalendarExample />;
    case 'date-picker':
      return <DatePickerExample />;
    default:
      return null;
  }
}
export function WorkspaceTools() {
  const [ready, setReady] = useState(false);
  useEffect(() => setReady(true), []);
  return (
    <div className="workspace-examples" data-workspace-ready={ready}>
      <section>
        <h3>Browse the foundation</h3>
        <NavigationExample />
      </section>
      <section>
        <h3>Run workspace actions</h3>
        <MenubarExample />
      </section>
      <section>
        <h3>Know the reviewer</h3>
        <HoverCardExample />
      </section>
      <div className="workspace-examples__columns">
        <section>
          <h3>Set a priority</h3>
          <SelectionExample />
        </section>
        <section>
          <h3>Find a reviewer</h3>
          <SelectionExample mode="combobox" />
        </section>
      </div>
      <div className="workspace-examples__columns">
        <section>
          <h3>Review the calendar</h3>
          <CalendarExample />
        </section>
        <section>
          <h3>Choose a due date</h3>
          <DatePickerExample />
        </section>
      </div>
      <section>
        <h3>Find an action</h3>
        <CommandExample />
      </section>
    </div>
  );
}
