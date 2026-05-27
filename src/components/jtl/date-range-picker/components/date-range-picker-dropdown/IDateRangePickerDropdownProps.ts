import React from 'react';
import { DateRange } from 'react-day-picker';
import DatePickerFooter from '../../../date-picker/types/DatePickerFooter';

/**
 * Props for the DateRangePickerDropdown component.
 * Receives all state and handlers from the parent DateRangePicker to render
 * the full dropdown panel (header, presets, inputs, calendar, footer).
 */
export default interface IDateRangePickerDropdownProps {
  /**
   * Optional content rendered above the calendar inside the dropdown.
   */
  header?: React.ReactNode;

  /**
   * Whether to show inline Von/Bis date inputs inside the dropdown.
   * @default false
   */
  hasInput: boolean;

  /**
   * Custom footer content. Accepts a static ReactNode or a render prop
   * receiving `{ onApply, onClear }`. When omitted, the default footer is shown.
   */
  footer?: React.ReactNode | ((ctx: DatePickerFooter) => React.ReactNode);

  /**
   * Date format string (date-fns tokens) for the inline inputs.
   */
  dateFormat: string;

  /**
   * The current date range value used to highlight the calendar selection.
   */
  calendarValue?: DateRange;

  /**
   * The month to display initially when the calendar first opens.
   */
  defaultMonth?: Date;

  /**
   * Index of the currently selected preset.
   */
  selectedPreset: number;

  /**
   * Index of the individual (custom) preset entry in the presets list.
   */
  individualPresetIndex: number;

  /**
   * Current string value for the "from" inline input.
   */
  fromInputValue: string;

  /**
   * Current string value for the "to" inline input.
   */
  toInputValue: string;

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
   * Handler called when a preset is clicked.
   */
  onPresetClick: (index: number) => void;

  /**
   * Handler called when a date range is selected in the calendar.
   * `triggerDate` is the raw clicked date before range swapping logic.
   */
  onCalendarChange: (range: DateRange | undefined, triggerDate: Date) => void;

  /**
   * Handler for "from" inline input value changes (receives string value directly).
   */
  onFromInputChange: (value: string) => void;

  /**
   * Handler for "to" inline input value changes (receives string value directly).
   */
  onToInputChange: (value: string) => void;

  /**
   * Handler called when the "from" inline input loses focus.
   */
  onFromInputBlur: () => void;

  /**
   * Handler called when the "to" inline input loses focus.
   */
  onToInputBlur: () => void;

  /**
   * Handler for the footer "clear" action.
   */
  onClear: () => void;

  /**
   * Handler for the footer "apply" action — commits the staged date range.
   */
  onApply: () => void;
}
