import type { Meta, StoryObj } from '@storybook/react-vite';
import { Empty, Button } from '@antiflex/ui';
const meta = {
  title: 'Components/Empty',
  component: Empty,
  parameters: { layout: 'padded' },
} satisfies Meta<typeof Empty>;
export default meta;
type Story = StoryObj;

export const Default: Story = {
  render: () => (
    <Empty title="No projects yet" description="Create a shared home for your team's work.">
      <Button>Create project</Button>
    </Empty>
  ),
};
export const NoResults: Story = {
  render: () => (
    <Empty title="No matching records" description="Try another search or clear the filters.">
      <Button variant="secondary">Clear filters</Button>
    </Empty>
  ),
};
export const Permission: Story = {
  render: () => (
    <Empty
      title="You need access"
      description="Ask your workspace owner for permission to see this section."
    />
  ),
};
export const Error: Story = {
  render: () => (
    <Empty title="Could not load records" description="Check the connection and try again.">
      <Button variant="secondary">Retry</Button>
    </Empty>
  ),
};
