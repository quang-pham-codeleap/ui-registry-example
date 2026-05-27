import { AlignVariant, PatternVariant } from './types';
import { FieldAriaProps, FormError } from '@/types';

/**
 * Interface for InputOTP component props
 */
export default interface IInputOTPProps extends FormError, FieldAriaProps {
  /**
   * The current value of the input
   */
  value?: string;

  /**
   * The maximum length of the OTP input
   * @default 6
   */
  maxLength?: number;

  /**
   * The number of digits per group
   * If not provided, all digits will be in one group when separator is false,
   * or each digit will be in its own group when separator is true
   */
  groupLength?: number;

  /**
   * An event that triggers when changing the value
   */
  onChange?: (newValue: string) => unknown;

  /**
   * The pattern to validate input against
   * Can be 'onlyChars', 'onlyDigits', or 'onlyDigitsAndChars'
   */
  pattern?: PatternVariant;

  /**
   * Whether to show separators between groups
   * @default false
   */
  separator?: boolean;

  /**
   * Description text to display below the input
   * @deprecated Use `<Field>` with `<FieldDescription>` instead. Will be removed in a future major version.
   */
  description?: string;

  /**
   * Whether the input is disabled
   * @default false
   */
  disabled?: boolean;

  /**
   * Label of the input
   * @deprecated Use `<Field>` with `<FieldLabel>` instead. Will be removed in a future major version.
   */
  label?: string;

  /**
   * The alignment style to apply to the component
   * @default left
   * - `left`: Aligns the content to the left
   * - `center`: Centers the content
   * - `right`: Aligns the content to the right
   */
  alignment?: AlignVariant;
}
