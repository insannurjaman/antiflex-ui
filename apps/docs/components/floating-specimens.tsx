'use client';
import { useState } from 'react';
import {
  Badge,
  Button,
  Field,
  NativeSelect,
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverTitle,
  PopoverDescription,
  PopoverClose,
  Tooltip,
  TooltipTrigger,
  TooltipContent,
} from '@antiflex/ui';
export function FilterPopover() {
  const [open, setOpen] = useState(false),
    [status, setStatus] = useState('All projects'),
    [draft, setDraft] = useState(status);
  return (
    <div className="floating-specimen">
      <div className="floating-summary">
        <strong>Project view</strong>
        <Badge>{status}</Badge>
      </div>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger onClick={() => setDraft(status)}>Filter projects</PopoverTrigger>
        <PopoverContent>
          <PopoverTitle>Project filters</PopoverTitle>
          <PopoverDescription>Choose which sample projects to show.</PopoverDescription>
          <form
            className="floating-form"
            onSubmit={(event) => {
              event.preventDefault();
              setStatus(draft);
              setOpen(false);
            }}
          >
            <Field label="Project status">
              <NativeSelect value={draft} onChange={(event) => setDraft(event.target.value)}>
                <option>All projects</option>
                <option>Active projects</option>
                <option>Archived projects</option>
              </NativeSelect>
            </Field>
            <div className="floating-actions">
              <PopoverClose>Cancel</PopoverClose>
              <Button type="submit">Apply filters</Button>
            </div>
          </form>
        </PopoverContent>
      </Popover>
      <p role="status">Showing: {status.toLowerCase()}. Local sample data.</p>
    </div>
  );
}
export function TooltipDemo() {
  const [copied, setCopied] = useState(false);
  return (
    <div className="floating-specimen">
      <Tooltip>
        <TooltipTrigger onClick={() => setCopied(true)}>Show sample ID</TooltipTrigger>
        <TooltipContent>Reveals the example project identifier.</TooltipContent>
      </Tooltip>
      <p role="status">
        {copied
          ? 'Sample project ID: proj_orbit_demo.'
          : 'Hover or focus the button to see supplemental help.'}
      </p>
    </div>
  );
}
export function FloatingComponentDemo({ name }: { name: string }) {
  return name === 'popover' ? <FilterPopover /> : <TooltipDemo />;
}
export function FloatingExample() {
  return (
    <div className="floating-examples">
      <section>
        <h3>Adjust a view</h3>
        <p>Change a setting without leaving the surrounding page.</p>
        <FilterPopover />
      </section>
      <section>
        <h3>Explain an action</h3>
        <p>The button has a complete label; the tooltip adds context.</p>
        <TooltipDemo />
      </section>
    </div>
  );
}
