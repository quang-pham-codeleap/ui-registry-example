import { FormError } from '@/types';
import { CheckboxProps } from '@radix-ui/react-checkbox';

/**
 * Props for the Checkbox Indicator component. This component avoid to use className and style for styling to make the UI consistent across different components
 */
export default interface ICheckboxIndicatorProps
  extends Omit<CheckboxProps, 'asChild' | 'className' | 'style' | 'checked' | 'onCheckedChange' | 'value' | 'onChange'>,
    Pick<FormError, 'isError'> {
  /**
   * Whether the checkbox is checked or indeterminate
   */
  checked?: boolean;

  /**
   * Whether the checkbox is disabled
   */
  disabled?: boolean;

  /**
   * Whether the checkbox is checked by default
   */
  defaultChecked?: boolean;

  /**
   * Event handler for the checkbox change event
   */
  onChange?: (checked: boolean) => void;

  /**
   * If true, the checkbox will display in an indeterminate state.
   * This is visually distinct from the checked or unchecked state.
   * @default false
   */
  indeterminate?: boolean;
}
