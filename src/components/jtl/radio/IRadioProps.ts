import { FormError } from '@/types';
import { RadioOption } from './types';

/**
 * Props interface for the Radio component
 */
export default interface IRadioProps extends FormError {
  /**
   * Array of radio options to display
   */
  options: RadioOption[];
  /**
   * Whether the radio group is disabled
   */
  disabled?: boolean;

  /**
   * The default value of the radio group
   * @default undefined
   */
  defaultValue?: string | number;

  /**
   * The currently selected value
   */
  value?: string | number;

  /**
   * Whether the radio group has a border
   */
  hasBorder?: boolean;

  /**
   * Callback function to handle value changes
   * @param value - The new value selected
   * @returns void
   */
  onChange?: (value: string | number) => void;
}
