import { DropdownItem } from '../../jtl-dropdown/types';
import { IJTLDropdownMenuItemProps } from '../../jtl-dropdown';
import { IBreadcrumbItemProps } from '../components';

/**
 * Converts a breadcrumb item to a dropdown menu item
 * @param item - The breadcrumb item to convert
 * @returns The dropdown menu item
 */
export default function createMenuItem(item: IBreadcrumbItemProps): IJTLDropdownMenuItemProps {
  return {
    type: DropdownItem.Default,
    label: item.label,
    onClick: item.route
      ? () => {
          window.location.href = item?.route as string;
        }
      : undefined,
  };
}
