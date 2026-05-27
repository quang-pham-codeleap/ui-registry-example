import IDropdownToggleOption from './IDropdownToggleOptionProps';

/**
 * Interface for dropdown toggle group
 */
export default interface IDropdownToggleGroupProps {
  /**
   * Callback function when an option is selected
   */
  onSelect: (option: IDropdownToggleOption) => void;

  /**
   * Array of toggle options
   */
  options: IDropdownToggleOption[];
}
