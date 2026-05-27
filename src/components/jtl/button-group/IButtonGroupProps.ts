import React from 'react';

/**
 * Button Group props interface
 * @interface IButtonGroupProps
 */
export default interface IButtonGroupProps extends React.PropsWithChildren, Omit<React.HTMLAttributes<HTMLDivElement>, 'className' | 'style'> {
  /**
   * The orientation of the button group
   * @default "horizontal"
   */
  orientation?: 'horizontal' | 'vertical';

  /**
   * Whether the buttons should take up the full width of the container
   * @default false
   */
  fullWidth?: boolean;
}
