import React from 'react';
import { ComboBoxGroup, ComboBoxMode } from './types';
import { CommandItem } from '../command/types';

/**
 * Props interface for the ComboBox component.
 */
export default interface IComboBoxProps<T extends ComboBoxMode = ComboBoxMode> {
  /**
   * ===========================
   * Core Props
   * ===========================
   */

  /**
   * Placeholder text shown in the ComboBox input when empty
   * @default Search...
   */
  placeholder?: string;

  /**
   * Text displayed when no results match the current search
   * @default No results found for
   */
  noResultText?: string;

  /**
   * Mode of the ComboBox.
   * @default 'single'
   */
  mode?: T;

  /**
   * Array of ComboBox result groups to display.
   * Each group can have a label and contains multiple ComboBox items.
   */
  menuItems: ComboBoxGroup[];

  /**
   * Current search text value for the input field.
   * Use this for controlled component behavior together with onType.
   */
  value?: T extends 'single' ? string : string[];

  /**
   * Callback fired when the user selects an item
   * @param value The selected item values
   */
  onSelect?: (value: T extends 'single' ? string : string[]) => void;

  /**
   * Callback fired when the ComboBox menu is opened or closed
   * @param open Boolean indicating if the ComboBox menu is now open
   */
  onOpenChange?: (open: boolean) => void;

  /**
   * ===========================
   * State Props
   * ===========================
   */

  /**
   * If true, shows a loading spinner and indicates that content is loading
   * @default false
   */
  isContentLoading?: boolean;

  /**
   * Controls whether the ComboBox menu is open (for controlled components)
   */
  isOpen?: boolean;

  /**
   * If true, disables the ComboBox input and trigger
   * @default false
   */
  isDisabled?: boolean;

  /**
   * If true, shows a loading skeleton and indicates that trigger is loading
   * @default false
   */
  isLoading?: boolean;

  /**
   * ===========================
   * Accessibility Props
   * ===========================
   */

  /**
   * Custom ID for the trigger element, useful for accessibility and testing
   */
  triggerId?: string;

  /**
   * Custom ID for the content element, useful for accessibility and testing
   */
  contentId?: string;

  /**
   * Ref to access the ComboBox trigger button element
   */
  ref?: React.RefObject<HTMLButtonElement>;

  /**
   * ===========================
   * Customization Props
   * ===========================
   */

  /**
   * Optional custom render function for item content.
   * When provided, replaces the default label text in each dropdown item.
   * In multi mode, the checkbox prefix is preserved automatically.
   *
   * @example
   * ```tsx
   * renderItem={(item) => (
   *   <div className="flex items-center gap-2">
   *     <Avatar text={item.label} />
   *     <span>{item.label}</span>
   *   </div>
   * )}
   * ```
   */
  renderItem?: (item: CommandItem) => React.ReactNode;
}
