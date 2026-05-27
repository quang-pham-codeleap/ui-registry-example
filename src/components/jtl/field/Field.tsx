import React, { useCallback } from 'react';
import { ControllerRenderProps, FieldValues, FieldPath } from 'react-hook-form';
import { GridCell } from '../grid/components';
import IFieldProps from './IFieldProps';
import { Box } from '../box';
import { FormField, FormItem } from '../form/FormPrimitives';
import { cn } from '@/lib/utils';
import FieldContext from './context/FieldContext';
import { useOptionalFormContext } from '@/hooks';

/**
 * Field — context provider with optional react-hook-form integration.
 *
 * **Composition mode** (no `name` prop): renders a `flex flex-col gap` wrapper
 * and provides an empty FieldContext. Layout is fully user-controlled via
 * `<Box>` or `<Grid>` inside children.
 *
 * **Form integration mode** (`name` prop provided): wires RHF state into
 * FieldContext so descendants can consume it at any nesting depth:
 * - `<FieldLabel>` auto-receives `htmlFor={name}` from context
 * - `<FieldControl>` auto-injects `field` props + `id` + `error` into the wrapped control
 *
 * @param props {@link IFieldProps}
 * @returns The Field context provider with layout wrapper
 *
 * @example
 * ```tsx
 * // Basic composition
 * <Field>
 *   <FieldLabel htmlFor="card-name" required>Name on Card</FieldLabel>
 *   <FieldControl>
 *     <Input id="card-name" placeholder="Evil Rabbit" />
 *   </FieldControl>
 *   <FieldDescription>
 *     <Text type="muted">Enter your name as it appears on your card</Text>
 *   </FieldDescription>
 * </Field>
 * ```
 *
 * @example
 * ```tsx
 * // Form integration via FormProvider context
 * <Form form={form} onSubmit={onSubmit}>
 *   <Field name="email">
 *     <FieldLabel required>Email Address</FieldLabel>
 *     <FieldControl><Input type="email" /></FieldControl>
 *   </Field>
 * </Form>
 * ```
 *
 * @example
 * ```tsx
 * // Horizontal layout — label centers with input regardless of description/error below
 * <Field name="username">
 *   <Box className="grid grid-cols-[auto_1fr] gap-x-4 gap-y-1">
 *     <FieldLabel htmlFor="username" required className="self-center">Username</FieldLabel>
 *     <FieldControl><Input id="username" /></FieldControl>
 *     <FieldDescription className="col-start-2">Choose a unique username</FieldDescription>
 *   </Box>
 * </Field>
 * ```
 *
 * @example
 * ```tsx
 * // Grid alignment — user composes with Grid/GridCell
 * <Field name="email">
 *   <Grid columns={12}>
 *     <GridCell columnSpan={4}><FieldLabel>Email</FieldLabel></GridCell>
 *     <GridCell columnSpan={8}>
 *       <FieldControl><Input type="email" /></FieldControl>
 *     </GridCell>
 *   </Grid>
 * </Field>
 * ```
 *
 * @example
 * ```tsx
 * // Deep nesting — compound pattern works at any depth
 * <Field name="email">
 *   <Box className="custom-wrapper">
 *     <FieldLabel>Email</FieldLabel>
 *     <div>
 *       <FieldControl><Input type="email" /></FieldControl>
 *     </div>
 *   </Box>
 * </Field>
 * ```
 *
 * @example
 * ```tsx
 * // Custom render prop — full control, wrapped in FormControl (form integration)
 * <Field name="active" render={({ field }) => (
 *   <Switch checked={field?.value} onCheckedChange={field?.onChange} />
 * )} />
 * ```
 *
 */
const Field = <TFieldValues extends FieldValues = FieldValues, TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>>({
  children,
  columnSpan,
  name,
  control,
  render,
  orientation = 'vertical',
  isLoading,
}: IFieldProps<TFieldValues, TName>) => {
  /**
   * Try to read the RHF context control from the nearest FormProvider.
   * useFormContext throws when used outside a FormProvider. This call is
   * wrapped in a custom hook (useOptionalFormContext) so the try/catch lives
   * outside the component body — satisfying rules-of-hooks.
   */
  const formContext = useOptionalFormContext<TFieldValues>();

  /**
   * Resolve the RHF control: explicit prop takes precedence over context.
   * If neither is available, form integration is disabled.
   */
  const resolvedControl = control ?? formContext?.control;

  /**
   * Wraps content in GridCell when columnSpan is provided.
   * Enables responsive column spanning inside FormGroup.
   */
  const wrapWithGridCell = useCallback(
    (content: React.ReactNode) => {
      if (columnSpan) {
        return <GridCell columnSpan={columnSpan}>{content}</GridCell>;
      }
      return content;
    },
    [columnSpan],
  );

  /**
   * Compute the wrapper CSS class based on orientation and textAlign.
   * - vertical: simple flex-col stack (unchanged default behavior)
   * - horizontal: flex-row items-center
   */
  const wrapperClass = cn('flex', 'gap-2', orientation === 'horizontal' ? 'flex-row items-start' : 'flex-col');

  /**
   * Single return — FormField renders only when both `name` and `resolvedControl` are available.
   * When neither is present (composition mode), FieldContext still provides `name` for FieldLabel,
   * but `field` is undefined — sub-components check `field` directly, no explicit mode flag needed.
   */
  return wrapWithGridCell(
    name && resolvedControl ? (
      // Form integration mode: RHF wires field/fieldState into context for sub-components
      <FormField
        name={name}
        control={resolvedControl}
        render={({ field, fieldState }) => {
          if (render) {
            // Custom render: user has full control, wrap in FormItem for ARIA
            return <FormItem>{render({ field: field as ControllerRenderProps<TFieldValues, TName>, fieldState })}</FormItem>;
          }

          // Build context value for this render cycle.
          // Note: this object is recreated each render inside FormField's render prop,
          // which is expected — field/fieldState change on each form state update.
          return (
            <FormItem className={wrapperClass}>
              <FieldContext
                value={{
                  name: name as string,
                  field: field as Parameters<typeof FieldContext.Provider>[0]['value']['field'],
                  fieldState,
                  orientation,
                  isLoading,
                }}
              >
                {children}
              </FieldContext>
            </FormItem>
          );
        }}
      />
    ) : render ? (
      // Custom render in composition mode — no layout wrapper, no RHF wiring
      render({ field: undefined, fieldState: undefined })
    ) : (
      // Composition mode: context provides name (for FieldLabel htmlFor), field is undefined
      <FieldContext value={{ name: name as string | undefined, orientation, isLoading }}>
        <Box className={wrapperClass}>{children}</Box>
      </FieldContext>
    ),
  ) as React.ReactElement;
};

Field.displayName = 'Field';

export default Field;
