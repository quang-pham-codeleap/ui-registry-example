import type { ITableColumnProps, ITableExpandableProps } from '../../interfaces';
import { TableSize } from '../../types';

/**
 * Props interface for a single table row component
 */
export default interface ITableRowProps<T extends object> {
  /**
   * Column definitions for the table
   */
  columns: ITableColumnProps<T>[];

  /**
   * Whether to show column separator
   */
  hasColumnSeparator?: boolean;

  /**
   * Size of the table
   */
  size?: TableSize;

  /**
   * Callback function to be called when a row is clicked
   */
  onRowClick?: (record: T) => void;

  /**
   * Configuration for expandable rows
   */
  expandable?: ITableExpandableProps<T>;

  /**
   * The data record for this row
   */
  record: T;

  /**
   * The index of this row in the table
   */
  rowIndex: number;
}
