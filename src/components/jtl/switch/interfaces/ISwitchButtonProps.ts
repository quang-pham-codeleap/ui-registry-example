import React from 'react';
import { Root } from '@radix-ui/react-switch';

/**
 * Props for the atomic Switch component
 */
export default interface ISwitchButtonProps
  extends Omit<React.ComponentPropsWithRef<typeof Root>, 'asChild' | 'className' | 'style' | 'checked' | 'onCheckedChange' | 'value' | 'onChange'> {
  /**
   * Whether the switch is checked
   */
  value?: boolean;

  /**
   * Whether the switch is disabled
   */
  disabled?: boolean;

  /**
   * Whether the switch is checked by default
   */
  defaultChecked?: boolean;

  /**
   * Event handler for the switch change event
   */
  onChange?: (value: boolean) => void;
}
