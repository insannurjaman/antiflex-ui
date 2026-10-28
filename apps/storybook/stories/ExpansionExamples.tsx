import { StrictMode, useState, type ReactNode } from 'react';
import {
  Button,
  Field,
  HoverCard,
  HoverCardTrigger,
  HoverCardContent,
  HoverCardTitle,
  HoverCardToggle,
  Menubar,
  MenubarMenu,
  MenubarTrigger,
  MenubarContent,
  MenubarItem,
  MenubarCheckboxItem,
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
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogTitle,
  DialogClose,
  type SelectOption,
} from '@antiflex/ui';
export type FixtureProps = { variant?: string };
const members: SelectOption[] = [
  {
    value: 'alex',
    label: 'Alex Morgan',
    description: 'Product designer',
    group: 'Design',
    keywords: ['designer', 'design'],
  },
  {
    value: 'sam',
    label: 'Sam Rivera',
    description: 'Frontend engineer',
    group: 'Engineering',
    keywords: ['react'],
  },
  { value: 'jordan', label: 'Jordan Lee', disabled: true, group: 'Engineering' },
];
function Wrap({ children, rtl = false }: { children: ReactNode; rtl?: boolean }) {
  return (
    <div dir={rtl ? 'rtl' : 'ltr'} style={{ display: 'grid', gap: 16, maxWidth: 640, padding: 8 }}>
      {children}
    </div>
  );
}
function Mount({ children }: { children: ReactNode }) {
  const [mounted, setMounted] = useState(true);
  return (
    <>
      <Button onClick={() => setMounted((v) => !v)}>Toggle specimen mount</Button>
      {mounted && children}
    </>
  );
}
function Modal({ children }: { children: ReactNode }) {
  return (
    <Dialog>
      <DialogTrigger>Open example task</DialogTrigger>
      <DialogContent>
        <DialogTitle>Workspace example task</DialogTitle>
        {children}
        <DialogClose>Close example task</DialogClose>
      </DialogContent>
    </Dialog>
  );
}
export function HoverFixture({ variant = 'default' }: FixtureProps) {
  const [open, setOpen] = useState(false),
    [notice, setNotice] = useState('');
  const body = (
    <Wrap rtl={variant === 'rtl'}>
      <HoverCard
        defaultOpen={['open', 'long', 'touch'].includes(variant)}
        open={variant === 'controlled' ? open : undefined}
        onOpenChange={(next) => {
          if (variant === 'controlled') {
            setNotice(next ? 'Open requested' : 'Close refused');
            if (next) setOpen(true);
          }
        }}
      >
        <HoverCardTrigger href="#sample-member">Alex Morgan</HoverCardTrigger>
        <HoverCardToggle aria-label="Preview Alex Morgan">Preview member</HoverCardToggle>
        <HoverCardContent>
          <HoverCardTitle>Alex Morgan</HoverCardTitle>
          <p>Product designer · Sample member</p>
          {variant === 'long' ? (
            Array.from({ length: 12 }, (_, i) => (
              <p key={i}>
                Supplementary profile note {i + 1}: long content stays scrollable within the
                viewport.
              </p>
            ))
          ) : (
            <p>Coordinates the local Atlas design review.</p>
          )}
        </HoverCardContent>
      </HoverCard>
      <p id="sample-member">Visible sample profile. Preview adds supplementary context.</p>
      {variant === 'controlled' && <Button onClick={() => setOpen(false)}>Close from owner</Button>}
      <p role="status">{notice}</p>
      <Button>After preview</Button>
    </Wrap>
  );
  return variant === 'strict' ? (
    <StrictMode>
      <Mount>{body}</Mount>
    </StrictMode>
  ) : variant === 'modal' ? (
    <Modal>{body}</Modal>
  ) : (
    body
  );
}
export function MenubarFixture({ variant = 'default' }: FixtureProps) {
  const [value, setValue] = useState(''),
    [result, setResult] = useState('No action yet.'),
    [checked, setChecked] = useState(false);
  const body = (
    <Wrap rtl={variant === 'rtl'}>
      <Button>Before menubar</Button>
      <Menubar
        aria-label="Workspace commands"
        defaultValue={['open', 'submenu'].includes(variant) ? 'file' : ''}
        value={variant === 'controlled' ? value : undefined}
        onValueChange={(v) => {
          if (variant === 'controlled') {
            if (v) setValue(v);
            else setResult('Close refused');
          }
        }}
      >
        <MenubarMenu value="file">
          <MenubarTrigger>File</MenubarTrigger>
          <MenubarContent>
            <MenubarItem onSelect={() => setResult('New local project created')}>
              New local project
            </MenubarItem>
            <MenubarSub>
              <MenubarSubTrigger>Export</MenubarSubTrigger>
              <MenubarContent aria-label="Export format">
                <MenubarItem onSelect={() => setResult('JSON selected')}>JSON</MenubarItem>
                <MenubarItem onSelect={() => setResult('CSV selected')}>CSV</MenubarItem>
              </MenubarContent>
            </MenubarSub>
            <MenubarItem disabled>Publish</MenubarItem>
          </MenubarContent>
        </MenubarMenu>
        <MenubarMenu value="edit">
          <MenubarTrigger disabled={variant === 'disabled'}>Edit</MenubarTrigger>
          <MenubarContent>
            <MenubarItem onSelect={() => setResult('Undo selected')}>Undo</MenubarItem>
          </MenubarContent>
        </MenubarMenu>
        <MenubarMenu value="view">
          <MenubarTrigger>View</MenubarTrigger>
          <MenubarContent>
            <MenubarCheckboxItem checked={checked} onCheckedChange={setChecked}>
              Show guides
            </MenubarCheckboxItem>
          </MenubarContent>
        </MenubarMenu>
      </Menubar>
      <Button>After menubar</Button>
      {variant === 'controlled' && <Button onClick={() => setValue('')}>Close from owner</Button>}
      <p role="status">{result}</p>
    </Wrap>
  );
  return variant === 'strict' ? (
    <StrictMode>
      <Mount>{body}</Mount>
    </StrictMode>
  ) : variant === 'modal' ? (
    <Modal>{body}</Modal>
  ) : (
    body
  );
}
export function NavigationFixture({ variant = 'default' }: FixtureProps) {
  const [value, setValue] = useState(''),
    [result, setResult] = useState('');
  const body = (
    <Wrap rtl={variant === 'rtl'}>
      <Button>Before navigation</Button>
      <NavigationMenu
        aria-label="Workspace resources"
        defaultValue={['open', 'long', 'current'].includes(variant) ? 'learn' : ''}
        value={variant === 'controlled' ? value : undefined}
        onValueChange={(v) => {
          if (variant === 'controlled') {
            if (v) setValue(v);
            else setResult('Close refused');
          }
        }}
      >
        <NavigationMenuList>
          <NavigationMenuItem value="learn">
            <NavigationMenuTrigger>Learn</NavigationMenuTrigger>
            <NavigationMenuContent>
              <NavigationMenuLink
                href="#nav-destination"
                aria-current={variant === 'current' ? 'page' : undefined}
              >
                Introduction<small>Understand the shared foundation.</small>
              </NavigationMenuLink>
              <NavigationMenuLink href="#nav-destination">Foundations</NavigationMenuLink>
              {variant === 'long' &&
                Array.from({ length: 20 }, (_, i) => (
                  <NavigationMenuLink href="#nav-destination" key={i}>
                    Long navigation resource {i + 1}
                  </NavigationMenuLink>
                ))}
            </NavigationMenuContent>
          </NavigationMenuItem>
          <NavigationMenuItem value="build">
            <NavigationMenuTrigger>Build</NavigationMenuTrigger>
            <NavigationMenuContent>
              <NavigationMenuLink href="#nav-destination">Components</NavigationMenuLink>
              <NavigationMenuLink href="#nav-destination">Installation</NavigationMenuLink>
            </NavigationMenuContent>
          </NavigationMenuItem>
          <li>
            <NavigationMenuLink href="#nav-destination">Overview</NavigationMenuLink>
          </li>
        </NavigationMenuList>
      </NavigationMenu>
      <h3 id="nav-destination" tabIndex={-1}>
        Navigation destination
      </h3>
      <Button>After navigation</Button>
      {variant === 'controlled' && <Button onClick={() => setValue('')}>Close from owner</Button>}
      <p role="status">{result}</p>
    </Wrap>
  );
  return variant === 'strict' ? (
    <StrictMode>
      <Mount>{body}</Mount>
    </StrictMode>
  ) : variant === 'modal' ? (
    <Modal>{body}</Modal>
  ) : (
    body
  );
}
export function ChoiceFixture({
  variant = 'default',
  editable = false,
}: {
  variant?: string;
  editable?: boolean;
}) {
  const [value, setValue] = useState('alex'),
    [refuse, setRefuse] = useState(true),
    [result, setResult] = useState('');
  const Comp = editable ? Combobox : Select;
  const options =
    variant === 'empty'
      ? []
      : variant === 'long'
        ? Array.from({ length: 80 }, (_, i) => ({
            value: `member-${i + 1}`,
            label: `Sample member ${i + 1} with a long readable label`,
            description: 'Synthetic long content',
          }))
        : members;
  return (
    <Wrap rtl={variant === 'rtl'}>
      <form
        aria-label="Choice example"
        onSubmit={(e) => {
          e.preventDefault();
          setResult(`Submitted ${new FormData(e.currentTarget).get('member')}`);
        }}
        style={{ display: 'grid', gap: 16 }}
      >
        <Field label="Sample member">
          <Comp
            options={options}
            defaultValue={variant === 'default' ? 'alex' : undefined}
            value={variant === 'controlled' ? value : undefined}
            onValueChange={(v) => {
              if (variant === 'controlled') {
                setResult(`Requested ${v}`);
                if (!refuse) setValue(v);
              }
            }}
            defaultOpen={['open', 'empty', 'loading', 'long'].includes(variant)}
            disabled={variant === 'disabled'}
            loading={variant === 'loading'}
            name="member"
            required
            placeholder="Choose a sample member"
          />
        </Field>
        {variant === 'sizes' &&
          (['sm', 'lg'] as const).map((size) => (
            <Field label={`Member ${size}`} key={size}>
              <Comp options={members} size={size} />
            </Field>
          ))}
        {variant === 'controlled' && (
          <label>
            <input type="checkbox" checked={refuse} onChange={(e) => setRefuse(e.target.checked)} />
            Refuse value changes
          </label>
        )}
        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
          <Button type="submit">Submit choice</Button>
          <Button type="reset" variant="secondary">
            Reset choice
          </Button>
          <Button variant="ghost">After choice</Button>
        </div>
        <p role="status">{result || 'No form submitted.'}</p>
      </form>
    </Wrap>
  );
}
export function CommandFixture({ variant = 'default' }: FixtureProps) {
  const [open, setOpen] = useState(false),
    [result, setResult] = useState('No command yet.');
  const items =
    variant === 'empty'
      ? []
      : variant === 'long'
        ? Array.from({ length: 40 }, (_, i) => ({
            value: `action-${i + 1}`,
            label: `Sample action ${i + 1}`,
            description: 'Synthetic command',
            onSelect: () => setResult(`Action ${i + 1}`),
          }))
        : [
            {
              value: 'new',
              label: 'Create project',
              group: 'Projects',
              keywords: ['add'],
              onSelect: () => setResult('Project created'),
            },
            {
              value: 'keep',
              label: 'Keep command open',
              group: 'Workspace',
              onSelect: () => {
                setResult('Command retained');
                return false as const;
              },
            },
            {
              value: 'delete',
              label: 'Delete production data',
              group: 'Workspace',
              disabled: true,
              onSelect: () => setResult('ERROR'),
            },
          ];
  const body = (
    <Wrap rtl={variant === 'rtl'}>
      {variant === 'dialog' ? (
        <>
          <Button onClick={() => setOpen(true)}>Open commands</Button>
          <CommandDialog items={items} label="Search commands" open={open} onOpenChange={setOpen} />
        </>
      ) : (
        <Command items={items} label="Search commands" loading={variant === 'loading'} />
      )}
      {variant === 'long' && (
        <>
          <Button onClick={() => setOpen(true)}>Open long commands</Button>
          <CommandDialog
            items={items}
            label="Search long commands"
            open={open}
            onOpenChange={setOpen}
          />
        </>
      )}
      <p role="status">{result}</p>
    </Wrap>
  );
  return variant === 'strict' ? (
    <StrictMode>
      <Mount>{body}</Mount>
    </StrictMode>
  ) : (
    body
  );
}
export function CalendarFixture({ variant = 'default' }: FixtureProps) {
  const [value, setValue] = useState('2026-10-23'),
    [month, setMonth] = useState('2026-10');
  return (
    <Wrap rtl={variant === 'rtl'}>
      <Calendar
        value={variant === 'controlled' ? value : undefined}
        defaultValue={variant === 'leap' ? '2024-02-29' : '2026-10-23'}
        month={variant === 'controlled' ? month : undefined}
        onMonthChange={variant === 'controlled' ? setMonth : undefined}
        onValueChange={setValue}
        defaultMonth={variant === 'leap' ? '2024-02' : undefined}
        min={variant === 'leap' ? '2024-02-29' : undefined}
        max={variant === 'leap' ? '2024-03-03' : undefined}
        disabled={
          variant === 'fully-disabled'
            ? true
            : variant === 'disabled-dates'
              ? (date) => date.endsWith('-24')
              : false
        }
        today={variant === 'leap' ? '2024-02-29' : '2026-10-23'}
        weekStartsOn={variant === 'monday' ? 1 : 0}
        locale={variant === 'locale' ? 'id-ID' : undefined}
      />
      <p role="status">Selected date: {value}</p>
      <Button>After calendar</Button>
    </Wrap>
  );
}
export function DatePickerFixture({ variant = 'default' }: FixtureProps) {
  const [value, setValue] = useState('2026-10-23'),
    [result, setResult] = useState('');
  const body = (
    <Wrap rtl={variant === 'rtl'}>
      <form
        aria-label="Date example"
        style={{ display: 'grid', gap: 16 }}
        onSubmit={(e) => {
          e.preventDefault();
          setResult(`Submitted ${new FormData(e.currentTarget).get('due')}`);
        }}
      >
        <Field label="Due date">
          <DatePicker
            label="Due date"
            name="due"
            value={variant === 'controlled' ? value : undefined}
            onValueChange={setValue}
            defaultValue={variant === 'bounded' ? '2024-02-28' : undefined}
            defaultOpen={variant === 'open'}
            disabled={variant === 'disabled'}
            required={variant === 'required'}
            min={variant === 'bounded' ? '2024-02-28' : undefined}
            max={variant === 'bounded' ? '2024-03-05' : undefined}
            isDateDisabled={variant === 'bounded' ? (date) => date === '2024-02-29' : undefined}
            today={variant === 'bounded' ? '2024-02-29' : '2026-10-23'}
          />
        </Field>
        <div style={{ display: 'flex', gap: 8 }}>
          <Button type="submit">Submit date</Button>
          <Button type="reset" variant="secondary">
            Reset date
          </Button>
        </div>
        <p role="status">{result || `Selected ${value}`}</p>
      </form>
    </Wrap>
  );
  return variant === 'modal' ? <Modal>{body}</Modal> : body;
}
