import React from 'react';
import IComboBoxProps from '../../IComboBoxProps';
import { ComboBoxGroup } from '../../types';

/**
 * Props interface for the ComboBoxDefault component.
 */
export default interface IComboBoxDefaultProps
  extends Pick<IComboBoxProps, 'placeholder' | 'isDisabled' | 'triggerId' | 'isLoading' | 'isOpen' | 'contentId' | 'mode'>,
    React.PropsWithChildren {
  /**
   * Current search text value to display in the trigger
   */
  value?: string | string[];

  /**
   * Callback fired when the combo box is opened or closed
   * @param isOpen Boolean indicating if the combo box is now open
   */
  handleOpenChange?: (isOpen: boolean) => void;

  /**
   * Callback fired when a value is removed
   * @param value The value that was removed
   */
  handleRemoveValue?: (value: string | null) => void;

  /**
   * Ref to the trigger element
   */
  triggerRef?: React.RefObject<HTMLButtonElement | null>;

  /**
   * Array of ComboBox result groups to display.
   * Each group can have a label and contains multiple ComboBox items.
   */
  groups?: ComboBoxGroup[];
}
