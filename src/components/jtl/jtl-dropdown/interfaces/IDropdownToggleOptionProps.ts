import { LucideIconName } from '../../icon/IIconProps';

/**
 * Interface for dropdown toggle option
 */
export default interface IDropdownToggleOptionProps {
  /**
   * Optional label for the toggle option
   */
  label?: string;

  /**
   * Optional icon for the toggle option
   */
  icon?: LucideIconName;

  /**
   * Indicates if the option is selected
   */
  isSelected?: boolean;
}
