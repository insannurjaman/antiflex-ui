import type { Meta, StoryObj } from '@storybook/react-vite';
import { Typography } from '@antiflex/ui';
const meta = {
  title: 'Components/Typography',
  component: Typography,
  parameters: { layout: 'padded' },
} satisfies Meta<typeof Typography>;
export default meta;
type Story = StoryObj;

export const Default: Story = {
  render: () => (
    <Typography>
      <h2>Workspace guidelines</h2>
      <p>
        Good systems preserve <strong>meaning</strong> as they scale.
      </p>
      <ul>
        <li>Use shared tokens.</li>
        <li>Choose semantic HTML.</li>
      </ul>
      <blockquote>Design and code speak one language.</blockquote>
      <p>
        Read <a href="#guide">the guide</a> or inspect <code>data-theme</code>.
      </p>
    </Typography>
  ),
};
export const Compact: Story = {
  render: () => (
    <Typography size="sm">
      <h3>A readable note</h3>
      <p>Compact text keeps a comfortable measure and a clear rhythm.</p>
      <ol>
        <li>Read the source.</li>
        <li>Adapt the example.</li>
      </ol>
    </Typography>
  ),
};
export const LongCode: Story = {
  render: () => (
    <Typography size="sm">
      <h3>Long content</h3>
      <p>LongIdentifierWithoutBreaksCanStillWrapAcrossNarrowViewportsAndRightToLeftLayouts.</p>
      <pre tabIndex={0} aria-label="TypeScript example">
        <code>
          {
            'const workspace = createWorkspace({ name: "A source your team can own", theme: "light", direction: "ltr" });'
          }
        </code>
      </pre>
    </Typography>
  ),
};
