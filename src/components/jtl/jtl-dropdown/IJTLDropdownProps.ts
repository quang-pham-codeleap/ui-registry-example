import React from 'react';
import { IJTLDropdownMenuItemProps } from './components';

/**
 * Interface for dropdown component props
 */
export default interface IJTLDropdownProps {
  /**
   * Whether the dropdown is open
   */
  isOpen?: boolean;

  /**
   * Whether the dropdown is open by default (uncontrolled mode only)
   */
  defaultOpen?: boolean;

  /**
   * Position of the dropdown relative to the trigger
   */
  position?: 'left' | 'center' | 'right';

  /**
   * Callback function when dropdown is closed
   */
  onClose?: () => void;

  /**
   * Array of menu items to display in the dropdown
   */
  menuItems: IJTLDropdownMenuItemProps[];

  /**
   * Optional children for the dropdown component
   */
  children?: React.ReactNode;

  /**
   * Width of the dropdown
   * @example: '200px', 'var(--width-w-72)'
   */
  width?: string;
}
