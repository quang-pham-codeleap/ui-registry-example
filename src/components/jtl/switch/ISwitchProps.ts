import { ISwitchButtonProps } from './interfaces';
import { FormError } from '@/types';

/**
 * Props for the main Switch component
 */
export default interface ISwitchProps extends ISwitchButtonProps, FormError {
  /**
   * The label of the switch
   * @deprecated Use `<Field>` with `<FieldLabel>` instead. Will be removed in a future major version.
   */
  label?: string;

  /**
   * The description text that appears below the switch
   * @deprecated Use `<Field>` with `<FieldDescription>` instead. Will be removed in a future major version.
   */
  description?: string;

  /**
   * The text alignment of the label and description
   */
  textAlign?: 'left' | 'right';
}
