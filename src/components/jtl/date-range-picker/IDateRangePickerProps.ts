import { DateRange } from 'react-day-picker';
import { DatePickerBase } from '../date-picker/types';
import { FormError, FieldAriaProps } from '@/types';

/**
 * Props for DateRangePicker component
 */
interface IDateRangePickerProps extends DatePickerBase, FormError, FieldAriaProps {
  /**
   * Currently selected date range
   */
  value?: DateRange;

  /**
   * Callback when date range is selected
   */
  onChange?: (range: DateRange | undefined) => void;
}

export default IDateRangePickerProps;
