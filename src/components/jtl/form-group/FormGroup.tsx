import React from 'react';
import IFormGroupProps from './IFormGroupProps';
import { Grid } from '../grid';
import { Column } from '../grid/types';

/**
 * A flexible form group component that wraps form elements in a styled container with a label.
 * Composes Grid component for responsive multi-column layouts.
 *
 * **Composition Pattern:**
 * FormGroup uses Grid internally instead of reimplementing grid logic, ensuring DRY principles
 * and consistent layout behavior across the library.
 *
 * @param props {@link IFormGroupProps} - Props for the FormGroup component
 * @returns The rendered FormGroup component
 *
 * @example
 * ```tsx
 * // Legacy format (number) - mobile-first default
 * <FormGroup label="Personal Information" columns={2}>
 *   <Field name="firstName">
 *     <FieldLabel required>First Name</FieldLabel>
 *     <FieldControl><Input placeholder="John" /></FieldControl>
 *   </Field>
 *   <Field name="lastName">
 *     <FieldLabel required>Last Name</FieldLabel>
 *     <FieldControl><Input placeholder="Doe" /></FieldControl>
 *   </Field>
 * </FormGroup>
 * ```
 *
 * @example
 * ```tsx
 * // Responsive format - full control over breakpoints
 * <FormGroup label="Contact" columns={{ xs: 1, sm: 2, lg: 3 }}>
 *   <Field name="firstName">
 *     <FieldLabel>First Name</FieldLabel>
 *     <FieldControl><Input /></FieldControl>
 *   </Field>
 *   <Field name="lastName">
 *     <FieldLabel>Last Name</FieldLabel>
 *     <FieldControl><Input /></FieldControl>
 *   </Field>
 *   <Field name="email">
 *     <FieldLabel>Email</FieldLabel>
 *     <FieldControl><Input /></FieldControl>
 *   </Field>
 * </FormGroup>
 * ```
 *
 * @example
 * ```tsx
 * // Mixed spans - some fields span multiple columns
 * <FormGroup label="User Profile" columns={{ xs: 4, lg: 12 }}>
 *   <Field name="email" columnSpan={{ xs: 4, lg: 12 }}>
 *     <FieldLabel>Email Address</FieldLabel>
 *     <FieldControl><Input type="email" /></FieldControl>
 *   </Field>
 *   <Field name="firstName" columnSpan={{ xs: 4, lg: 6 }}>
 *     <FieldLabel>First Name</FieldLabel>
 *     <FieldControl><Input /></FieldControl>
 *   </Field>
 * </FormGroup>
 * ```
 */
const FormGroup: React.FC<IFormGroupProps> = ({ label, children, columns = { xs: 1, lg: 2 } }) => {
  /**
   * Convert legacy number format to responsive Column object.
   * Legacy: columns={2} -> { lg: 2 }
   * This ensures backwards compatibility while enabling mobile-first defaults.
   */
  const gridColumns: Column = typeof columns === 'number' ? { lg: columns } : columns;

  return (
    <fieldset className="rounded-[var(--border-radius-lg)] border border-solid border-[var(--border)] bg-[var(--background)] pt-2 px-4 pb-4">
      <legend className="flex justify-center items-center px-1 gap-6 ml-[-4px]">
        <label className="text-[var(--muted-foreground)] text-[length:var(--typography-base-sizes-small-font-size)] font-(var(--typography-font-family-font-sans)) font-medium">
          {label}
        </label>
      </legend>
      {/* Composition: Use Grid instead of reimplementing grid logic */}
      <Grid columns={gridColumns}>{children}</Grid>
    </fieldset>
  );
};

export default FormGroup;
