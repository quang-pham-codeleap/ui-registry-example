import React from 'react';
import { IconType } from '../../../icon';

/**
 * Props for the DefaultMenuItem component
 */
export default interface IJTLDropdownDefaultMenuItemProps {
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
}
