import React from 'react';
import { FormField as FormFieldWrapper, FormControl, FormItem } from '../../FormPrimitives';
import { FieldValues, FieldPath } from 'react-hook-form';
import IFormFieldProps from './IFormFieldProps';

/**
 * FormField component that wraps a form control with proper accessibility and validation
 * @param props {@link IFormFieldProps} - Props for the FormField component
 * @template TFieldValues - The form values type
 * @template TName - The form field name type
 * @returns The rendered FormField component
 * @deprecated This component is deprecated and will be removed in a future release. Please use the new Field component instead.
 *
 * @example
 * ```tsx
 * <FormField name="email" control={control}>
 *   <Input label="Email" type="email" placeholder="Enter your email" />
 * </FormField>
 * ```
 */
const FormField = <TFieldValues extends FieldValues = FieldValues, TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>>({
  name,
  control,
  ...props
}: IFormFieldProps<TFieldValues, TName>) => {
  if (props.render) {
    return (
      <FormFieldWrapper
        name={name}
        control={control}
        render={(...renderProps) => {
          return <FormItem>{props.render(...renderProps)}</FormItem>;
        }}
      />
    );
  }

  if (props.children) {
    return (
      <FormFieldWrapper
        name={name}
        control={control}
        render={({ field, fieldState }) => (
          <FormItem>
            <FormControl>
              {/* Clone the child element and pass the field props to it */}
              {React.cloneElement(props.children, {
                ...field,
                'aria-invalid': fieldState.invalid ? 'true' : 'false',
                errorMessage: fieldState.error?.message,
              })}
            </FormControl>
          </FormItem>
        )}
      />
    );
  }
};

export default FormField;
