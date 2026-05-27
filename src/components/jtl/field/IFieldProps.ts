import React from 'react';
import { Control, ControllerFieldState, ControllerRenderProps, FieldPath, FieldValues } from 'react-hook-form';
import { Column } from '../grid/types';

/**
 * Props interface for the Field layout container.
 *
 * @interface IFieldProps
 * @template TFieldValues - The react-hook-form field values type
 * @template TName - The field name type (key of TFieldValues)
 */
export default interface IFieldProps<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
> {
  /**
   * The field content — typically `<FieldLabel>`, a `<FieldControl>`, and optionally
   * `<FieldDescription>` or `<ErrorMessage>`. Layout is controlled by the user via
   * `<Box>` or `<Grid>` wrappers inside children.
   */
  children?: React.ReactNode;

  /**
   * Number of columns to span when inside a `<FormGroup>` grid layout.
   * When provided, Field is wrapped in a `<GridCell>` component.
   *
   * @example `columnSpan={{ xs: 4, lg: 6 }}` — half width on desktop
   */
  columnSpan?: Column;

  /**
   * RHF field name — enables form integration when provided.
   *
   * When set, Field will:
   * - Provide `name` via FieldContext so `<FieldLabel>` auto-receives `htmlFor`
   * - Provide `field` and `fieldState` via FieldContext so `<FieldControl>`
   *   auto-injects RHF props into the wrapped form control
   *
   * The RHF control is resolved from the nearest `<FormProvider>` context
   * unless explicitly passed via the `control` prop.
   */
  name?: TName;

  /**
   * Explicit RHF control instance — auto-detected from `<FormProvider>` context
   * if omitted. Provide this prop when Field is used outside a `<FormProvider>`.
   *
   * @example
   * ```tsx
   * const { control } = useForm();
   * <Field name="email" control={control}>...</Field>
   * ```
   */
  control?: Control<TFieldValues>;

  /**
   * Layout orientation of the Field wrapper.
   *
   * - `'vertical'` (default): `flex flex-col` stack — label above control
   * - `'horizontal'`: CSS grid layout — control and label side by side
   *
   * @default 'vertical'
   */
  orientation?: 'vertical' | 'horizontal';

  /**
   * When `true`, passes `isLoading` into `FieldContext` so all `<FieldControl>`
   * descendants render a skeleton placeholder instead of the wrapped form control.
   *
   * Individual `<FieldControl isLoading>` props take precedence over this value.
   *
   * @default false
   */
  isLoading?: boolean;

  /**
   * Custom render function — replaces `children` as the content source.
   *
   * Works in both modes:
   * - **Form integration mode**: receives `field` and `fieldState` from RHF;
   *   result is wrapped in `<FormControl>` for ARIA wiring.
   * - **Composition mode**: `field` and `fieldState` are `undefined`;
   *   result is rendered as-is without layout wrapping.
   *
   * @example
   * ```tsx
   * <Field name="active" render={({ field }) => (
   *   <Switch checked={field?.value} onCheckedChange={field?.onChange} />
   * )} />
   * ```
   */
  render?: (props: { field?: ControllerRenderProps<TFieldValues, TName>; fieldState?: ControllerFieldState }) => React.ReactNode;
}
