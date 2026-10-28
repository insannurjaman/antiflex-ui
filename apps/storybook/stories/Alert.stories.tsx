import type { Meta, StoryObj } from '@storybook/react-vite';
import { Alert } from '@antiflex/ui';
const meta = {
  title: 'Components/Alert',
  component: Alert,
  parameters: { layout: 'padded' },
} satisfies Meta<typeof Alert>;
export default meta;
type Story = StoryObj;

export const Default: Story = {
  render: () => <Alert title="Review before publishing">Check the changes with your team.</Alert>,
};
export const Variants: Story = {
  render: () => (
    <div style={{ display: 'grid', gap: 16 }}>
      {(['neutral', 'success', 'warning', 'danger'] as const).map((variant) => (
        <Alert key={variant} variant={variant} title={variant}>
          A readable status message with a clear next step.
        </Alert>
      ))}
    </div>
  ),
};
export const LongContent: Story = {
  render: () => (
    <Alert variant="warning" title="A long project name should wrap without hiding the message">
      A workspace can contain long identifiers, translated messages, and links such as{' '}
      <a href="#guidance">read recovery guidance</a>. The text remains readable without relying on
      color.
    </Alert>
  ),
};
