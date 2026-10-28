import type { Meta, StoryObj } from '@storybook/react-vite';
import { Command } from '@antiflex/ui';
import { CommandFixture } from './ExpansionExamples';
const meta = {
  title: 'Components/Command',
  component: Command,
  parameters: { layout: 'padded' },
} satisfies Meta<typeof Command>;
export default meta;
type Story = StoryObj;
export const Default: Story = { render: () => <CommandFixture variant="default" /> };
export const Dialog: Story = { render: () => <CommandFixture variant="dialog" /> };
export const Empty: Story = { render: () => <CommandFixture variant="empty" /> };
export const Loading: Story = { render: () => <CommandFixture variant="loading" /> };
export const DisabledItems: Story = { render: () => <CommandFixture variant="disabled" /> };
export const LongContent: Story = { render: () => <CommandFixture variant="long" /> };
export const Rtl: Story = { render: () => <CommandFixture variant="rtl" /> };
export const StrictCleanup: Story = { render: () => <CommandFixture variant="strict" /> };
