import type { Meta, StoryObj } from '@storybook/react-vite';
import { NavigationMenu } from '@antiflex/ui';
import { NavigationFixture } from './ExpansionExamples';
const meta = {
  title: 'Components/NavigationMenu',
  component: NavigationMenu,
  parameters: { layout: 'padded' },
} satisfies Meta<typeof NavigationMenu>;
export default meta;
type Story = StoryObj;
export const Default: Story = { render: () => <NavigationFixture variant="default" /> };
export const Open: Story = { render: () => <NavigationFixture variant="open" /> };
export const CurrentPage: Story = { render: () => <NavigationFixture variant="current" /> };
export const Rtl: Story = { render: () => <NavigationFixture variant="rtl" /> };
export const ControlledRefusal: Story = {
  render: () => <NavigationFixture variant="controlled" />,
};
export const InsideDialog: Story = { render: () => <NavigationFixture variant="modal" /> };
export const LongContent: Story = { render: () => <NavigationFixture variant="long" /> };
export const StrictCleanup: Story = { render: () => <NavigationFixture variant="strict" /> };
