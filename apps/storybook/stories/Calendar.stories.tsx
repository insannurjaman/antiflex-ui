import type { Meta, StoryObj } from '@storybook/react-vite';
import { Calendar } from '@antiflex/ui';
import { CalendarFixture } from './ExpansionExamples';
const meta = {
  title: 'Components/Calendar',
  component: Calendar,
  parameters: { layout: 'padded' },
} satisfies Meta<typeof Calendar>;
export default meta;
type Story = StoryObj;
export const Default: Story = { render: () => <CalendarFixture variant="default" /> };
export const Controlled: Story = { render: () => <CalendarFixture variant="controlled" /> };
export const MondayStart: Story = { render: () => <CalendarFixture variant="monday" /> };
export const LocaleIndonesian: Story = { render: () => <CalendarFixture variant="locale" /> };
export const BoundedLeapYear: Story = { render: () => <CalendarFixture variant="leap" /> };
export const DisabledDates: Story = { render: () => <CalendarFixture variant="disabled-dates" /> };
export const Rtl: Story = { render: () => <CalendarFixture variant="rtl" /> };
export const FullyDisabled: Story = { render: () => <CalendarFixture variant="fully-disabled" /> };
