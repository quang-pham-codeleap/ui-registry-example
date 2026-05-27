import { RowsSelectionMenuItem } from '../../types';

/**
 * Interface for row actions
 */
export default interface IDataTableSelectedActionProps<T> {
  /**
   * Selected rows
   */
  selectedRows: T[];

  /**
   * Row actions
   */
  rowActions: RowsSelectionMenuItem<T>[];
}
