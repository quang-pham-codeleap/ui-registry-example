import React from 'react';
import { CommandVariant } from './types';
import { CommandGroup, CommandValue, ItemSelectHandler, SearchConfigHandler, SelectionConfigHandler, CommandItem } from './types';

/**
 * Interface of the Command Component
 */
export default interface ICommandProps<T extends CommandVariant = CommandVariant> {
  // -- Data

  /**
   * Array of Items to be displayed in the List
   * This is used for controlled mode
   */
  groups: CommandGroup<T>[];

  // -- State Management

  /**
   * The controlled state of the CommandInput value.
   * Should be used with the `onValueChange` prop to manage the value externally. (Controlled Mode)
   */
  value?: CommandValue<T>;

  /**
   * The value of the Command Input when it is initially rendered.
   * Use when you do not need to control its open state. (Uncontrolled Mode)
   */
  defaultValue?: string;

  // -- Behavior and Appearance

  /**
   * Controls the visual presentation of each item.
   * - 'simple': (Default) Displays only the label.
   * - 'detailed': Displays both the label and the value.
   * - 'card': Displays the label, value, and an Avatar.
   * - 'checkbox': Displays the label, value, and an Avatar.
   * @default 'simple'
   */
  variant?: T;

  /**
   * Controls whether the component automatically filters and sorts items based on the input.
   *
   * By default, this filters the input against the `value` attribute of each `CommandItem`.
   *
   * Set to `false` if you are providing your own pre-filtered list (e.g., for server-side search).
   * When `false`, the component will display the `groups` prop as-is.
   *
   * Note: Highlighting of matched text will still occur even if filtering is disabled.
   * @default true
   */
  shouldFilter?: boolean;

  /**
   * Custom Filter function to override the default filtering behavior.
   * It should be used when disabling `shouldFilter` to provide your own filtering logic.
   * It should return a number between 0 and 1, with 1 being the best match and 0 being hidden entirely.
   * By default, uses the `command-score` library to filter based on the search input against the `value` of a `CommandItem`.
   * @param value - The current value of the CommandInput
   * @param search - The search string to filter items against
   * @returns A number indicating the relevance of the item (lower means more relevant)
   */
  filter?: ((value: string, search: string) => number) | undefined;

  /**
   * Whether the Command should loop through items when navigating with keyboard
   * @default false
   */
  loop?: boolean;

  /**
   * Maximum length of the CommandInput value
   */
  maxLength?: number;

  /**
   * Placeholder text for the CommandInput
   */
  placeholder?: string;

  /**
   * Open the Command dropdown when the input is focused
   * @default false
   */
  openOnFocus?: boolean;

  /**
   * Delay in milliseconds for debouncing the input value changes.
   * This is expected to be used in conjunction with the `onDebouncedValueChange` prop.
   * @default 300
   */
  delay?: number;

  /**
   * The loading label to display while fetching results
   * @default 'Loading...'
   */
  loadingLabel?: string;

  /**
   * The Label to display when there is no results found
   * Can be either a static string or a function that receives the current input value
   * and returns a dynamic message based on what the user typed.
   *
   * @example Static message
   * noResultsLabel="Nothing found"
   *
   * @example Dynamic message based on input
   * noResultsLabel={(inputValue) => `No results for "${inputValue}"`}
   *
   * @default 'No results found.'
   */
  noResultsLabel?: string | ((inputValue: string) => string);

  /**
   * Show loading indicator when the user is typing.
   * This is useful for indicating the middle of the debounce period.
   * Note: This can be used in conjunction with `isLoading` for more granular control.
   * @default false
   */
  showLoadingOnType?: boolean;

  /**
   * If true, the Content section of the Command is hidden.
   * This can be useful when using the Command as a Popover with just the Input and the Select, with no Selectable Items.
   * @default false
   */
  hideContent?: boolean;

  /**
   * If true, shows a loading spinner and indicates that results are being fetched.
   * @default false
   */
  isLoading?: boolean;

  /**
   * If true, disables the Input and prevents user interaction.
   * @default false
   */
  isDisabled?: boolean;

  /**
   * Footer content to be displayed at the bottom of the Command
   */
  footer?: React.ReactNode;

  /**
   * Restricts the Command input to a specific input type.
   * Pass "number" to allow only numeric characters (digits, minus, decimal point).
   * Useful when the filter column has a numeric value type.
   */
  inputType?: React.HTMLInputTypeAttribute;

  /**
   * If true, renders the entire Command UI inline (no portal/dropdown).
   * If false, renders the input inline and content in a floating PopoverContent portal.
   * @default false
   */
  isPopover?: boolean;

  // -- Feature: Search Configuration

  /**
   * Optional handler for the Search Configuration feature.
   * It's intended to provide additional search options to the user.
   */
  searchConfig?: SearchConfigHandler;

  // -- Feature: Selection Configuration

  /**
   * Optional handler for the Selection Configuration feature.
   * It's intended to provide additional selection options to the user.
   * @param enabled - Whether the selection config is enabled
   * @param options - Array of options to be displayed in the selection config
   * @param onSelect - Optional callback function to be called when an item is selected
   * @param value - Optional current value of the selection config
   */
  selectionConfig?: SelectionConfigHandler;

  /**
   * Optional custom render function for item content.
   * When provided, replaces the default item text rendering in checkbox variant.
   * The checkbox prefix is always preserved.
   * Related to CP-1652: allows card-style visuals alongside checkbox selection.
   */
  renderItem?: (item: CommandItem) => React.ReactNode;

  // -- Event Handlers

  /**
   * Optional Callback fired when a Command Item is selected.
   * @param item
   * @returns void
   */
  onItemSelect?: ItemSelectHandler<T>;

  /**
   * Callback fired when the value of the CommandInput changes.
   * This should be used in conjunction with the `value` prop for Controlled Mode.
   * @param value - The new value of the CommandInput
   * @return void
   */
  onValueChange?: (value: string) => void;

  /**
   * Callback fired on debounced when the user types in the Input.
   * This should not be used as a replacement for `onValueChange`, but rather for
   * performing actions like fetching data based on user input with a delay.
   * @param text The current text value of the input
   */
  onDebouncedValueChange?: (text: string) => void;

  /**
   * Ref to access the Command container element
   */
  ref?: React.RefObject<HTMLDivElement>;
}
