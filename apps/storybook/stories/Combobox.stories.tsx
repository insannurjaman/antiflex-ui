import type { Meta, StoryObj } from '@storybook/react-vite';
import { Combobox } from '@antiflex/ui';
import { ChoiceFixture } from './ExpansionExamples';
const meta = {
  title: 'Components/Combobox',
  component: Combobox,
  parameters: { layout: 'padded' },
} satisfies Meta<typeof Combobox>;
export default meta;
type Story = StoryObj;
export const Default: Story = { render: () => <ChoiceFixture variant="default" editable /> };
export const Open: Story = { render: () => <ChoiceFixture variant="open" editable /> };
export const Disabled: Story = { render: () => <ChoiceFixture variant="disabled" editable /> };
export const LongContent: Story = { render: () => <ChoiceFixture variant="long" editable /> };
export const Empty: Story = { render: () => <ChoiceFixture variant="empty" editable /> };
export const Loading: Story = { render: () => <ChoiceFixture variant="loading" editable /> };
export const Controlled: Story = { render: () => <ChoiceFixture variant="controlled" editable /> };
export const Rtl: Story = { render: () => <ChoiceFixture variant="rtl" editable /> };
