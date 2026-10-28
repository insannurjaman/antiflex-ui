import type { Meta, StoryObj } from '@storybook/react-vite';
import {
  Table,
  TableCaption,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
  Badge,
} from '@antiflex/ui';
const meta = {
  title: 'Components/Table',
  component: Table,
  parameters: { layout: 'padded' },
} satisfies Meta<typeof Table>;
export default meta;
type Story = StoryObj<typeof meta>;
export const Default: Story = {
  render: () => (
    <Table>
      <TableCaption>Sample projects</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead>Project</TableHead>
          <TableHead>Status</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        <TableRow>
          <TableCell>Atlas</TableCell>
          <TableCell>
            <Badge variant="success">Active</Badge>
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell>Forma</TableCell>
          <TableCell>
            <Badge variant="warning">In review</Badge>
          </TableCell>
        </TableRow>
      </TableBody>
    </Table>
  ),
};
export const Empty: Story = {
  render: () => (
    <Table>
      <TableCaption>Sample projects</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead>Project</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        <TableRow>
          <TableCell>No projects yet.</TableCell>
        </TableRow>
      </TableBody>
    </Table>
  ),
};
