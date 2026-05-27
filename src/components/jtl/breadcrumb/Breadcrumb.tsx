import React, { useMemo } from 'react';
import { BreadcrumbWrapper, BreadcrumbItem as BreadcrumbItemWrapper, BreadcrumbList, BreadcrumbSeparator } from './BreadcrumbPrimitives';
import IBreadcrumbProps from './IBreadcrumbProps';
import { createMenuItem, createSubmenu } from './utils';
import { BreadcrumbItem, BreadcrumbEllipsisDropdown } from './components';

/**
 * Breadcrumb component that shows the navigation path
 * @param props {@link IBreadcrumbProps} - Props for the Breadcrumb component
 * @returns The rendered breadcrumb component
 *
 * @example
 * ```tsx
 * // Default
 * function App() {
 *   const items = [
 *     { label: 'Home', route: '/' },
 *     { label: 'Products', route: '#' },
 *     { label: 'Electronics', route: '#' },
 *   ];
 *
 *   return (
 *     <Breadcrumb items={items} />
 *   );
 * }
 * ```
 *
 * @example
 * ```tsx
 * // With nested children and ellipsis by maxItems
 * function App() {
 *   const items = [
 *     {
 *       label: 'Home',
 *       route: '/'
 *     },
 *     {
 *       label: 'Products',
 *       route: '#',
 *       children: [
 *         { label: 'New Arrivals', route: '/products/new' },
 *         { label: 'Best Sellers', route: '/products/best-sellers' },
 *       ]
 *     },
 *     {
 *       label: 'Electronics',
 *       route: '#',
 *       children: [
 *         { label: 'Smartphones', route: '/products/categories/electronics/smartphones' },
 *         { label: 'Tablets', route: '/products/categories/electronics/tablets' },
 *         { label: 'Laptops', route: '/products/categories/electronics/laptops' },
 *       ]
 *     },
 *     {
 *       label: 'Laptops',
 *       route: ''
 *     },
 *   ];
 *
 *   return (
 *     <Breadcrumb items={items} maxItems={3} />
 *   );
 * }
 * ```
 */
const Breadcrumb: React.FC<IBreadcrumbProps & React.RefAttributes<HTMLElement>> = ({
  items,
  maxItems = 3,
  className,
  ref,
  as: component,
  urlField,
  ...props
}) => {
  /**
   * Determine which items to show based on maxItems
   */
  const { visibleItems, showEllipsis, hiddenItems } = useMemo(() => {
    // If we have fewer items than maxItems, or maxItems is 0, show all items
    if (!maxItems || items.length <= maxItems) {
      return { visibleItems: items, showEllipsis: false, hiddenItems: [] };
    }

    // Always show the first item
    const firstItem = items[0];

    // Show as many last items as possible (maxItems - 1)
    const lastItemsCount = maxItems - 1;
    const lastItems = items.slice(-lastItemsCount);

    // Items that will be hidden and shown in dropdown
    const hiddenItems = items.slice(1, -lastItemsCount);

    return {
      visibleItems: [firstItem, ...lastItems],
      showEllipsis: true,
      hiddenItems,
    };
  }, [items, maxItems]);

  /**
   * Generate dropdown menu items from hidden breadcrumb items
   */
  const ellipsisDropdownMenuItems = useMemo(() => {
    return hiddenItems.map(item => {
      if (item.children && item.children.length > 0) {
        return createSubmenu(item);
      }
      return createMenuItem(item);
    });
  }, [hiddenItems]);

  return (
    <BreadcrumbWrapper ref={ref} className={className} {...props}>
      <BreadcrumbList>
        {visibleItems.map((item, index) => {
          const isLastItem = index === visibleItems.length - 1;
          const isFirstItem = index === 0;
          const showEllipsisAfter = isFirstItem && showEllipsis;

          return (
            <React.Fragment key={`breadcrumb-${item.label}-${index}`}>
              <BreadcrumbItemWrapper>
                <BreadcrumbItem {...item} isLastItem={isLastItem} as={component} urlField={urlField} />
              </BreadcrumbItemWrapper>

              {showEllipsisAfter && <BreadcrumbEllipsisDropdown ellipsisDropdownMenuItems={ellipsisDropdownMenuItems} />}

              {!isLastItem && <BreadcrumbSeparator />}
            </React.Fragment>
          );
        })}
      </BreadcrumbList>
    </BreadcrumbWrapper>
  );
};

Breadcrumb.displayName = 'Breadcrumb';

export default Breadcrumb;
