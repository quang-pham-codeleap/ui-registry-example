import { DateRange } from 'react-day-picker';

/**
 * Props for the DatePicker component
 */
type DatePickerHandler<M extends 'single' | 'range' = 'range'> = {
  /**
   * If true, shows a date picker on the table top action bar
   */
  enabled: boolean;

  /**
   * Mode of the date picker
   * @default 'range'
   */
  mode?: M;

  /**
   * Currently selected date range
   */
  value?: M extends 'single' ? Date : DateRange;

  /**
   * Placeholder text for the trigger button
   * @default Datum auswählen
   */
  placeholder?: string;

  /**
   * If true, disables the date picker
   * @default false
   */
  isDisabled?: boolean;

  /**
   * Function to disable specific dates
   */
  disableDate?: (date: Date) => boolean;

  /**
   * Date format pattern for display and input
   * Uses date-fns format tokens
   * @default dd / MM /yyyy
   * @example "yyyy/MM/dd" - displays as 2025/11/27
   * @example "MM-dd-yyyy" - displays as 11-27-2025
   * @see https://date-fns.org/docs/format
   */
  format?: string;

  /**
   * Callback function to be called when the date range changes
   */
  onChange: (value: M extends 'single' ? Date : DateRange) => void;
};

export default DatePickerHandler;
