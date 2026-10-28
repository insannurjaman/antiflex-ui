import type { Meta, StoryObj } from '@storybook/react-vite';
import { ContextMenu } from '@antiflex/ui';
import { ContextFixture } from './MenuExamples';
const meta = {
  title: 'Components/ContextMenu',
  component: ContextMenu,
  parameters: { layout: 'padded' },
} satisfies Meta<typeof ContextMenu>;
export default meta;
type Story = StoryObj;
export const Basic: Story = { render: () => <ContextFixture /> };
export const Open: Story = { render: () => <ContextFixture defaultOpen /> };
export const ChecksAndRadios: Story = { render: () => <ContextFixture defaultOpen /> };
export const Submenus: Story = { render: () => <ContextFixture /> };
export const Rtl: Story = { render: () => <ContextFixture rtl /> };
export const ControlledRefusal: Story = { render: () => <ContextFixture mode="refuse" /> };
export const Long: Story = { render: () => <ContextFixture long /> };
export const InsideDialog: Story = { render: () => <ContextFixture mode="modal" /> };
