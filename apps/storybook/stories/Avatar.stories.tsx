import type { Meta, StoryObj } from '@storybook/react-vite';
import { Avatar } from '@antiflex/ui';
const meta = {
  title: 'Components/Avatar',
  component: Avatar,
  parameters: { layout: 'padded' },
} satisfies Meta<typeof Avatar>;
export default meta;
type Story = StoryObj;

export const Default: Story = { render: () => <Avatar alt="Alex Morgan" /> };
export const Sizes: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: 16, alignItems: 'center' }}>
      {(['sm', 'md', 'lg'] as const).map((size) => (
        <Avatar key={size} size={size} alt="Alex Morgan" />
      ))}
    </div>
  ),
};
export const Image: Story = {
  render: () => (
    <Avatar
      alt="Geometric sample identity"
      src={
        'data:image/svg+xml,' +
        encodeURIComponent(
          '<svg xmlns="http://www.w3.org/2000/svg" width="80" height="80"><rect width="80" height="80" fill="#e5e5e5"/><path d="M20 15h30l15 15v30L50 75H20L5 60V30z" fill="#171717"/></svg>',
        )
      }
    />
  ),
};
export const FailedImage: Story = {
  render: () => <Avatar alt="Sam Rivera" src="data:image/png;base64,AA==" />,
};
