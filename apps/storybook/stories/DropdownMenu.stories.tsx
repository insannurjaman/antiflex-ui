import type { Meta, StoryObj } from '@storybook/react-vite';
import { DropdownMenu } from '@antiflex/ui';
import { DropdownFixture } from './MenuExamples';
const meta = {
  title: 'Components/DropdownMenu',
  component: DropdownMenu,
  parameters: { layout: 'padded' },
} satisfies Meta<typeof DropdownMenu>;
export default meta;
type Story = StoryObj;
export const Basic: Story = { render: () => <DropdownFixture /> };
export const Open: Story = { render: () => <DropdownFixture defaultOpen /> };
export const Small: Story = { render: () => <DropdownFixture size="sm" defaultOpen /> };
export const Large: Story = { render: () => <DropdownFixture size="lg" defaultOpen /> };
export const ChecksAndRadios: Story = { render: () => <DropdownFixture defaultOpen /> };
export const Submenus: Story = { render: () => <DropdownFixture /> };
export const Disabled: Story = { render: () => <DropdownFixture mode="disabled" /> };
export const Long: Story = { render: () => <DropdownFixture long defaultOpen /> };
export const Rtl: Story = { render: () => <DropdownFixture rtl defaultOpen /> };
export const ControlledRefusal: Story = { render: () => <DropdownFixture mode="refuse" /> };
export const InsideDialog: Story = { render: () => <DropdownFixture mode="modal" /> };
export const StrictCleanup: Story = { render: () => <DropdownFixture mode="strict" /> };
export const Empty: Story = { render: () => <DropdownFixture mode="empty" defaultOpen /> };
