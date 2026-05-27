import React from 'react';

/**
 * Props interface for ButtonGroupSeparator component
 * @interface IButtonGroupSeparatorProps
 */
export default interface IButtonGroupSeparatorProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'className' | 'style'> {
  /**
   * The orientation of the separator
   * @default "horizontal"
   */
  orientation?: 'horizontal' | 'vertical';
}
