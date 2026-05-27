import React from 'react';
import { InputGroupAddonAlign } from '../../types';

/**
 * Props for the InputGroupAddon component
 * Handles physical space and alignment based on position
 */
export default interface IInputGroupAddonProps extends React.PropsWithChildren {
  /**
   * Alignment position for the addon
   * Determines padding, margins, and border radius
   * - outline-left: External prepend (outside left border)
   * - inline-left: Internal start (inside left boundary)
   * - inline-right: Internal end (inside right boundary)
   * - outline-right: External append (outside right border)
   *
   * @default 'inline-right'
   */
  align?: InputGroupAddonAlign;
}
