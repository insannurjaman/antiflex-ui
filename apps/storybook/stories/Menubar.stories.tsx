import type { Meta, StoryObj } from '@storybook/react-vite';
import { Menubar } from '@antiflex/ui';
import { MenubarFixture } from './ExpansionExamples';
const meta = {
  title: 'Components/Menubar',
  component: Menubar,
  parameters: { layout: 'padded' },
} satisfies Meta<typeof Menubar>;
export default meta;
type Story = StoryObj;
export const Default: Story = { render: () => <MenubarFixture variant="default" /> };
export const Open: Story = { render: () => <MenubarFixture variant="open" /> };
export const Disabled: Story = { render: () => <MenubarFixture variant="disabled" /> };
export const Rtl: Story = { render: () => <MenubarFixture variant="rtl" /> };
export const ControlledRefusal: Story = { render: () => <MenubarFixture variant="controlled" /> };
export const InsideDialog: Story = { render: () => <MenubarFixture variant="modal" /> };
export const Submenu: Story = { render: () => <MenubarFixture variant="submenu" /> };
export const StrictCleanup: Story = { render: () => <MenubarFixture variant="strict" /> };
