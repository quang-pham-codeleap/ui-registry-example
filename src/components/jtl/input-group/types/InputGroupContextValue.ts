import React from 'react';
import type { FactoryOpts } from 'imask';
import InputGroupSize from './InputGroupSize';
import { IInputProps } from '../../input';

/**
 * Context value interface for InputGroup
 * Shares state between InputGroup and child components
 */
type InputGroupContextValue = {
  /**
   * Size of the input group
   * @default 'default'
   */
  size: InputGroupSize;

  /**
   * Whether the group has error state
   * @default false
   */
  isError?: boolean;

  /**
   * Whether the entire group is disabled
   * @default false
   */
  disabled: boolean;

  /**
   * Whether the group is currently in a read-only state.
   * @default false
   */
  readOnly: boolean;

  /**
   * Whether the group is currently focused
   */
  isFocused: boolean;

  /**
   * Callback to set focus state
   */
  setIsFocused: (focused: boolean) => void;

  /**
   * Input props passed from InputGroup to InputGroupInput
   */
  inputProps?: IInputProps & { mask?: FactoryOpts['mask'] };

  /**
   * Ref to the underlying <input> element.
   * Used by inline addons (icon, badge, text) to forward focus to the input
   * when the user clicks on a non-interactive addon element.
   */
  inputRef?: React.RefObject<HTMLInputElement | null>;
};

export default InputGroupContextValue;
