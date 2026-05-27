import { IJTLDropdownMenuItemProps } from '../../jtl-dropdown';

/**
 * Props for the row action menu item
 * This type extends IJTLDropdownMenuItemProps and adds an onClick callback function that takes a record of type T as its parameter.
 * @example
 * ```tsx
 * const menuItems: RowActionMenuItem<User>[] = [
 *   {
 *     label: 'Edit',
 *     icon: 'Edit',
 *     onClick: (record) => console.log('Edit', record),
 *   },
 *   {
 *     label: 'Delete',
 *     icon: 'Trash2',
 *     onClick: (record) => console.log('Delete', record),
 *   },
 * ];
 * ```
 */
type RowActionMenuItem<T> = Omit<IJTLDropdownMenuItemProps, 'onClick'> & {
  onClick: (record: T) => void;
};

export default RowActionMenuItem;
