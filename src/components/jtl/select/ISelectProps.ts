import React from 'react';
import { Root } from '@radix-ui/react-select';
import type { SelectItem, SelectGroup } from './types';
import { FieldAriaProps, FormError } from '@/types';

/**
 * Omit 'className', 'style' and 'children' to avoid passing them as props to keep the design system consistent
 */
export default interface ISelectProps
  extends Omit<React.ComponentPropsWithoutRef<typeof Root>, 'className' | 'style' | 'children' | 'onValueChange'>,
    FormError,
    FieldAriaProps {
  /**
   * The label of the select
   * @deprecated Use `<Field>` with `<FieldLabel>` instead. Will be removed in a future major version.
   */
  label?: string;

  /**
   * The description of the select
   * @deprecated Use `<Field>` with `<FieldDescription>` instead. Will be removed in a future major version.
   */
  description?: string;

  /**
   * The content default to display in the select box when no option is selected
   */
  placeholder?: string;

  /**
   * List items of select
   */
  options?: SelectItem[] | SelectGroup[] | null | undefined;

  /**
   * The disabled state of the select
   */
  disabled?: boolean;

  /**
   * Event handler for the Select Item click event
   */
  onChange?: (value: string) => void;

  /**
   * Value of the select when initialized
   */
  defaultValue?: string;

  /**
   * Size of the select
   * @default 'default'
   */
  size?: 'default' | 'sm';

  /**
   * Disable the portal feature of the select
   */
  isPortal?: boolean;
}
