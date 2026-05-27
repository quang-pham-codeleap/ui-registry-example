import React from 'react';

/**
 * Props interface for the FieldDescription sub-component.
 *
 * FieldDescription is a description slot for the Field compound pattern.
 * Layout is fully controlled by the user — wrap in `<Box>` or `<Grid>` for
 * horizontal or grid layouts.
 */
export default interface IFieldDescriptionProps extends React.PropsWithChildren {
  /**
   * Optional id for the description element.
   * Used to link the description to a form control via `aria-describedby`.
   *
   * @example `id="email-field-description"` paired with `aria-describedby="email-field-description"` on the input
   */
  id?: string;

  /**
   * Additional CSS class names to apply to the description wrapper.
   */
  className?: string;
}
