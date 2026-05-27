import SortDirection from './SortDirection';

/**
 * Sorting state for the table
 */
type SortingState = {
  /**
   * Column key to sort by
   */
  columnKey: string;
  /**
   * Sorting direction
   */
  direction: SortDirection;
};

export default SortingState;
