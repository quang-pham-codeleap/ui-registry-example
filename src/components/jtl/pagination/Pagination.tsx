import React, { useCallback, useMemo } from 'react';
import {
  Pagination as PaginationRoot,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from './components';
import IPaginationProps from './IPaginationProps';
import { cn } from '@/lib';

const START_ELLIPSIS = 'start-ellipsis';
const END_ELLIPSIS = 'end-ellipsis';

/**
 * Pagination component that provides navigation between pages.
 *
 * @param props {@link IPaginationProps}- The pagination props
 * @returns The Pagination component
 */
const Pagination: React.FC<IPaginationProps> = ({
  total,
  page,
  pageSize = 10,
  onPageChange,
  previousText = 'Zurück',
  nextText = 'Weiter',
  showTotal,
}) => {
  // Calculate total pages based on total items (assuming 10 items per page)
  const totalPages = Math.max(1, Math.ceil(total / pageSize));

  // Calculate which page numbers to display
  const getPageNumbers = useCallback((): (number | string)[] => {
    const pages: (number | string)[] = [];

    // Handle simple cases
    if (totalPages <= 7) {
      // If we have 7 or fewer pages, show all page numbers without ellipsis
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
      return pages;
    }

    // Always show first page
    pages.push(1);

    // Complex case: we need ellipsis
    if (page <= 4) {
      // Near the beginning: show 1, 2, 3, 4, 5, ..., totalPages
      for (let i = 2; i <= 5; i++) {
        pages.push(i);
      }
      pages.push(END_ELLIPSIS);
    } else if (page >= totalPages - 3) {
      // Near the end: show 1, ..., totalPages-4, totalPages-3, totalPages-2, totalPages-1, totalPages
      pages.push(START_ELLIPSIS);
      for (let i = totalPages - 4; i < totalPages; i++) {
        pages.push(i);
      }
    } else {
      // In the middle: show 1, ..., page-1, page, page+1, ..., totalPages
      // This ensures exactly 3 pages in the middle when both ellipses are present
      pages.push(START_ELLIPSIS);
      pages.push(page - 1);
      pages.push(page);
      pages.push(page + 1);
      pages.push(END_ELLIPSIS);
    }

    // Always show last page if there are more than one page
    if (totalPages > 1) {
      pages.push(totalPages);
    }

    return pages;
  }, [page, totalPages]);

  // Get the page numbers to display
  const pageNumbers = getPageNumbers();

  // Handler for page change
  const handlePageChange = useCallback(
    (newPage: number) => {
      if (newPage !== page && newPage >= 1 && newPage <= totalPages) {
        onPageChange(newPage);
      }
    },
    [page, totalPages, onPageChange],
  );

  /**
   * Handle ellipsis click to jump multiple pages at once
   * - For start-ellipsis: Jump back 3 pages or to first hidden page
   * - For end-ellipsis: Jump forward 3 pages or to last hidden page
   */
  const handleEllipsisClick = useCallback(
    (type: string) => {
      if (type === START_ELLIPSIS) {
        // For start ellipsis, find hidden pages based on current visible pages
        const firstVisiblePage = pageNumbers[2] as number; // First page is always visible
        const firstHiddenPage = 2; // This is always 2
        const lastHiddenPage = firstVisiblePage - 1; // page-1 is visible in UI

        // Calculate how many pages to jump (3 hidden pages or less if fewer available)
        const hiddenPagesCount = lastHiddenPage - firstHiddenPage + 1;

        if (hiddenPagesCount < 3) {
          // Less than 3 hidden pages, jump to the first hidden page
          handlePageChange(firstHiddenPage);
        } else {
          // More than 3 hidden pages, jump 3 pages back from current visible range
          handlePageChange(lastHiddenPage - 1);
        }
      } else if (type === END_ELLIPSIS) {
        // For end ellipsis, find hidden pages based on current visible pages
        const lastVisiblePage = pageNumbers[pageNumbers.length - 3] as number; // Last visible page before ellipsis
        const firstHiddenPage = lastVisiblePage + 1;
        const lastHiddenPage = totalPages - 1;

        // Calculate how many pages to jump (3 hidden pages or less if fewer available)
        const hiddenPagesCount = lastHiddenPage - firstHiddenPage + 1;

        if (hiddenPagesCount < 3) {
          // Less than 3 hidden pages, jump to last hidden page
          handlePageChange(lastHiddenPage);
        } else {
          // More than 3 hidden pages, jump 3 pages forward from current visible range
          handlePageChange(firstHiddenPage + 1); // Jump 3 pages into hidden section
        }
      }
    },
    [totalPages, handlePageChange, pageNumbers],
  );

  // Catch error when render showTotal got error, because showTotal is defined by user
  const totalContent = useMemo(() => {
    try {
      return showTotal?.(total);
    } catch (error) {
      console.error('Error rendering showTotal:', error);
      return null;
    }
  }, [showTotal, total]);

  return (
    <PaginationRoot className={cn(showTotal && 'flex items-center justify-between')}>
      {totalContent && <div className="flex items-center text-[length:var(--typography-base-sizes-small-font-size)]">{totalContent}</div>}
      <PaginationContent>
        {/* Previous button */}
        <PaginationItem>
          <PaginationPrevious
            onClick={() => handlePageChange(page - 1)}
            aria-disabled={page <= 1}
            tabIndex={page <= 1 ? -1 : 0}
            className={page <= 1 ? 'opacity-50 pointer-events-none' : ''}
          >
            {previousText}
          </PaginationPrevious>
        </PaginationItem>

        {/* Page numbers */}
        {pageNumbers.map(pageNum => {
          if (typeof pageNum === 'string') {
            // Render clickable ellipsis
            return (
              <PaginationItem key={pageNum}>
                <PaginationEllipsis
                  onClick={() => handleEllipsisClick(pageNum)}
                  className="cursor-pointer hover:bg-[color:var(--colors-background-on-surface)]"
                  aria-label={pageNum === START_ELLIPSIS ? 'Jump to previous pages' : 'Jump to next pages'}
                  hoverIcon={pageNum === START_ELLIPSIS ? 'ChevronsLeft' : 'ChevronsRight'}
                />
              </PaginationItem>
            );
          }

          // Render page number
          return (
            <PaginationItem key={pageNum}>
              <PaginationLink isActive={pageNum === page} onClick={() => handlePageChange(pageNum)} aria-label={`Page ${pageNum}`}>
                {pageNum}
              </PaginationLink>
            </PaginationItem>
          );
        })}

        {/* Next button */}
        <PaginationItem>
          <PaginationNext
            onClick={() => handlePageChange(page + 1)}
            aria-disabled={page >= totalPages}
            tabIndex={page >= totalPages ? -1 : 0}
            className={page >= totalPages ? 'opacity-50 pointer-events-none' : ''}
          >
            {nextText}
          </PaginationNext>
        </PaginationItem>
      </PaginationContent>
    </PaginationRoot>
  );
};

export default Pagination;
