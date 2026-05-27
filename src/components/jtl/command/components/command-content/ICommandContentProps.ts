import React from 'react';
import { CommandGroup, CommandItem, CommandVariant } from '../../types';

type ItemSelectHandler<T extends CommandVariant = CommandVariant> = T extends 'checkbox' ? (value: string[]) => void : (value: CommandItem) => void;

/**
 * Props for the CommandContent component
 */
export default interface ICommandContentProps<T extends CommandVariant = CommandVariant> {
  /**
   * Array of Items to be displayed in the List
   */
  groups: CommandGroup[];

  /**
   * The current value of the input used to filter Command Items
   */
  inputValue: string;

  /**
   * Controls the visual presentation of each item.
   * - 'simple': (Default) Displays only the label.
   * - 'detailed': Displays both the label and the value.
   */
  variant: T;

  /**
   * Event handler called when a Command Item is selected.
   * @param value
   * @returns void
   * @example variant = 'checkbox'
   * ```tsx
   * const handleItemSelect = (value: string[]) => {
   *   console.log(value);
   * };
   * ```
   *
   * @example variant !== 'checkbox'
   * ```tsx
   * const handleItemSelect = (value: string) => {
   *   console.log(value);
   * };
   * ```
   */
  onItemSelect: ItemSelectHandler<T>;

  /**
   * The current value of the checkbox used to filter Command Items
   */
  checkboxValue: string[];

  /**
   * Optional custom render function for item content.
   * When provided, replaces the default label text rendered inside each item.
   */
  renderItem?: (item: CommandItem) => React.ReactNode;
}
