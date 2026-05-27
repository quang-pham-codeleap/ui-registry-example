import React from 'react';
import type { FactoryOpts } from 'imask';
import { InputFile, InputType } from '../input';

/**
 * Type helper for determining the onChange handler based on input type.
 * Creates appropriate function signature for each input type.
 */
type SimpleInputOnChangeHandler<T extends InputType = InputType> = T extends 'file' ? (value: InputFile) => void : (value: string) => void;

/**
 * Props for the SimpleInput component.
 *
 * Unlike the legacy {@link IInputProps}, this interface contains NO layout props
 * (no `label`, `description`, `layout`). Layout is handled externally by {@link Field},
 * {@link FieldLabel}, and {@link FieldDescription}.
 */
export default interface ISimpleInputProps<T extends InputType = InputType>
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size' | 'className' | 'style' | 'onChange' | 'type' | 'readOnly' | 'disabled'> {
  /**
   * ID of the input element.
   */
  id?: string;

  /**
   * Type of the input element.
   * @default 'text'
   */
  type?: T;

  /**
   * Controlled value of the input.
   */
  value?: string;

  /**
   * Allows a browser to display an appropriate virtual keyboard.
   */
  inputMode?: React.InputHTMLAttributes<HTMLInputElement>['inputMode'];

  /**
   * Whether the input is disabled.
   */
  disabled?: boolean;

  /**
   * Whether the input should display a read-only state.
   * When true, the control becomes non-interactive.
   * If `disabled` is also true, `disabled` takes precedence.
   */
  readOnly?: boolean;

  /**
   * Name attribute of the input element.
   */
  name?: string;

  /**
   * Placeholder text shown when the input is empty.
   */
  placeholder?: string;

  /**
   * Maximum number of characters allowed.
   */
  maxLength?: number;

  /**
   * IMask mask definition. When provided, activates guided input masking.
   * Static chars are literal; `0`=required digit, `a`=required letter, `*`=required alphanumeric.
   *
   * When active, masking is IMask-managed:
   * - `maxLength` is ignored (mask controls input length)
   * - controlled `value` is not forwarded as a native input prop
   * - value updates are emitted via IMask accept events
   *
   * Prefer uncontrolled usage for masked inputs.
   * @example "(+49) 000-000-000"
   * @see https://imask.js.org/guide.html
   */
  mask?: FactoryOpts['mask'];

  /**
   * Browser autocomplete hint.
   */
  autoComplete?: string;

  /**
   * Visual size variant of the input.
   * @default 'default'
   */
  size?: 'default' | 'sm';

  /**
   * Whether the input is in an error state. Renders a red border.
   */
  isError?: boolean;

  /**
   * Callback when the value changes. Receives the string value (or FileList for file inputs).
   */
  onChange?: SimpleInputOnChangeHandler<T>;

  /**
   * Callback when the input receives focus.
   */
  onFocus?: (event?: React.FocusEvent) => void;

  /**
   * Callback when the input loses focus.
   */
  onBlur?: (event?: React.FocusEvent) => void;
}
