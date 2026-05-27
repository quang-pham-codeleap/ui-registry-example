import React from 'react';
import DatePickerFooter from '../../types/DatePickerFooter';

/**
 * Props for the DatePickerDropdown component.
 * Receives all state and handlers from the parent DatePicker to render
 * the calendar panel (header, inline input, calendar, footer).
 */
export default interface IDatePickerDropdownProps {
  /**
   * Optional content rendered above the calendar inside the dropdown.
   */
  header?: React.ReactNode;

  /**
   * Whether to show an inline date input field inside the dropdown.
   * @default false
   */
  hasInput: boolean;

  /**
   * Custom footer content. Accepts a static ReactNode or a render prop
   * receiving `{ onApply, onClear }`.
   */
  footer?: React.ReactNode | ((ctx: DatePickerFooter) => React.ReactNode);

  /**
   * Date format string (date-fns tokens) used for the inline input label.
   */
  dateFormat: string;

  /**
   * Current string value shown in the inline input.
   */
  inputValue: string;

  /**
   * The parsed Date from the inline input (null when input is empty/invalid).
   */
  parsedInputDate: Date | null;

  /**
   * The month to display initially when the calendar first opens.
   */
  defaultMonth?: Date;

  /**
   * React key for the Calendar — changes force the calendar to re-mount
   * when the selected date changes externally.
   */
  calendarKey: string | number;

  /**
   * Layout of the calendar header.
   * - `'dropdown'`: Shows interactive dropdowns to jump directly to any month/year (default)
   * - `'label'`: Shows a plain text "Month Year" label with prev/next navigation only
   *
   * Use `'label'` if you want to avoid the implicit year-range restriction that comes
   * with `'dropdown'` mode, or if you do not need fast year navigation.
   * @default 'dropdown'
   */
  captionLayout?: 'label' | 'dropdown';

  /**
   * Earliest year shown in the calendar year dropdown (captionLayout="dropdown").
   * @default currentYear - 100
   */
  fromYear?: number;

  /**
   * Latest year shown in the calendar year dropdown (captionLayout="dropdown").
   * @default currentYear + 10
   */
  toYear?: number;

  /**
   * Optional function to disable specific dates in the calendar.
   */
  disableDate?: (date: Date) => boolean;

  /**
   * Handler for inline input value changes (receives the string value directly).
   */
  onInputChange: (value: string) => void;

  /**
   * Handler called when the inline input loses focus — validates and commits the date.
   */
  onInputBlur: () => void;

  /**
   * Handler called when a date is selected in the calendar.
   */
  onCalendarChange: (date: Date | undefined) => void;

  /**
   * Handler for the footer "apply" action — validates input and commits the date.
   */
  onApply: () => void;

  /**
   * Handler for the footer "clear" action — clears the selection and closes the dropdown.
   */
  onClear: () => void;
}
