import { CellEditValue } from './EditableConfig';

/**
 * Handler type for editable cell feature.
 *
 * Cell editability is controlled at the column level via the `editable` property
 * in column definitions. This handler provides the save callback.
 *
 * @template T - The type of the data record
 *
 * @example
 * const columns = [
 *   { dataIndex: 'name', title: 'Name', editable: true },
 *   { dataIndex: 'birthDate', title: 'Birth Date', editable: { type: 'date' } },
 *   { dataIndex: 'period', title: 'Period', editable: { type: 'dateRange' } },
 * ];
 *
 * const cellEdit: CellEditHandler<Person> = {
 *   onSave: (columnKey, record, newValue, rowIndex) => {
 *     console.log(newValue);
 *   },
 * };
 */
type CellEditHandler<T extends object> = {
  /**
   * Callback when a cell value is saved
   * @param columnKey - The key of the column
   * @param record - The data record of the row
   * @param newValue - The new value (type depends on editor: string | Date | DateRangeValue)
   * @param rowIndex - The index of the row
   */
  onSave: (columnKey: keyof T, record: T, newValue: CellEditValue, rowIndex: number) => void;
};

export default CellEditHandler;
