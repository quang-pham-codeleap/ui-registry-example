import { ColumnDefTemplate, HeaderContext } from '@tanstack/react-table';
import { ITableColumnProps } from '../../../table';
import { SortingState } from '../../types';

/**
 * Props for the table head content component
 */
export default interface ITableHeadContentProps<T extends object> {
  /**
   * Header definition
   */
  headerDef?: ColumnDefTemplate<HeaderContext<T, unknown>>;
  /**
   * Header context
   */
  headerContext: HeaderContext<T, unknown>;
  /**
   * Whether the column is a selection column
   */
  isSelectionColumn: boolean;
  /**
   * Whether the column is an action column
   */
  isActionColumn: boolean;
  /**
   * Whether the column is sortable
   */
  sorting?: SortingState;
  /**
   * Whether the column is sortable
   */
  isSorting: boolean;
  /**
   * Column alignment
   */
  columnAlign?: string;
  /**
   * Column definition
   */
  column?: ITableColumnProps<T>;
  /**
   * Whether the column action is enabled
   */
  columnActionEnabled?: boolean;
}
