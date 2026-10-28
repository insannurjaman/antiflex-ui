import type { Meta, StoryObj } from '@storybook/react-vite';
import { ButtonGroup, Button } from '@antiflex/ui';
const meta = {
  title: 'Components/Button Group',
  component: ButtonGroup,
  args: {
    'aria-label': 'Document actions',
    children: (
      <>
        <Button variant="secondary">Save draft</Button>
        <Button variant="secondary">Save a copy</Button>
        <Button variant="secondary" disabled>
          Archive
        </Button>
      </>
    ),
  },
} satisfies Meta<typeof ButtonGroup>;
export default meta;
type Story = StoryObj<typeof meta>;
export const Default: Story = {};
export const Vertical: Story = { args: { orientation: 'vertical' } };
