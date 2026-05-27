import React, { useContext } from 'react';
import IFieldControlProps from './IFieldControlProps';
import { FormControl, FormItemContext, FormStateContext } from '../../../form/FormPrimitives';
import { ErrorMessage } from '../../../error-message';
import { Box } from '../../../box';
import { cn } from '@/lib';
import { useFieldContext } from '../../hooks';
import { Skeleton as BaseSkeleton } from '../../../skeleton/SkeletonPrimitive';

/**
 * FieldControl — explicit RHF injection wrapper for the compound pattern.
 *
 * Reads RHF field props (value, onChange, onBlur, ref, name) and fieldState
 * from the nearest `<Field>` context and clones them into the wrapped child.
 *
 * **Why this exists:**
 * The old composition pattern used `React.Children.map` + `React.cloneElement`
 * with `displayName` checks to inject props into direct children only.
 * FieldControl replaces that fragile approach — it works at any nesting depth
 * because it reads from React context instead of scanning the child tree.
 *
 * **Injection rules:**
 * - In composition mode (no `name` / no `FormProvider`): renders child as-is.
 * - In form integration mode: spreads all RHF `field` props into the child,
 *   then sets `id={name}` (unless already set) and `isError={true}` (when invalid).
 */
const FieldControl = ({ children, className, required, isLoading: ownIsLoading, skeletonClassName }: IFieldControlProps) => {
  const { field, fieldState, name, isLoading: contextIsLoading } = useFieldContext();

  // Own prop takes precedence over context value — allows opting individual controls
  // in/out of loading state independently of the parent <Field isLoading>.
  const effectiveIsLoading = ownIsLoading ?? contextIsLoading;

  // Read FormItemContext to get the auto-generated id for this form item.
  // FormItemContext defaults to {} outside a FormItem, so id will be undefined — safe.
  const { id: formItemId } = useContext(FormItemContext);
  // Read form-level disabled state. Defaults to false when used outside a Form — safe.
  const { disabled: formDisabled } = useContext(FormStateContext);
  // Compute the message id that FormControl sets in aria-describedby on error,
  // so ErrorMessage can carry the matching id and screen readers can resolve the link.
  const formMessageId = formItemId ? `${formItemId}-form-item-message` : undefined;

  // Loading state — render skeleton in place of the control regardless of RHF wiring.
  // Hides stale errors while data is being fetched.
  // aria-busy signals to screen readers that the region content is loading.
  if (effectiveIsLoading) {
    return (
      <Box aria-busy={true} className={cn(className)}>
        <BaseSkeleton className={cn('h-10 w-full rounded-[var(--border-radius-md)]', skeletonClassName)} />
      </Box>
    );
  }

  // No RHF wiring — render child as-is (composition mode or standalone usage)
  // Still inject `required` and `disabled` from form state when applicable.
  if (!field) {
    const standaloneProps: Record<string, unknown> = {
      ...(required ? { required: true } : {}),
      // Propagate form-level disabled so standalone inputs also respect the form state
      ...(formDisabled ? { disabled: true } : {}),
    };
    const hasStandaloneProps = Object.keys(standaloneProps).length > 0;
    return <Box className={cn(className)}>{hasStandaloneProps ? React.cloneElement(children, standaloneProps) : children}</Box>;
  }

  const childProps = children.props as Record<string, unknown>;

  // Build the additional props to inject — typed as Record to allow dynamic keys
  const injectedProps: Record<string, unknown> = {
    // Spread all RHF field props (value, onChange, onBlur, ref, name)
    ...field,
    // Only set id if not already provided by the user
    ...(childProps.id === undefined ? { id: name } : {}),
    // Only inject isError when truly invalid — guard checks isError (not the old `error` prop)
    ...(childProps.isError === undefined && fieldState?.error ? { isError: true } : {}),
    // Inject required if explicitly set on FieldControl
    ...(required && childProps.required === undefined ? { required: true } : {}),
    // Propagate form-level disabled; child's own disabled prop takes precedence
    ...(formDisabled && childProps.disabled === undefined ? { disabled: true } : {}),
  };

  // FormControl (Radix Slot) injects aria-describedby and aria-invalid onto
  // the actual form control. cloneElement adds RHF field props + id + error.
  // Radix Slot merges: child props win for id (keeps name-based id), Slot wins
  // for aria-describedby/aria-invalid (child doesn't have those props).
  return (
    <Box className={cn('flex flex-col gap-2', className)}>
      <FormControl>{React.cloneElement(children, injectedProps)}</FormControl>
      {/* Pass formMessageId so aria-describedby on the control resolves to this element */}
      {fieldState?.error?.message && <ErrorMessage id={formMessageId} message={fieldState.error?.message} />}
    </Box>
  );
};

FieldControl.displayName = 'FieldControl';

export default FieldControl;
