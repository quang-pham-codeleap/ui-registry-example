import React from 'react';

/**
 * Props interface for the FieldLabel sub-component.
 *
 * FieldLabel is a context-aware label for the compound pattern.
 * When inside a `<Field name="...">`, it auto-reads `htmlFor` from context.
 * It handles label styling (required indicator, disabled/error states)
 * while the user controls the label content and layout via Box/Grid.
 */
export default interface IFieldLabelProps extends React.PropsWithChildren {
  /**
   * Associates the label with a form control via its `id`.
   * Maps to the HTML `for` attribute on the underlying `<label>` element.
   *
   * When inside a `<Field name="...">`, this is auto-injected from context.
   * Providing this prop explicitly overrides the context value.
   */
  htmlFor?: string;

  /**
   * When true, displays a red asterisk (*) after the label content.
   * @default false
   */
  required?: boolean;

  /**
   * When true, applies disabled styling (reduced opacity, not-allowed cursor).
   * @default false
   */
  disabled?: boolean;

  /**
   * When true, applies error styling (danger text color).
   * @default false
   */
  isError?: boolean;

  /**
   * Right-aligned content displayed on the opposite side of the label text.
   * Useful for secondary actions like "Forgot password?", character counters,
   * or "Optional" badges.
   *
   * When provided, FieldLabel renders as a full-width row with the label on the
   * left and the extra content on the right.
   *
   * @example
   * ```tsx
   * <FieldLabel htmlFor="password" required extra={<Link url="#">Forgot password?</Link>}>
   *   Password
   * </FieldLabel>
   * ```
   */
  extra?: React.ReactNode;

  /**
   * Additional CSS class names to apply to the label element.
   */
  className?: string;
}
