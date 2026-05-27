import { ITableColumnProps } from '../../../table/interfaces';

/**
 * Props for the DataTableColumnSelector component
 */
export default interface IDataTableColumnSelectorProps<T extends object> {
  /**
   * Selected columns
   * @example
   * ```tsx
   * const selectedColumns = [
   *   {
   *     title: 'Name',
   *     dataIndex: 'name',
   *     key: 'name',
   *   },
   * ];
   * ```
   */
  value?: ITableColumnProps<T>[];

  /**
   * Event that fires when the selected columns change
   * @param columns - The selected columns
   * @example
   * ```tsx
   * const onColumnSelect = (columns: ITableColumnProps<T>[]) => {
   *   setSelectedColumns(columns);
   * };
   * ```
   */
  onChange?: (columns: ITableColumnProps<T>[]) => void;
}
