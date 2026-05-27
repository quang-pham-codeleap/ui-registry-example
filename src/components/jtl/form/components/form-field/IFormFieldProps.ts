import { FormError } from '@/types';
import React from 'react';
import { ControllerProps, ControllerRenderProps, FieldPath, FieldValues, Path } from 'react-hook-form';

/**
 * Type definition for form field error handling.
 * This type is used to represent error messages associated with form fields.
 * It extends the functionality for usage with react-hook-form.
 */
interface FormFieldError<T extends FieldValues> extends ControllerRenderProps<T, Path<T>>, FormError {
  /**
   * A flag indicating whether the field is invalid.
   */
  'aria-invalid': 'true' | 'false';
}

/**
 * Props for the FormField component
 */
type IFormFieldProps<TFieldValues extends FieldValues, TName extends FieldPath<TFieldValues>> =
  | (Pick<ControllerProps<TFieldValues, TName>, 'name' | 'control' | 'render'> & { children?: never })
  | (Pick<ControllerProps<TFieldValues, TName>, 'name' | 'control'> & { children: React.ReactElement<FormFieldError<TFieldValues>>; render?: never });

export default IFormFieldProps;
