'use client';
import { useState } from 'react';
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuCheckboxItem,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubTrigger,
  DropdownMenuShortcut,
  ContextMenu,
  ContextMenuTrigger,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuCheckboxItem,
  ContextMenuRadioGroup,
  ContextMenuRadioItem,
  ContextMenuLabel,
  ContextMenuSeparator,
  ContextMenuSub,
  ContextMenuSubTrigger,
  Badge,
} from '@antiflex/ui';
import { IconChevronDown, IconCopy, IconDownload, IconArchive } from '@tabler/icons-react';
function download(name: string, body: string) {
  const url = URL.createObjectURL(new Blob([body], { type: 'application/json' }));
  const link = document.createElement('a');
  link.href = url;
  link.download = name;
  link.click();
  URL.revokeObjectURL(url);
}
export function MenuExample({ contextOnly = false }: { contextOnly?: boolean }) {
  const [pinned, setPinned] = useState(false),
    [view, setView] = useState('comfortable'),
    [archived, setArchived] = useState(false),
    [copies, setCopies] = useState(0),
    [notice, setNotice] = useState('Changes affect this local demonstration only.');
  const duplicate = () => {
    setCopies((n) => n + 1);
    setNotice('A local copy was added to the project list.');
  };
  const archive = () => {
    setArchived(!archived);
    setNotice(archived ? 'Sample project restored.' : 'Sample project archived.');
  };
  const exportProject = () => {
    download(
      'antiflex-sample-project.json',
      JSON.stringify({ name: 'Atlas workspace', pinned, archived }, null, 2),
    );
    setNotice('Sample project exported as JSON.');
  };
  return (
    <div className="menu-example">
      <div className="menu-example__heading">
        <div>
          <strong>Atlas workspace</strong>
          <p>Synthetic project · Design operations</p>
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger size="sm">
            Project actions <IconChevronDown />
          </DropdownMenuTrigger>
          <DropdownMenuContent aria-label="Project actions">
            <DropdownMenuLabel>Atlas workspace</DropdownMenuLabel>
            <DropdownMenuItem onSelect={duplicate}>
              <IconCopy />
              Duplicate project
            </DropdownMenuItem>
            <DropdownMenuCheckboxItem checked={pinned} onCheckedChange={setPinned}>
              Pin project
            </DropdownMenuCheckboxItem>
            <DropdownMenuSub>
              <DropdownMenuSubTrigger>Export</DropdownMenuSubTrigger>
              <DropdownMenuContent aria-label="Export format">
                <DropdownMenuItem onSelect={exportProject}>
                  <IconDownload />
                  Download JSON
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenuSub>
            <DropdownMenuSeparator />
            <DropdownMenuRadioGroup aria-label="List density" value={view} onValueChange={setView}>
              <DropdownMenuRadioItem value="comfortable">Comfortable</DropdownMenuRadioItem>
              <DropdownMenuRadioItem value="compact">Compact</DropdownMenuRadioItem>
            </DropdownMenuRadioGroup>
            <DropdownMenuSeparator />
            <DropdownMenuItem onSelect={archive}>
              <IconArchive />
              {archived ? 'Restore project' : 'Archive project'}
            </DropdownMenuItem>
            <DropdownMenuItem disabled>
              Delete project<DropdownMenuShortcut>Restricted</DropdownMenuShortcut>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <ContextMenu>
        <ContextMenuTrigger
          role="region"
          aria-label="Atlas project context actions"
          className="menu-example__target"
          style={{ padding: view === 'compact' ? 12 : 24 }}
        >
          <span>
            <strong>Atlas workspace</strong>
            <span>
              {pinned ? 'Pinned · ' : ''}
              {archived ? 'Archived project' : 'Active project'}
            </span>
          </span>
          <Badge variant={archived ? 'neutral' : 'success'}>
            {archived ? 'Archived' : 'Active'}
          </Badge>
        </ContextMenuTrigger>
        <ContextMenuContent aria-label="Atlas context menu">
          <ContextMenuLabel>Atlas workspace</ContextMenuLabel>
          <ContextMenuItem onSelect={duplicate}>
            <IconCopy />
            Duplicate project
          </ContextMenuItem>
          <ContextMenuCheckboxItem checked={pinned} onCheckedChange={setPinned}>
            Pin project
          </ContextMenuCheckboxItem>
          <ContextMenuSub>
            <ContextMenuSubTrigger>Export</ContextMenuSubTrigger>
            <ContextMenuContent aria-label="Context export format">
              <ContextMenuItem onSelect={exportProject}>
                <IconDownload />
                Download JSON
              </ContextMenuItem>
            </ContextMenuContent>
          </ContextMenuSub>
          <ContextMenuSeparator />
          <ContextMenuRadioGroup
            aria-label="Context list density"
            value={view}
            onValueChange={setView}
          >
            <ContextMenuRadioItem value="comfortable">Comfortable</ContextMenuRadioItem>
            <ContextMenuRadioItem value="compact">Compact</ContextMenuRadioItem>
          </ContextMenuRadioGroup>
          <ContextMenuSeparator />
          <ContextMenuItem onSelect={archive}>
            {archived ? 'Restore project' : 'Archive project'}
          </ContextMenuItem>
          <ContextMenuItem disabled>Delete project</ContextMenuItem>
        </ContextMenuContent>
      </ContextMenu>
      <p className="menu-example__hint">
        {contextOnly
          ? 'Right-click the project, or focus it and press Shift + F10.'
          : 'Use Project actions, right-click the project, or focus it and press Shift + F10.'}{' '}
        The visible actions button also works on touch screens.
      </p>
      {copies > 0 && (
        <ul aria-label="Local project copies">
          {Array.from({ length: copies }, (_, i) => (
            <li key={i}>Atlas workspace — copy {i + 1}</li>
          ))}
        </ul>
      )}
      <p role="status" className="specimen-feedback">
        {notice}
      </p>
    </div>
  );
}
export function MenuComponentDemo({ name }: { name: string }) {
  return <MenuExample contextOnly={name === 'context-menu'} />;
}
