/**
 * Editor types supported for editable cells
 */
export type EditableCellEditor = 'text' | 'date' | 'dateRange';

/**
 * Date range value type (compatible with react-day-picker's DateRange)
 */
export type DateRangeValue = {
  from?: Date;
  to?: Date;
};

/**
 * Value types for each editor type
 */
export type CellEditValueMap = {
  text: string;
  date: Date;
  dateRange: DateRangeValue;
};

/**
 * Union of all possible cell edit values
 */
export type CellEditValue = string | Date | DateRangeValue;

/**
 * Configuration for editable cell editor
 */
export type EditableConfig = {
  /**
   * The type of editor to use
   * @default 'text'
   */
  type: EditableCellEditor;

  /**
   * Date format string (for 'date' and 'dateRange' types)
   * @default 'dd.MM.yyyy'
   */
  dateFormat?: string;
};

/**
 * Value type for column editable property
 * Can be:
 * - boolean: true enables text editing, false disables
 * - EditableConfig: object with editor configuration
 * - function: returns boolean or EditableConfig based on record/rowIndex
 */
export type EditableValue<T> = boolean | EditableConfig | ((record: T, rowIndex: number) => boolean | EditableConfig);

export default EditableConfig;
