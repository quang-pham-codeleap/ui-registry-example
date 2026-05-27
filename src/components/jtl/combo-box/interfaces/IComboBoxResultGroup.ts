import IComboBoxItem from './IComboBoxItem';

/**
 * Interface representing a group of combo box results
 * Used to organize combo box items into logical categories for display
 */
export default interface IComboBoxResultGroup {
  /**
   * Label displayed as the group header
   * Should be short and descriptive of the category of items
   */
  label: string;

  /**
   * Array of combo box items belonging to this group
   * All items will be displayed under the group's label
   */
  items: IComboBoxItem[];
}
