import type { Meta, StoryObj } from '@storybook/react-vite';
import { HoverCard } from '@antiflex/ui';
import { HoverFixture } from './ExpansionExamples';
const meta = {
  title: 'Components/HoverCard',
  component: HoverCard,
  parameters: { layout: 'padded' },
} satisfies Meta<typeof HoverCard>;
export default meta;
type Story = StoryObj;
export const Default: Story = { render: () => <HoverFixture variant="default" /> };
export const Open: Story = { render: () => <HoverFixture variant="open" /> };
export const LongContent: Story = { render: () => <HoverFixture variant="long" /> };
export const Rtl: Story = { render: () => <HoverFixture variant="rtl" /> };
export const ControlledRefusal: Story = { render: () => <HoverFixture variant="controlled" /> };
export const InsideDialog: Story = { render: () => <HoverFixture variant="modal" /> };
export const TouchToggle: Story = { render: () => <HoverFixture variant="touch" /> };
export const StrictCleanup: Story = { render: () => <HoverFixture variant="strict" /> };
