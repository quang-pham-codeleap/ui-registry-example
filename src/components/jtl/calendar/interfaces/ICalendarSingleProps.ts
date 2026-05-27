import { OnSelectHandler } from 'react-day-picker';
import ICalendarBaseProps from './ICalendarBaseProps';

/**
 * Props for the Calendar component with single date selection mode
 */
export default interface ICalendarSingleProps extends ICalendarBaseProps {
  /**
   * Mode for the calendar
   */
  mode?: 'single';

  /**
   * Selected date
   */
  value?: Date;

  /**
   * Callback function to handle date selection
   */
  onChange?: OnSelectHandler<Date>;
}
