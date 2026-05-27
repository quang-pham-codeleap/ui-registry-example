import React from 'react';
import ToggleGroupItemSize from '../types/ToggleGroupItemSize';
import ToggleGroupVariant from '../types/ToggleGroupVariant';

export default interface IToggleBaseGroupProps extends React.RefAttributes<HTMLDivElement> {
  /**
   * The size of the toggle group
   * @default 'default'
   */
  size?: ToggleGroupItemSize;

  /**
   * The shape of the toggle group
   * @default 'default'
   */
  shape?: ToggleGroupVariant;

  /**
   * The variant of the toggle group
   * @default 'default'
   */
  variant?: 'default' | 'outline';
}
