import React, { createContext } from 'react';
import { Slot } from '@radix-ui/react-slot';
import { Controller, ControllerProps, FieldPath, FieldValues, FormProvider } from 'react-hook-form';

import { cn } from '@/lib/utils';
import useFormField from './hooks/useFormField';

type FormFieldContextValue<TFieldValues extends FieldValues = FieldValues, TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>> = {
  name: TName;
};

/**
 * Carries the form-level disabled state so FieldControl can inject
 * `disabled` onto inputs without prop-drilling.
 * Default is `{ disabled: false }` — safe when FieldControl is used outside a Form.
 */
type FormStateContextValue = {
  /** True when the Form is explicitly disabled or in a loading state */
  disabled: boolean;
};

const FormStateContext = createContext<FormStateContextValue>({ disabled: false });

const FormFieldContext = createContext<FormFieldContextValue>({} as FormFieldContextValue);

const FormField = <TFieldValues extends FieldValues = FieldValues, TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>>({
  ...props
}: ControllerProps<TFieldValues, TName>) => {
  return (
    <FormFieldContext.Provider value={{ name: props.name }}>
      <Controller {...props} />
    </FormFieldContext.Provider>
  );
};

type FormItemContextValue = {
  id: string;
};

FormField.displayName = 'FormField';

const FormItemContext = createContext<FormItemContextValue>({} as FormItemContextValue);

const FormItem: React.FC<React.HTMLAttributes<HTMLDivElement> & React.RefAttributes<HTMLDivElement>> = ({ ref, className, ...props }) => {
  const id = React.useId();

  return (
    <FormItemContext.Provider value={{ id }}>
      <div ref={ref} className={cn('space-y-2', className)} {...props} />
    </FormItemContext.Provider>
  );
};
FormItem.displayName = 'FormItem';

const FormControl: React.FC<React.ComponentPropsWithRef<typeof Slot>> = ({ ref, ...props }) => {
  const { error, formItemId, formDescriptionId, formMessageId } = useFormField();

  return (
    <Slot
      ref={ref}
      id={formItemId}
      aria-describedby={!error ? `${formDescriptionId}` : `${formDescriptionId} ${formMessageId}`}
      aria-invalid={!!error}
      {...props}
    />
  );
};
FormControl.displayName = 'FormControl';

export { FormProvider, FormFieldContext, FormItemContext, FormItem, FormControl, FormField, FormStateContext };
