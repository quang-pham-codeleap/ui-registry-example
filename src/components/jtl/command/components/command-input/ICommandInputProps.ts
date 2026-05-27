import { Command as CommandPrimitive } from 'cmdk';
import React from 'react';
import { SearchConfigHandler } from '../../types';

/**
 * Props for the CommandInput component
 */
export default interface ICommandInputProps extends React.ComponentProps<typeof CommandPrimitive.Input> {
  /**
   * The Search Config Handler
   */
  searchConfig?: SearchConfigHandler;

  /**
   * The className for the input
   */
  className?: string;

  /**
   * Restricts input to numeric characters only when set to "number".
   * Passed through to CommandInputPrimitive which handles key-blocking.
   */
  type?: React.HTMLInputTypeAttribute;

  /**
   * Whether to show the focus ring border on the input wrapper.
   * Should be true when the command is open or rendered inside a popover.
   */
  showFocusBorder?: boolean;
}
