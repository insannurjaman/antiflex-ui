import { StrictMode, useState } from 'react';
import {
  Button,
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogTitle,
  DialogClose,
  DropdownMenu as D,
  DropdownMenuTrigger as DT,
  DropdownMenuContent as DC,
  DropdownMenuItem as DI,
  DropdownMenuCheckboxItem as DCheck,
  DropdownMenuRadioGroup as DRG,
  DropdownMenuRadioItem as DRadio,
  DropdownMenuSub as DS,
  DropdownMenuSubTrigger as DST,
  DropdownMenuSeparator as DSeparator,
  DropdownMenuLink as DL,
  DropdownMenuLabel as DLabel,
  DropdownMenuShortcut as DShortcut,
  ContextMenu as C,
  ContextMenuTrigger as CT,
  ContextMenuContent as CC,
  ContextMenuItem as CI,
  ContextMenuCheckboxItem as CCheck,
  ContextMenuRadioGroup as CRG,
  ContextMenuRadioItem as CRadio,
  ContextMenuSub as CS,
  ContextMenuSubTrigger as CST,
} from '@antiflex/ui';
export interface FixtureProps {
  mode?: string;
  size?: 'sm' | 'md' | 'lg';
  defaultOpen?: boolean;
  rtl?: boolean;
  long?: boolean;
}
export function DropdownFixture({
  mode = '',
  size = 'md',
  defaultOpen = false,
  rtl = false,
  long = false,
}: FixtureProps) {
  const [open, setOpen] = useState(defaultOpen),
    [checked, setChecked] = useState(false),
    [value, setValue] = useState('grid'),
    [status, setStatus] = useState('No action yet.'),
    [mounted, setMounted] = useState(true),
    [detail, setDetail] = useState(false);
  const fixture = (
    <div dir={rtl ? 'rtl' : 'ltr'} style={{ padding: 16, maxWidth: '100%' }}>
      <Button variant="ghost" onClick={() => setMounted(!mounted)}>
        Toggle menu mount
      </Button>
      <button type="button">Before menu</button>
      {mounted && (
        <D
          open={mode === 'refuse' ? open : undefined}
          defaultOpen={defaultOpen}
          onOpenChange={(next) => {
            if (mode === 'refuse') {
              if (next) setOpen(true);
              setStatus(next ? 'Opened' : 'Close refused');
            }
          }}
        >
          <DT disabled={mode === 'disabled'}>Project actions</DT>
          <DC aria-label="Project actions" size={size}>
            {mode !== 'empty' && (
              <>
                <DLabel>Sample workspace</DLabel>
                <div>
                  <DI onSelect={() => setStatus('Duplicate selected')}>
                    Duplicate project<DShortcut>Alt+D</DShortcut>
                  </DI>
                </div>
                <DI disabled onSelect={() => setStatus('ERROR disabled activated')}>
                  Delete project
                </DI>
                <DI
                  onSelect={(event) => {
                    event.preventDefault();
                    setStatus('Kept open');
                  }}
                >
                  Keep open
                </DI>
                <DCheck checked={checked} onCheckedChange={setChecked}>
                  Pin project
                </DCheck>
                <DRG aria-label="Layout" value={value} onValueChange={setValue}>
                  <DRadio value="grid">Grid</DRadio>
                  <DRadio value="list">List</DRadio>
                </DRG>
                <DS>
                  <DST>Export</DST>
                  <DC aria-label="Export format">
                    <DI onSelect={() => setStatus('JSON selected')}>JSON</DI>
                    <DS>
                      <DST>More formats</DST>
                      <DC aria-label="More formats">
                        <DI onSelect={() => setStatus('CSV selected')}>CSV</DI>
                      </DC>
                    </DS>
                  </DC>
                </DS>
                <DSeparator />
                <DL href="#destination">Go to destination</DL>
                <DI onSelect={() => setDetail(true)}>Open details…</DI>
                {long &&
                  Array.from({ length: 28 }, (_, i) => (
                    <DI key={i}>Long project action {i + 1} with a descriptive label</DI>
                  ))}
              </>
            )}
          </DC>
        </D>
      )}
      <button type="button" id="destination">
        After menu
      </button>
      <p role="status">
        {status} · {checked ? 'Pinned' : 'Unpinned'} · {value}
      </p>
      <Dialog open={detail} onOpenChange={setDetail}>
        <DialogContent>
          <DialogTitle>Project details</DialogTitle>
          <DialogClose>Close details</DialogClose>
        </DialogContent>
      </Dialog>
    </div>
  );
  if (mode === 'modal')
    return (
      <Dialog>
        <DialogTrigger>Open menu dialog</DialogTrigger>
        <DialogContent>
          <DialogTitle>Workspace settings</DialogTitle>
          {fixture}
          <DialogClose>Close workspace</DialogClose>
        </DialogContent>
      </Dialog>
    );
  return mode === 'strict' ? <StrictMode>{fixture}</StrictMode> : fixture;
}
export function ContextFixture({
  mode = '',
  defaultOpen = false,
  rtl = false,
  long = false,
}: FixtureProps) {
  const [open, setOpen] = useState(defaultOpen),
    [status, setStatus] = useState('No action yet.'),
    [checked, setChecked] = useState(false),
    [value, setValue] = useState('grid');
  const fixture = (
    <div dir={rtl ? 'rtl' : 'ltr'} style={{ padding: 16, maxWidth: '100%' }}>
      <button type="button">Before context</button>
      <C
        defaultOpen={defaultOpen}
        open={mode === 'refuse' ? open : undefined}
        onOpenChange={(next) => {
          if (mode === 'refuse') {
            if (next) setOpen(true);
            setStatus(next ? 'Opened' : 'Close refused');
          }
        }}
      >
        <CT
          role="region"
          aria-label="Project context"
          style={{ border: '1px solid var(--af-semantic-border)', padding: 32, marginBlock: 16 }}
        >
          Atlas workspace — right-click or Shift + F10
        </CT>
        <CC aria-label="Context actions">
          <CI onSelect={() => setStatus('Duplicate selected')}>Duplicate project</CI>
          <CI disabled onSelect={() => setStatus('ERROR disabled activated')}>
            Delete project
          </CI>
          <CCheck checked={checked} onCheckedChange={setChecked}>
            Pin project
          </CCheck>
          <CRG aria-label="Context layout" value={value} onValueChange={setValue}>
            <CRadio value="grid">Grid</CRadio>
            <CRadio value="list">List</CRadio>
          </CRG>
          <CS>
            <CST>Export</CST>
            <CC aria-label="Context export">
              <CI onSelect={() => setStatus('JSON selected')}>JSON</CI>
            </CC>
          </CS>
          {long &&
            Array.from({ length: 30 }, (_, i) => <CI key={i}>Long context action {i + 1}</CI>)}
        </CC>
      </C>
      <button type="button">After context</button>
      <p role="status">
        {status} · {checked ? 'Pinned' : 'Unpinned'} · {value}
      </p>
    </div>
  );
  return mode === 'modal' ? (
    <Dialog>
      <DialogTrigger>Open context dialog</DialogTrigger>
      <DialogContent>
        <DialogTitle>Workspace context</DialogTitle>
        {fixture}
        <DialogClose>Close workspace</DialogClose>
      </DialogContent>
    </Dialog>
  ) : (
    fixture
  );
}
