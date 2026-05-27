import React from 'react';
import { IBreadcrumbItemProps } from './components';
import { ICustomComponentConfig } from './interfaces';

/**
 * Props for the Breadcrumb component
 */
export default interface IBreadcrumbProps extends React.ComponentPropsWithoutRef<'nav'>, ICustomComponentConfig {
  /**
   * Array of breadcrumb items to display
   */
  items: IBreadcrumbItemProps[];

  /**
   * Maximum number of items to display
   * If items.length > maxItems, will show first item, ellipsis, and (maxItems-1) last items
   * If 0 or undefined, all items will be shown
   * @default 3
   */
  maxItems?: number;
}
