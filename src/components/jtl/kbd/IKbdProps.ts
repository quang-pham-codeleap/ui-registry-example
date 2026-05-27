import React from 'react';
import { KbdVariant } from './types';

/**
 * Props for the Kbd component
 */
export default interface IKbdProps extends React.HTMLAttributes<HTMLElement> {
  /**
   * The visual style variant of the Kbd component
   * @default 'default'
   */
  variant?: KbdVariant;
}
