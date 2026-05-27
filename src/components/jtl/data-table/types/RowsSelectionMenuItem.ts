import { IconType } from '../../icon';

/**
 * Props for the rows selection menu item
 * This type extends IJTLDropdownMenuItemProps and adds an onClick callback function that takes a record of type T as its parameter.
 * @example
 * ```tsx
 * const menuItems: RowsSelectionMenuItem<User>[] = [
 *   {
 *     label: 'Edit',
 *     icon: 'Edit',
 *     onClick: (records) => console.log('Edit', records),
 *   },
 *   {
 *     label: 'Delete',
 *     icon: 'Trash2',
 *     onClick: (records) => console.log('Delete', records),
 *   },
 * ];
 * ```
 */
type RowsSelectionMenuItem<T> = {
  /**
   * Label for the action
   */
  label: string;

  /**
   * Icon for the action
   */
  icon: IconType;

  /**
   * Icon position
   */
  iconOnly?: boolean;

  /**
   * Keyboard shortcut for the action
   */
  shortcut?: string;

  /**
   * Callback function to be called when the action is clicked
   */
  onClick: (records: T[]) => void;

  /**
   * Whether the action is disabled
   * @default false
   */
  disabled?: boolean;

  /**
   * Whether the action is a dropdown action
   * @default false
   */
  isDropdownAction?: boolean;
};

export default RowsSelectionMenuItem;
