import React from 'react';
import { Root } from '@radix-ui/react-progress';

/**
 * Props for the Progress component.
 */
export default interface IProgressProps extends Omit<React.ComponentProps<typeof Root>, 'value' | 'asChild'> {
  /**
   * The value of the progress.
   */
  percent?: number;

  /**
   * The variant of the progress.
   */
  variant?: 'default' | 'highlight';
}
