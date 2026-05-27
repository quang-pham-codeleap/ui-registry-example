/**
 * Props for DatePickerInput component
 */
export default interface IDatePickerInputProps {
  /**
   * Date format pattern
   */
  dateFormat: string;

  /**
   * Range mode "from" input value
   */
  inputFromValue?: string;

  /**
   * Range mode "to" input value
   */
  inputToValue?: string;

  /**
   * Handler for range mode "from" input change
   */
  onInputFromChange?: (value: string) => void;

  /**
   * Handler for range mode "to" input change
   */
  onInputToChange?: (value: string) => void;

  /**
   * Handler for range mode "from" input blur
   */
  onInputFromBlur?: () => void;

  /**
   * Handler for range mode "to" input blur
   */
  onInputToBlur?: () => void;

  /**
   * Whether to auto-focus the "from" input on mount.
   * Defaults to false to avoid stealing focus from sibling controls (e.g. operator Select).
   */
  autoFocus?: boolean;
}
