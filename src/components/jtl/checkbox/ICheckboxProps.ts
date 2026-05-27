import React from 'react';
import { ICheckboxIndicatorProps } from './components/checkbox-indicator';
import { FormError } from '@/types';
import { Root } from '@radix-ui/react-checkbox';

/**
 * Props for the Checkbox component.
 */
export default interface ICheckboxProps
  extends Omit<ICheckboxIndicatorProps, 'checked'>,
    FormError,
    Pick<React.ComponentPropsWithRef<typeof Root>, 'ref'> {
  /**
   * Optional label displayed next to the checkbox. Can be a string or a React element.
   * @deprecated Use `<Field>` with `<FieldLabel>` instead. Will be removed in a future major version.
   */
  label?: React.ReactNode;

  /**
   * Optional description text displayed below the label.
   * @deprecated Use `<Field>` with `<FieldDescription>` instead. Will be removed in a future major version.
   */
  description?: string;

  /**
   * The value of the checkbox (used for CheckboxGroup integration)
   */
  value?: string | boolean | null;

  /**
   * Children content (alternative to label prop, supports Ant Design pattern)
   */
  children?: React.ReactNode;
}
