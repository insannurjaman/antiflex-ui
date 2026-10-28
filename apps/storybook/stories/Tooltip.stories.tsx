import type { Meta, StoryObj } from '@storybook/react-vite';
import { StrictMode, useState } from 'react';
import {
  Button,
  Tooltip,
  TooltipTrigger,
  TooltipContent,
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverTitle,
  PopoverClose,
} from '@antiflex/ui';
const meta = {
  title: 'Components/Tooltip',
  component: Tooltip,
  parameters: { layout: 'padded' },
} satisfies Meta<typeof Tooltip>;
export default meta;
type Story = StoryObj;
function Basic({
  side = 'top',
  open = false,
  delay = 500,
  long = false,
}: {
  side?: 'top' | 'right' | 'bottom' | 'left';
  open?: boolean;
  delay?: number;
  long?: boolean;
}) {
  return (
    <Tooltip defaultOpen={open} delayDuration={delay}>
      <TooltipTrigger>Show project ID</TooltipTrigger>
      <TooltipContent side={side}>
        {long
          ? 'A long supplemental description wraps within its maximum width and the available viewport. Essential project information always remains visible on the page.'
          : 'Reveals the sample project identifier.'}
      </TooltipContent>
    </Tooltip>
  );
}
export const Default: Story = {
  render: () => (
    <div style={{ padding: 80 }}>
      <Basic />
    </div>
  ),
};
export const Open: Story = {
  render: () => (
    <div style={{ padding: 80 }}>
      <Basic open />
    </div>
  ),
};
export const Placements: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: 80, flexWrap: 'wrap', padding: 80 }}>
      {(['top', 'right', 'bottom', 'left'] as const).map((side) => (
        <Basic key={side} side={side} />
      ))}
    </div>
  ),
};
export const NoDelay: Story = { render: () => <Basic delay={0} /> };
export const LongText: Story = {
  render: () => (
    <div style={{ paddingTop: 100 }}>
      <Basic open long />
    </div>
  ),
};
export const ExistingDescription: Story = {
  render: () => (
    <>
      <p id="existing-help">This action uses local sample data.</p>
      <Tooltip>
        <TooltipTrigger aria-describedby="existing-help">Show project ID</TooltipTrigger>
        <TooltipContent>Reveals the project identifier.</TooltipContent>
      </Tooltip>
    </>
  ),
};
export const InsidePopover: Story = {
  render: () => (
    <Popover>
      <PopoverTrigger>Open project panel</PopoverTrigger>
      <PopoverContent>
        <PopoverTitle>Project panel</PopoverTitle>
        <Basic />
        <PopoverClose>Close panel</PopoverClose>
      </PopoverContent>
    </Popover>
  ),
};
function Controlled() {
  const [open, setOpen] = useState(false);
  return (
    <>
      <Button onClick={() => setOpen(!open)}>Toggle help from owner</Button>
      <Tooltip open={open} onOpenChange={setOpen}>
        <TooltipTrigger>Show project ID</TooltipTrigger>
        <TooltipContent>The application owns visibility.</TooltipContent>
      </Tooltip>
    </>
  );
}
export const ControlledState: Story = { render: () => <Controlled /> };
export const StrictLifecycle: Story = {
  render: () => (
    <StrictMode>
      <Basic open />
    </StrictMode>
  ),
};
export const RTL: Story = {
  render: () => (
    <div dir="rtl" style={{ paddingTop: 80 }}>
      <Basic open />
    </div>
  ),
};
