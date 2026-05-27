import { DatePickerBase } from './types';
import { FormError, FieldAriaProps } from '@/types';

/**
 * Props for single date selection mode
 */
export default interface IDatePickerProps extends DatePickerBase, FormError, FieldAriaProps {
  /**
   * Currently selected date
   */
  value?: Date;

  /**
   * Callback when date is selected
   */
  onChange?: (date: Date | undefined) => void;

  /**
   * Whether the dropdown closes automatically when a date is selected (single DatePicker only).
   * Set to false when you want the user to confirm selection via a footer button.
   * @default true
   */
  closeOnSelect?: boolean;
}
