import { useFormContext, FieldValues } from 'react-hook-form';

/**
 * Safely wraps useFormContext so Field can be used outside a FormProvider.
 *
 * useFormContext throws when called outside a FormProvider. This custom hook
 * catches that error and returns undefined instead, allowing Field to degrade
 * gracefully to composition mode.
 *
 * @returns The RHF form context, or undefined if no FormProvider is present
 */
const useOptionalFormContext = <TFieldValues extends FieldValues>() => {
  try {
    return useFormContext<TFieldValues>();
  } catch {
    // No FormProvider in the tree — return undefined to disable form integration
    return undefined;
  }
};

export default useOptionalFormContext;
