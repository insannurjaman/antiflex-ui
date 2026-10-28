import type { Meta, StoryObj } from '@storybook/react-vite';
import { Kbd, KbdGroup } from '@antiflex/ui';
const meta = {
  title: 'Components/Kbd',
  component: Kbd,
  parameters: { layout: 'padded' },
} satisfies Meta<typeof Kbd>;
export default meta;
type Story = StoryObj;

export const Default: Story = { render: () => <Kbd>Escape</Kbd> };
export const Shortcut: Story = {
  render: () => (
    <KbdGroup aria-label="Control plus K">
      <Kbd>Ctrl</Kbd>
      <span aria-hidden="true">+</span>
      <Kbd>K</Kbd>
    </KbdGroup>
  ),
};
export const Navigation: Story = {
  render: () => (
    <span>
      Move focus with <Kbd>ArrowLeft</Kbd> or <Kbd>ArrowRight</Kbd>.
    </span>
  ),
};
