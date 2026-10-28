import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationButton,
  PaginationPrevious,
  PaginationNext,
  PaginationEllipsis,
} from '@antiflex/ui';
const meta = {
  title: 'Components/Pagination',
  component: Pagination,
  parameters: { layout: 'padded' },
} satisfies Meta<typeof Pagination>;
export default meta;
type Story = StoryObj;
function StatefulPages() {
  const [page, setPage] = useState(1);
  return (
    <>
      <Pagination aria-label="Project pages">
        <PaginationContent>
          <PaginationItem>
            <PaginationButton
              aria-label="Previous page"
              disabled={page === 1}
              onClick={() => setPage(page - 1)}
            >
              Previous
            </PaginationButton>
          </PaginationItem>
          {[1, 2, 3].map((n) => (
            <PaginationItem key={n}>
              <PaginationButton
                isActive={page === n}
                aria-label={'Page ' + n}
                onClick={() => setPage(n)}
              >
                {n}
              </PaginationButton>
            </PaginationItem>
          ))}
          <PaginationItem>
            <PaginationButton
              aria-label="Next page"
              disabled={page === 3}
              onClick={() => setPage(page + 1)}
            >
              Next
            </PaginationButton>
          </PaginationItem>
        </PaginationContent>
      </Pagination>
      <p role="status">Page {page} of 3</p>
    </>
  );
}
export const Default: Story = {
  render: () => (
    <Pagination>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious disabled />
        </PaginationItem>
        <PaginationItem>
          <PaginationLink href="?page=1" isActive aria-label="Page 1">
            1
          </PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationLink href="?page=2" aria-label="Page 2">
            2
          </PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationEllipsis />
        </PaginationItem>
        <PaginationItem>
          <PaginationNext href="?page=2" />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  ),
};
export const Stateful: Story = { render: () => <StatefulPages /> };
export const RTL: Story = {
  render: () => (
    <div dir="rtl">
      <StatefulPages />
    </div>
  ),
};
