import { FieldValues, ArrayPath } from 'react-hook-form';
import IFieldArrayProps from './IFieldArrayProps';
import { FieldArrayInner } from './components';
import { useOptionalFormContext } from '@/hooks';

/**
 * FieldArray component for managing dynamic field lists.
 * Wraps react-hook-form's useFieldArray with user-friendly API.
 * Supports nested arrays and Zod validation.
 *
 * **Usage Modes:**
 * 1. Inside Form (Recommended) - Automatically uses FormProvider context
 * 2. Outside Form with explicit control
 *
 * @param props {@link IFieldArrayProps} - Props for the FieldArray component
 * @returns The FieldArray component
 *
 * @example
 * ```tsx
 * // Inside Form (Recommended) - No control prop needed
 * <Form form={form} onSubmit={onSubmit}>
 *   <FieldArray name="emails">
 *     {({ fields, append, remove }) => (
 *       <>
 *         {fields.map((field, index) => (
 *           <div key={field.id}>
 *             <Field name={`emails.${index}`}>
 *               <FieldLabel>Email {index + 1}</FieldLabel>
 *               <FieldControl><Input type="email" /></FieldControl>
 *             </Field>
 *             <Button onClick={() => remove(index)}>Remove</Button>
 *           </div>
 *         ))}
 *         <Button onClick={() => append('')}>Add Email</Button>
 *       </>
 *     )}
 *   </FieldArray>
 * </Form>
 * ```
 *
 * @example
 * ```tsx
 * // Outside Form - Explicit control required
 * <FieldArray name="emails" control={form.control}>
 *   {({ fields, append, remove }) => (
 *     // ... field rendering logic
 *   )}
 * </FieldArray>
 * ```
 *
 * @example
 * ```tsx
 * // Nested arrays
 * <FieldArray name="departments">
 *   {({ fields: departments, append: appendDept, remove: removeDept }) => (
 *     <>
 *       {departments.map((dept, deptIndex) => (
 *         <div key={dept.id}>
 *           <Field name={`departments.${deptIndex}.name`}>
 *             <FieldLabel>Department</FieldLabel>
 *             <FieldControl><Input /></FieldControl>
 *           </Field>
 *           <FieldArray name={`departments.${deptIndex}.teams`}>
 *             {({ fields: teams, append: appendTeam, remove: removeTeam }) => (
 *               // ... nested teams rendering
 *             )}
 *           </FieldArray>
 *         </div>
 *       ))}
 *     </>
 *   )}
 * </FieldArray>
 * ```
 */
const FieldArray = <TFieldValues extends FieldValues = FieldValues, TName extends ArrayPath<TFieldValues> = ArrayPath<TFieldValues>>({
  name,
  control: controlProp,
  children,
  defaultValue,
  min,
  max,
  disabled = false,
}: IFieldArrayProps<TFieldValues, TName>) => {
  /**
   * Try to get control from FormProvider context first.
   * Falls back to explicit control prop if not inside a Form.
   */
  const contextControl = useOptionalFormContext<TFieldValues>()?.control;

  // Use context control if available, otherwise fall back to prop
  const control = contextControl ?? controlProp;

  // Guard: control is required before rendering FieldArrayInner (which calls useFieldArray).
  // This check is intentionally in the outer shell so hooks are never called conditionally.
  if (!control) {
    console.error('FieldArray requires either being inside a Form component or receiving a control prop');
    return null;
  }

  return (
    <FieldArrayInner name={name} control={control} defaultValue={defaultValue} min={min} max={max} disabled={disabled}>
      {children}
    </FieldArrayInner>
  );
};

FieldArray.displayName = 'FieldArray';

export default FieldArray;
