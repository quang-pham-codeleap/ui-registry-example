import React from 'react';
import { CommandGroup, CommandItem, CommandVariant } from '../../types';

/**
 * Props for the CommandSelected component.
 * Renders the "Selected on top" layout for the checkbox variant:
 * a pinned "Selected" group followed by each source group with per-group Clear / Select-all controls.
 */
export default interface ICommandSelectedProps<T extends CommandVariant = CommandVariant> {
  /**
   * The currently selected values.
   */
  value: string[];

  /**
   * All groups of items to display.
   */
  groups: CommandGroup<T>[];

  /**
   * The current search input value. When non-empty the pinned "Selected" group is hidden.
   */
  inputValue: string;

  /**
   * Ref attached to the "Selected" section wrapper so the parent can compensate for its
   * height changes and prevent the list from jumping.
   */
  selectedGroupRef: React.RefObject<HTMLDivElement | null>;

  /**
   * Called when the CheckboxGroup value changes (item toggled).
   */
  onCheckboxGroupChange: (vals: (string | null)[]) => void;

  /**
   * Called when an individual item is clicked / activated.
   */
  onItemSelect: (item: CommandItem) => void;

  /**
   * Called when "Clear" on a specific group is clicked.
   */
  onGroupClear: (group: CommandGroup<T>) => void;

  /**
   * Called when "Select all" on a specific group is clicked.
   */
  onGroupSelectAll: (group: CommandGroup<T>) => void;

  /**
   * Called when the top-level "Clear" (deselect all) is clicked.
   */
  onClearAll: () => void;

  /**
   * Label to show when there are no results. Forwarded to CommandEmpty.
   */
  noResultsLabel?: string | ((inputValue: string) => string);

  /** Optional custom render function for item content. */
  renderItem?: (item: CommandItem) => React.ReactNode;
}
