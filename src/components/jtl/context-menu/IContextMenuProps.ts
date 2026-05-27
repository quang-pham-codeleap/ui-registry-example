import React from 'react';
import { IContextMenuItemProps } from './components';

/**
 * Interface for the context menu component props
 */
export default interface IContextMenuProps extends React.PropsWithChildren {
  /**
   * Array of menu items to display in the context menu
   */
  menuItems: IContextMenuItemProps[];

  /**
   * Whether to inset the context menu
   */
  inset?: boolean;

  /**
   * Width of the context menu
   */
  width?: string;
}
