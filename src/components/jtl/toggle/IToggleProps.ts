import React from 'react';
import { IconType } from '../icon';
import { ToggleSize, ToggleVariant } from './types';
// import { Toggle as TogglePrimitive } from '../TogglePrimitive';
import * as TogglePrimitive from '@radix-ui/react-toggle';
import { FormError } from '@/types';

// Use this utility to omit specific props cleanly
type OmitProp = 'pressed' | 'disabled' | 'onToggle' | 'asChild' | 'isActive' | 'onToggle' | 'value' | 'onChange';

// Base props from Radix Toggle, excluding the ones we want to replace
type RadixToggleProp = React.ComponentPropsWithRef<typeof TogglePrimitive.Root>;

/**
 * Interface for Toggle component props
 */
export default interface IToggleProps extends Omit<RadixToggleProp, OmitProp>, Pick<FormError, 'errorMessage'> {
  /**
   * Optional icon name to display in the toggle
   */
  icon?: IconType;

  /**
   * Optional label text to display in the toggle
   */
  label?: string;

  /**
   * Optional variant of the toggle
   */
  variant?: ToggleVariant;

  /**
   * Optional size of the toggle
   */
  size?: ToggleSize;

  /**
   * Whether the toggle is currently active
   */
  value?: boolean;

  /**
   * Whether the toggle is disabled
   */
  isDisabled?: boolean;

  /**
   * Callback function when toggle state changes
   * @param pressed
   */
  onChange?(pressed: boolean): void;
}
