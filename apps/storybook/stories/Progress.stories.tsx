import type { Meta, StoryObj } from '@storybook/react-vite';
import { Progress } from '@antiflex/ui';
const meta = {
  title: 'Components/Progress',
  component: Progress,
  parameters: { layout: 'padded' },
} satisfies Meta<typeof Progress>;
export default meta;
type Story = StoryObj;

export const Default: Story = {
  render: () => <Progress value={64} aria-label="Importing records" />,
};
export const Indeterminate: Story = { render: () => <Progress aria-label="Preparing files" /> };
export const Sizes: Story = {
  render: () => (
    <div style={{ display: 'grid', gap: 20 }}>
      {(['sm', 'md', 'lg'] as const).map((size) => (
        <Progress key={size} size={size} value={64} aria-label={'Sample progress ' + size} />
      ))}
    </div>
  ),
};
export const Bounds: Story = {
  render: () => (
    <div style={{ display: 'grid', gap: 20 }}>
      <Progress value={-4} aria-label="Not started" />
      <Progress value={200} aria-label="Complete" />
      <Progress value={Number.NaN} max={0} aria-label="Unknown completion" />
    </div>
  ),
};
