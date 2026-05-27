import React from 'react';
import type { IconSize } from '../../types';
import type { LucideIconName } from '../../IIconProps';

/**
 * ButtonIcon props interface
 */
export default interface IIconExtendProps {
  /**
   * Icon name or React node
   */
  icon: LucideIconName | React.ReactNode;

  /**
   * Icon size
   */
  size?: IconSize;
}
