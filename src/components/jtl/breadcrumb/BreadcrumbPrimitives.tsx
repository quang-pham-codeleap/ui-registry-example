import React, { ComponentPropsWithRef } from 'react';
import { Slot } from '@radix-ui/react-slot';

import { cn } from '@/lib/utils';
import { Icon } from '../icon';
import { ICustomComponentConfig } from './interfaces';

const BreadcrumbWrapper: React.FC<
  React.ComponentPropsWithoutRef<'nav'> & {
    separator?: React.ReactNode;
  } & React.RefAttributes<HTMLElement>
> = ({ ref, ...props }) => <nav ref={ref} aria-label="breadcrumb" {...props} />;
BreadcrumbWrapper.displayName = 'BreadcrumbWrapper';

const BreadcrumbList: React.FC<ComponentPropsWithRef<'ol'>> = ({ className, ref, ...props }) => (
  <ol
    ref={ref}
    className={cn('flex flex-wrap items-center gap-2.5 break-words text-sm text-[var(--muted-foreground)] sm:gap-2.5', className)}
    {...props}
  />
);
BreadcrumbList.displayName = 'BreadcrumbList';

const BreadcrumbItem: React.FC<React.ComponentPropsWithRef<'li'>> = ({ className, ref, ...props }) => (
  <li ref={ref} className={cn('inline-flex items-center gap-1.5', className)} {...props} />
);
BreadcrumbItem.displayName = 'BreadcrumbItem';

/**
 * BreadcrumbLink component that can render as an anchor tag, a Slot, or a custom link component
 */
const BreadcrumbLink: React.FC<
  React.ComponentPropsWithRef<'a'> & {
    asChild?: boolean;
  } & ICustomComponentConfig
> = ({ asChild, className: customClassName, ref, as: component, urlField = 'href', ...props }) => {
  const className = cn('transition-colors hover:text-[var(--foreground)]', customClassName);
  if (component) {
    return React.createElement(component, {
      ref,
      className,
      ...(urlField && { [urlField]: props.href }),
      ...props,
    });
  }

  const Comp = asChild ? Slot : 'a';

  return <Comp ref={ref} className={className} {...props} />;
};
BreadcrumbLink.displayName = 'BreadcrumbLink';

const BreadcrumbPage: React.FC<React.ComponentPropsWithRef<'span'>> = ({ className, ref, ...props }) => (
  <span ref={ref} role="link" aria-disabled="true" aria-current="page" className={cn('font-normal text-[var(--foreground)]', className)} {...props} />
);
BreadcrumbPage.displayName = 'BreadcrumbPage';

const BreadcrumbSeparator: React.FC<React.ComponentProps<'li'>> = ({ children, className, ...props }) => (
  <li role="presentation" aria-hidden="true" className={cn('[&>svg]:w-3.5 [&>svg]:h-3.5', 'text-[var(--muted-foreground)]', className)} {...props}>
    {children ?? <Icon name="ChevronRight" />}
  </li>
);
BreadcrumbSeparator.displayName = 'BreadcrumbSeparator';

const BreadcrumbEllipsis: React.FC<React.ComponentProps<'span'>> = ({ className, ...props }) => (
  <span
    role="presentation"
    aria-hidden="true"
    className={cn('flex h-9 w-9 items-center justify-center', 'text-[var(--muted-foreground)]', className)}
    {...props}
  >
    <Icon name="MoreHorizontal" className="h-4 w-4" />
    <span className="sr-only">Mehr</span>
  </span>
);
BreadcrumbEllipsis.displayName = 'BreadcrumbEllipsis';

export { BreadcrumbWrapper, BreadcrumbList, BreadcrumbItem, BreadcrumbLink, BreadcrumbPage, BreadcrumbSeparator, BreadcrumbEllipsis };
