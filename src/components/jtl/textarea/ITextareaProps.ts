import { FieldAriaProps, FormError } from '@/types';
import React from 'react';

/** Properties from the native textarea element that we want to expose in our component */
type ExposedTextareaProps =
  | 'id'
  | 'value'
  | 'onChange'
  | 'onFocus'
  | 'onBlur'
  | 'placeholder'
  | 'required'
  | 'disabled'
  | 'maxLength'
  | 'name'
  | 'rows';

/**
 * Props interface for the Textarea component
 * @extends {Pick<React.ComponentProps<'textarea'>, ExposedTextareaProps>}
 */
export default interface ITextareaProps extends Pick<React.ComponentProps<'textarea'>, ExposedTextareaProps>, FormError, FieldAriaProps {
  /**
   * Label text to display above the textarea
   * @deprecated Use `<Field>` with `<FieldLabel>` instead. Will be removed in a future major version.
   */
  label?: string;
  /**
   * Description text to display below the textarea
   * @deprecated Use `<Field>` with `<FieldDescription>` instead. Will be removed in a future major version.
   */
  description?: string;
}
