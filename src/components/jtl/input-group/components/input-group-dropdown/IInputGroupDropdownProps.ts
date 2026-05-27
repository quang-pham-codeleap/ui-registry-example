import { IJTLDropdownMenuItemProps } from '../../../jtl-dropdown/components';

/**
 * Props for the InputGroupDropdown component
 * Wraps JTLDropdown for selection menus within InputGroup
 */
export default interface IInputGroupDropdownProps {
  /**
   * The label to display on the dropdown trigger
   */
  label: string;

  /**
   * Array of menu items to display in the dropdown
   */
  menuItems: Omit<IJTLDropdownMenuItemProps, 'type'>[];

  /**
   * Whether the dropdown is disabled
   * @default false
   */
  disabled?: boolean;

  /**
   * Callback when the dropdown is closed
   */
  onClose?: () => void;

  /**
   * Width of the dropdown content
   */
  width?: string;
}
