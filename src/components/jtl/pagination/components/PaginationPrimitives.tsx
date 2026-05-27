import React from 'react';

import { cn } from '@/lib';
import { Button } from '../../button';
import { buttonShapes, buttonSizes, buttonVariants } from '../../button/types';
import { Icon, LucideIconName } from '../../icon';

function Pagination({ className, ...props }: React.ComponentProps<'nav'>) {
  return (
    <nav
      role="navigation"
      aria-label="pagination"
      data-slot="pagination"
      className={cn('mx-auto flex w-full justify-center', className)}
      {...props}
    />
  );
}

function PaginationContent({ className, ...props }: React.ComponentProps<'ul'>) {
  return <ul data-slot="pagination-content" className={cn('flex flex-row items-center gap-1', className)} {...props} />;
}

function PaginationItem({ ...props }: React.ComponentProps<'li'>) {
  return <li data-slot="pagination-item" {...props} />;
}

type PaginationLinkProps = {
  isActive?: boolean;
} & Pick<React.ComponentProps<typeof Button>, 'size'> &
  React.ComponentProps<'a'>;

function PaginationLink({ className, isActive, size = 'icon', ...props }: PaginationLinkProps) {
  return (
    <a
      aria-current={isActive ? 'page' : undefined}
      data-slot="pagination-link"
      data-active={isActive}
      aria-label={props['aria-label']}
      className={cn(
        isActive ? buttonVariants['outline'] : buttonVariants['ghost'],
        buttonSizes[size].base,
        buttonShapes.default,
        'flex items-center justify-center',
        'cursor-pointer',
        'font-medium',
        'text-[length:var(--typography-base-sizes-small-font-size)]',
        className,
      )}
      {...props}
    />
  );
}

function PaginationPrevious({ className, children, ...props }: React.ComponentProps<typeof PaginationLink>) {
  return (
    <PaginationLink aria-label="Go to previous page" size="default" className={cn('gap-1 pl-2', className)} {...props}>
      <Icon name="ChevronLeft" size={16} />
      {children}
    </PaginationLink>
  );
}

function PaginationNext({ className, children, ...props }: React.ComponentProps<typeof PaginationLink>) {
  return (
    <PaginationLink aria-label="Go to next page" size="default" className={cn('gap-1 pr-2', className)} {...props}>
      {children}
      <Icon name="ChevronRight" size={16} />
    </PaginationLink>
  );
}

function PaginationEllipsis({ className, hoverIcon, ...props }: React.ComponentProps<'span'> & { hoverIcon: LucideIconName }) {
  return (
    <span
      aria-hidden
      data-slot="pagination-ellipsis"
      className={cn('group flex size-10 items-center justify-center cursor-pointer', className)}
      {...props}
    >
      <Icon className="group-hover:hidden" name="MoreHorizontal" size={16} />
      <Icon className="hidden group-hover:block" name={hoverIcon} size={16} color="var(--highlight)" />
    </span>
  );
}

export { Pagination, PaginationContent, PaginationLink, PaginationItem, PaginationPrevious, PaginationNext, PaginationEllipsis };
