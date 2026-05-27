import { useContext } from 'react';
import { useFormContext, useFormState } from 'react-hook-form';

import { FormFieldContext, FormItemContext } from '../FormPrimitives';

const useFormField = () => {
  const fieldContext = useContext(FormFieldContext);
  const itemContext = useContext(FormItemContext);
  const { getFieldState, control } = useFormContext();

  // useFormState subscribes this hook to form state changes for the specific field.
  // This ensures the component re-renders (and aria-invalid updates) when validation errors change.
  const formState = useFormState({ control, name: fieldContext.name });
  const fieldState = getFieldState(fieldContext.name, formState);

  const { id } = itemContext;

  return {
    id,
    name: fieldContext.name,
    formItemId: `${id}-form-item`,
    formDescriptionId: `${id}-form-item-description`,
    formMessageId: `${id}-form-item-message`,
    ...fieldState,
  };
};

export default useFormField;
