import React from 'react';
import { CheckboxItem } from '../../types';
import { Spacing } from '../../../stack';

/**
 * Checkbox Group Props interface
 *
 * Supports two usage patterns:
 * 1. Options array: Pass `options` prop with array of {value, label} objects
 * 2. Children pattern: Pass individual Checkbox components as children with `value` props
 */
export default interface ICheckboxGroupProps extends React.PropsWithChildren {
  /**
   * Array of checkbox options. Optional when using children pattern.
   * @example
   * ```tsx
   * const options = [
   *   { value: 'option1', label: 'Option 1' },
   *   { value: 'option2', label: 'Option 2' },
   * ];
   * ```
   */
  options?: CheckboxItem[];

  /**
   * Current selected values (controlled)
   */
  value?: (string | null)[];

  /**
   * Callback when selection changes
   */
  onChange?: (value: (string | null)[]) => void;

  /**
   * Whether the entire group is disabled
   */
  isDisabled?: boolean;

  /**
   * Default selected values (uncontrolled)
   */
  defaultValue?: (string | null)[];

  /**
   * Additional className for the group container
   */
  className?: string;

  /**
   * Spacing between checkboxes
   * This prop is only used when using options array pattern
   * @default 2
   */
  spacing?: Spacing;
}
