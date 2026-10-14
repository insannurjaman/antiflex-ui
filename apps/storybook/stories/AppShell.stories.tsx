import type { Meta, StoryObj } from '@storybook/react-vite';
import { AppShell } from '@chamfer/ui';
const meta = {
  title: 'Components/AppShell',
  component: AppShell,
  parameters: { layout: 'padded' },
  args: {
    header: <strong>Sample workspace</strong>,
    sidebar: (
      <nav aria-label="Workspace sections">
        <a href="#main-content">Overview</a>
      </nav>
    ),
    children: (
      <>
        <h1>Overview</h1>
        <p>A frame for your primary task.</p>
      </>
    ),
  },
} satisfies Meta<typeof AppShell>;
export default meta;
type Story = StoryObj<typeof meta>;
export const Default: Story = {};
