import { useContext } from 'react';
import { cn } from '@/lib/utils';
import IFieldDescriptionProps from './IFieldDescriptionProps';
import { Label } from '../../../label';
import { FormItemContext } from '../../../form/FormPrimitives';

/**
 * FieldDescription — description slot for the Field composition pattern.
 *
 * Provides the description container layout while the user controls the content.
 * Used inside `<Field>` as a sibling to the form control and `<FieldLabel>`.
 *
 * When used inside a `<Field name="...">` (form integration mode), the `id` is
 * auto-assigned from `FormItemContext` as `${formItemId}-form-item-description`,
 * matching the `aria-describedby` value that `FormControl` injects onto the input.
 * An explicit `id` prop always takes precedence over the auto-assigned one.
 */
const FieldDescription = ({ children, id, className }: IFieldDescriptionProps) => {
  // Auto-wire id to match what FormControl sets in aria-describedby.
  // FormItemContext defaults to {} when outside a FormItem, so id will be undefined
  // and autoId will be undefined — safe to use in standalone / composition mode.
  const { id: formItemId } = useContext(FormItemContext);
  const autoId = formItemId ? `${formItemId}-form-item-description` : undefined;
  const resolvedId = id ?? autoId;

  return (
    <Label variant="subtitle" id={resolvedId} className={cn(className)}>
      {children}
    </Label>
  );
};

FieldDescription.displayName = 'FieldDescription';

export default FieldDescription;
