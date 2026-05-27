import DatePickerHandler from '../../types/DatePickerHandler';

/**
 * Props for the DataTableDatePicker component.
 * Inherits from DatePickerHandler but excludes the 'enabled' prop since
 * the component is only rendered when enabled.
 */
export default interface IDataTableDatePickerProps<M extends 'single' | 'range' = 'range'> extends Omit<DatePickerHandler<M>, 'enabled'> {}
