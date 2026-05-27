import React from 'react';
import { IconType } from '../icon';
import { FormError } from '@/types';
import { InputFile, InputType } from './types';

/**
 * Type helper for determining the onChange handler based on input type
 * Creates appropriate function signature for each input type
 */
type InputOnChangeHandler<T extends InputType = InputType> = T extends 'file' ? (value: InputFile) => void : (value: string) => void;

/**
 * Props for the Input component
 */
export default interface IInputProps<T extends InputType = InputType>
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size' | 'className' | 'style' | 'onChange' | 'type' | 'readOnly' | 'disabled'>,
    FormError {
  /**
   * Layout of the input component
   * @deprecated Use `<Field orientation="horizontal">` with `<FieldLabel>` instead. Will be removed in a future major version.
   */
  layout?: 'horizontal' | 'vertical';

  /**
   * Label of the input component
   * @deprecated Use `<Field>` with `<FieldLabel>` instead. Will be removed in a future major version.
   */
  label?: string;

  /**
   * ID of the input component
   */
  id?: string;

  /**
   * Type of the input component
   */
  type?: T;

  /**
   * Value of the input component
   */
  value?: string;

  /**
   * This allows a browser to display an appropriate virtual keyboard
   */
  inputMode?: React.InputHTMLAttributes<HTMLInputElement>['inputMode'];

  /**
   * Description of the input component
   * @deprecated Use `<Field>` with `<FieldDescription>` instead. Will be removed in a future major version.
   */
  description?: string;

  /**
   * Whether the input is disabled
   */
  disabled?: boolean;

  /**
   * Whether the input should display a read-only state.
   * When true, the control becomes non-interactive.
   * If `disabled` is also true, `disabled` takes precedence.
   */
  readOnly?: boolean;

  /**
   * Name of the input component
   */
  name?: string;

  /**
   * Placeholder of the input component
   */
  placeholder?: string;

  /**
   * Callback function when the value changes
   */
  onChange?: InputOnChangeHandler<T>;

  /**
   * Callback function when the input is focused
   */
  onFocus?: (event?: React.FocusEvent) => void;

  /**
   * Callback function when the input is blurred
   */
  onBlur?: (event?: React.FocusEvent) => void;

  /**
   * Left icon of the input component
   */
  leftIcon?: IconType;

  /**
   * Right icon of the input component
   */
  rightIcon?: IconType;

  /**
   * Prefix of the input component
   */
  prefix?: string;

  /**
   * Suffix of the input component
   */
  suffix?: string;

  /**
   * Whether the input is grouped
   */
  isGroup?: boolean;

  /**
   * Whether the input is grouped on the right
   */
  isGroupRight?: boolean;

  /**
   * Notice of the input component
   */
  notice?: string;

  /**
   * Whether the notice is on the right
   */
  isNoticeRight?: boolean;

  /**
   * Maximum length of the input component
   */
  maxLength?: number;

  /**
   * Auto complete of the input component
   */
  autoComplete?: string;

  /**
   * Size of the input component
   * @default 'default'
   */
  size?: 'default' | 'sm';
}
