import { FormError } from '@/types';

/**
 * Props for the Calendar component
 */
export default interface ICalendarBaseProps extends FormError {
  /**
   * Number of displayed months
   */
  numberOfMonths?: number;

  /**
   * Default month to display
   */
  defaultMonth?: Date;

  /**
   * Disable specific dates
   */
  disableDate?: (date: Date) => boolean;

  /**
   * Layout of the calendar caption (header).
   * - `'label'`: Shows a plain text "Month Year" label (default)
   * - `'dropdown'`: Shows interactive dropdowns to select month and year directly
   *
   * When using `'dropdown'`, set `fromYear` and `toYear` to define the selectable year range.
   */
  captionLayout?: 'label' | 'dropdown';

  /**
   * The first selectable year in the year dropdown.
   * Only used when `captionLayout="dropdown"`.
   * Defaults to current year - 100.
   */
  fromYear?: number;

  /**
   * The last selectable year in the year dropdown.
   * Only used when `captionLayout="dropdown"`.
   * Defaults to current year + 10.
   */
  toYear?: number;
}
