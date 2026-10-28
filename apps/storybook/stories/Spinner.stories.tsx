import type { Meta, StoryObj } from '@storybook/react-vite';
import { Spinner, Button } from '@antiflex/ui';
const meta = {
  title: 'Components/Spinner',
  component: Spinner,
  parameters: { layout: 'padded' },
} satisfies Meta<typeof Spinner>;
export default meta;
type Story = StoryObj;

export const Default: Story = { render: () => <Spinner label="Loading projects" /> };
export const Sizes: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: 20, alignItems: 'center' }}>
      <Spinner size="sm" />
      <Spinner size="md" />
      <Spinner size="lg" />
      <span>Loading sample projects</span>
    </div>
  ),
};
export const InButton: Story = { render: () => <Button loading>Saving changes</Button> };
