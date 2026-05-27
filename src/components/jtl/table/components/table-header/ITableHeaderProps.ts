import { ITableColumnProps } from '../../interfaces';

export default interface ITableHeaderProps<T extends object> {
  /**
   * Column definitions for the table
   */
  columns: ITableColumnProps<T>[];

  /**
   * Whether to show column separator
   */
  hasColumnSeparator: boolean;

  /**
   * Whether the table has expandable rows (adds empty header cell for expand column)
   */
  hasExpandableRows?: boolean;
}
