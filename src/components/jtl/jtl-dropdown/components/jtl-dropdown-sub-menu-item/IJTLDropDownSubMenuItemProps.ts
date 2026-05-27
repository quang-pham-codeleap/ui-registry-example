import React from 'react';
import { IconType } from '../../../icon';
import { IJTLDropdownMenuItemProps } from '../jtl-dropdown-menu-item';
/**
 * Props for the SubMenuItem component
 */
export default interface IJTLDropDownSubMenuItemProps {
  /**
   * Label text for the menu item
   */
  label?: string;

  /**
   * Icon name or emoji
   */
  icon?: IconType;

  /**
   * Keyboard shortcut text
   */
  shortcut?: string;

  /**
   * Whether the item is disabled
   */
  isDisabled?: boolean;

  /**
   * Click handler for the menu item
   */
  onClick?: (event: React.MouseEvent) => void;

  /**
   * Child menu items
   */
  children?: IJTLDropdownMenuItemProps[];

  /**
   * Function to close the dropdown
   */
  onClose?: () => void;
}
