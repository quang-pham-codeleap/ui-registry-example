import React from 'react';
import { IToggleMultipleGroupProps, IToggleSingleGroupProps } from './interfaces';
import { FormError } from '@/types';

/**
 * Interface for ToggleGroup component props
 */
type IToggleGroupProps = (IToggleMultipleGroupProps | IToggleSingleGroupProps) & {
  /**
   * Child elements
   */
  children: React.ReactNode;
} & Pick<FormError, 'errorMessage'>;

export default IToggleGroupProps;
