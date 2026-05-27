export default interface IContextMenuItemProps {
  /**
   * Type of the context menu item
   */
  type?: 'item' | 'label' | 'separator';

  /**
   * Label text for the context menu item
   */
  label?: string;

  /**
   * Optional keyboard shortcut for the context menu item
   */
  shortcut?: string;

  /**
   * Click handler for the context menu item
   */
  onClick?: () => void;

  /**
   * Optional selected state for checkbox and radio items
   */
  isSelected?: boolean;

  /**
   * Optional disabled state for the context menu item
   */
  isDisabled?: boolean;

  /**
   * Optional children for submenu items
   */
  children?: IContextMenuItemProps[];

  /**
   * Optional close handler for the context menu item
   */
  onClose?: () => void;

  /**
   * Optional inset for the context menu item
   */
  inset?: boolean;
}
