import React from 'react';
import { CommandVariant } from '../../types';
import { CommandItem } from '../../types';

/**
 * Props for the CommandItem component
 */
export default interface ICommandItemProps {
  /**
   * The command item data to render.
   */
  item: CommandItem;
  /**
   * Controls the visual presentation of the item.
   */
  variant: CommandVariant;
  /**
   * The current input value, used to highlight matching text within the item label.
   */
  inputValue: string;
  /**
   * Event handler called when the item is selected.
   */
  onItemSelect: (item: CommandItem) => void;
  /**
   * Optional custom render function for item content.
   * When provided, replaces the default label text rendered inside each item.
   */
  renderItem?: (item: CommandItem) => React.ReactNode;
  /**
   * Override the value used by CMDK for item identification/highlighting.
   * Use this to avoid collisions when the same item appears in multiple groups.
   */
  commandValue?: string;
}
