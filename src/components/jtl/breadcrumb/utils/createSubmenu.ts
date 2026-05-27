import { IBreadcrumbItemProps } from '../components';
import { DropdownItem } from '../../jtl-dropdown/types';
import { IJTLDropdownMenuItemProps } from '../../jtl-dropdown';
import createMenuItem from './createMenuItem';

/**
 * Creates a submenu item from a breadcrumb item with children
 * @param item - The breadcrumb item with children
 * @returns The submenu dropdown item
 */
export default function createSubmenu(item: IBreadcrumbItemProps): IJTLDropdownMenuItemProps {
  return {
    type: DropdownItem.SubMenuTrigger,
    label: item.label,
    children: item.children?.map(child => createMenuItem(child)) || [],
  };
}
