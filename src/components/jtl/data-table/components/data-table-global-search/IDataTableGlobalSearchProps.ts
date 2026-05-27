import { IconType } from '../../../icon';

/**
 * Props for the DataTableSearching component
 */
export default interface IDataTableGlobalSearchProps {
  /**
   * Placeholder text for the search input
   */
  placeholder?: string;

  /**
   * Event that fires when the search text changes
   */
  onChange?: (searchText: string) => void;

  /**
   * Optional controlled value for the search input
   */
  value?: string;

  /**
   * search icon
   */
  searchIcon?: IconType;

  /**
   * Status of searching
   */
  isSearching?: boolean;
}
