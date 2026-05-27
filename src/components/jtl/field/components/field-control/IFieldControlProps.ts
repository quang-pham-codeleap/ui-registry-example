import React from 'react';

/**
 * Props interface for the FieldControl sub-component.
 *
 * FieldControl is the explicit RHF injection wrapper in the compound pattern.
 * It reads RHF field props from FieldContext and injects them into the wrapped
 * form control child — at any nesting depth inside a `<Field>`.
 */
export default interface IFieldControlProps {
  /**
   * A single form control element (Input, Select, Textarea, Switch, etc.).
   * FieldControl clones this element and injects RHF props when in form integration mode.
   */
  children: React.ReactElement;

  /**
   * Optional class name to apply to the control.
   */
  className?: string;

  /**
   * When true, injects `required` onto the wrapped form control so that screen
   * readers announce the field as required even when the label's asterisk is
   * the only visual cue.
   */
  required?: boolean;

  /**
   * When `true`, renders a skeleton placeholder in place of the wrapped form control.
   *
   * This prop takes precedence over the `isLoading` value propagated via `FieldContext`
   * (i.e. from `<Field isLoading>`), allowing individual controls to opt in or out
   * of the loading state independently.
   */
  isLoading?: boolean;

  /**
   * Additional class names applied to the skeleton element rendered during loading.
   *
   * Use this to override the default height (`h-10`) for controls
   * that are taller than a standard input — e.g. Textarea, large Select variants.
   *
   * @example
   * ```tsx
   * // Textarea needs a taller skeleton
   * <FieldControl isLoading skeletonClassName="h-24">
   *   <Textarea />
   * </FieldControl>
   * ```
   */
  skeletonClassName?: string;
}
