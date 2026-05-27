import { DropdownItem } from '../../types';
import IJTLDropdownDefaultMenuItemProps from '../jtl-dropdown-default-menu-item/IJTLDropdownDefaultMenuItemProps';

/**
 * Interface for menu item in dropdown
 */
export default interface IJTLDropdownMenuItemProps extends IJTLDropdownDefaultMenuItemProps {
  /**
   * Type of the dropdown item
   */
  type: DropdownItem;

  /**
   * Optional selected state for checkbox and radio items
   */
  isSelected?: boolean;

  /**
   * Optional children for submenu items
   */
  children?: IJTLDropdownMenuItemProps[];

  /**
   * Optional click handler for the dropdown item
   */
  onClick?: () => void;

  /**
   * Optional close handler for the dropdown
   */
  onClose?: () => void;
}
