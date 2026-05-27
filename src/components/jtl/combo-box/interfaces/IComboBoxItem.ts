import { LucideIconName } from '../../icon';

/**
 * Interface representing a single combo box item in the ComboBox component.
 * Each combo box item represents an action or selectable option within a combo box group.
 */
export default interface IComboBoxItem {
  /**
   * Optional Lucide icon name to display alongside the combo box item
   * Helps with visual identification of the combo box item
   */
  icon?: LucideIconName;

  /**
   * The display text for the combo box item
   * Should be concise and clearly describe the action
   */
  label: string;

  /**
   * Optional shortcut text or ID displayed on the right side
   * Can be used for keyboard shortcuts, IDs, or other identifiers
   */
  shortcut?: string;

  /**
   * Function executed when the combo box item is selected
   * Should contain the action logic for this combo box item
   */
  onClick: () => void;

  /**
   * Optional boolean to disable the combo box item
   * When true, the item will be grayed out and cannot be selected
   */
  isDisabled?: boolean;
}
