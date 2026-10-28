import type { Meta, StoryObj } from '@storybook/react-vite';
import { Select } from '@antiflex/ui';
import { ChoiceFixture } from './ExpansionExamples';
const meta = {
  title: 'Components/Select',
  component: Select,
  parameters: { layout: 'padded' },
} satisfies Meta<typeof Select>;
export default meta;
type Story = StoryObj;
export const Default: Story = { render: () => <ChoiceFixture variant="default" /> };
export const Open: Story = { render: () => <ChoiceFixture variant="open" /> };
export const Disabled: Story = { render: () => <ChoiceFixture variant="disabled" /> };
export const Sizes: Story = { render: () => <ChoiceFixture variant="sizes" /> };
export const Empty: Story = { render: () => <ChoiceFixture variant="empty" /> };
export const Loading: Story = { render: () => <ChoiceFixture variant="loading" /> };
export const Controlled: Story = { render: () => <ChoiceFixture variant="controlled" /> };
export const Rtl: Story = { render: () => <ChoiceFixture variant="rtl" /> };
