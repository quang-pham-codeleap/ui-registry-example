import { DateRange, OnSelectHandler } from 'react-day-picker';
import ICalendarBaseProps from './ICalendarBaseProps';

/**
 * Props for the Calendar component with date range selection mode
 */
export default interface ICalendarRangeProps extends ICalendarBaseProps {
  /**
   * Mode for the calendar
   */
  mode?: 'range';

  /**
   * Selected date range
   */
  value?: DateRange;

  /**
   * Callback function to handle date selection
   */
  onChange?: OnSelectHandler<DateRange>;
}
