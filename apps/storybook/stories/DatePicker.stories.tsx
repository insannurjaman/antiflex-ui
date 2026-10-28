import type { Meta, StoryObj } from '@storybook/react-vite';
import { DatePicker } from '@antiflex/ui';
import { DatePickerFixture } from './ExpansionExamples';
const meta = {
  title: 'Components/DatePicker',
  component: DatePicker,
  parameters: { layout: 'padded' },
} satisfies Meta<typeof DatePicker>;
export default meta;
type Story = StoryObj;
export const Default: Story = { render: () => <DatePickerFixture variant="default" /> };
export const Open: Story = { render: () => <DatePickerFixture variant="open" /> };
export const RequiredForm: Story = { render: () => <DatePickerFixture variant="required" /> };
export const Disabled: Story = { render: () => <DatePickerFixture variant="disabled" /> };
export const Controlled: Story = { render: () => <DatePickerFixture variant="controlled" /> };
export const Bounded: Story = { render: () => <DatePickerFixture variant="bounded" /> };
export const Rtl: Story = { render: () => <DatePickerFixture variant="rtl" /> };
export const InsideDialog: Story = { render: () => <DatePickerFixture variant="modal" /> };
