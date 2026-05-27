import React from 'react';
import { UseFormReturn } from 'react-hook-form';
import { z } from 'zod';

/**
 * Interface for Form component props
 * @template TSchema - The Zod schema type
 */
export default interface IFormProps<TSchema extends z.ZodType> {
  /**
   * Child components to render within the form
   */
  children?: React.ReactNode;

  /**
   * React Hook Form form object
   */
  form?: UseFormReturn<z.infer<TSchema>>;

  /**
   * Callback function to handle form submission
   */
  onSubmit: (data: z.infer<TSchema>) => void;

  /**
   * Disable all form fields.
   * Useful for loading states or read-only mode.
   * @default false
   */
  disabled?: boolean;

  /**
   * Loading state indicator.
   * Shows loading state and disables form during submission.
   * @default false
   */
  loading?: boolean;

  /**
   * Additional CSS class names for the form element.
   */
  className?: string;

  /**
   * Form element ID.
   */
  id?: string;

  /**
   * Disable HTML5 validation.
   * @default false
   */
  noValidate?: boolean;

  /**
   * Accessible label for the form element.
   * Use when there are multiple forms on the page so screen readers can
   * distinguish between them (e.g. "Login form", "Search form").
   * Prefer `ariaLabelledBy` when a visible heading already labels the form.
   */
  ariaLabel?: string;

  /**
   * ID of the element that labels this form.
   * Use when a visible heading (h1–h6) already describes the form —
   * this avoids repeating the label text in both the heading and `ariaLabel`.
   */
  ariaLabelledBy?: string;

  /**
   * Callback function when form submission fails validation.
   */
  onError?: (errors: unknown) => void;
}
