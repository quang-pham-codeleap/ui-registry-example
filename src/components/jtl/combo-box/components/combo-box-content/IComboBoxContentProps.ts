import { CommandGroup } from '../../../command/types';

/**
 * Props interface for the ComboBoxContent component.
 */
export interface IComboBoxContentProps {
  /**
   * Placeholder text shown in the search input when empty
   * @default "Search..."
   */
  placeholder?: string;

  /**
   * Current search text value for controlled component behavior
   */
  value?: string[];

  /**
   * Callback fired when the user selects an item
   * @param value The selected item values
   */
  onItemSelect: (value: (string | null)[]) => void;

  /**
   * Maximum character length for the search input
   */
  maxLength?: number;

  /**
   * React nodes to display as combo box items
   * Typically contains ComboBoxResult components
   */
  displayItems: CommandGroup[];

  /**
   * If true, shows a loading spinner and indicates that results are being fetched
   * @default false
   */
  isLoading?: boolean;

  /**
   * Text displayed when no results match the current search
   * @default No results found for
   */
  noResultText: string;

  /**
   * If true, enables client-side filtering of combo box items
   * Set to false if you're handling filtering externally
   * @default true
   */
  shouldFilter?: boolean;
}

export default IComboBoxContentProps;
