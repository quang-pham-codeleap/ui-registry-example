/**
 * Props for DatePickerInput component
 */
export default interface IDatePickerInputProps {
  /**
   * Date format pattern
   */
  dateFormat: string;

  /**
   * Single mode input value
   */
  inputValue?: string;

  /**
   * Handler for single mode input change
   */
  onInputChange?: (value: string) => void;

  /**
   * Handler for single mode input blur
   */
  onInputBlur?: () => void;

  /**
   * Whether to auto-focus the input on mount.
   * Defaults to false to avoid stealing focus from sibling controls (e.g. operator Select).
   */
  autoFocus?: boolean;
}
