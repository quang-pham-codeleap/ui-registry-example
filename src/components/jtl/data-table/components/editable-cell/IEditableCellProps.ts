import React from 'react';
import { EditableCellEditor, CellEditValue, DateRangeValue } from '../../types';

/**
 * Props for the EditableCell component
 */
export default interface IEditableCellProps extends React.PropsWithChildren {
  /**
   * The current value of the cell
   * - text: string
   * - date: string (formatted date) or Date
   * - dateRange: string (formatted) or DateRangeValue
   */
  value: string | Date | DateRangeValue;
  /**
   * Whether this cell is editable
   */
  isEditable: boolean;
  /**
   * The type of editor to use
   * @default 'text'
   */
  editorType?: EditableCellEditor;
  /**
   * Date format string (for 'date' and 'dateRange' editor types)
   * @default 'dd.MM.yyyy'
   */
  dateFormat?: string;
  /**
   * Callback when save is triggered (blur or Enter)
   * Value type depends on editor type:
   * - text: string
   * - date: Date
   * - dateRange: DateRangeValue
   */
  onSave: (newValue: CellEditValue) => void;
}
