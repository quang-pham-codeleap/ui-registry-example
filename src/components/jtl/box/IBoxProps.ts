import React from 'react';
import type { Element } from './types';

/**
 * Interface for Box component props
 */
export default interface IBoxProps extends React.AriaAttributes {
  /**
   * HTML Element type
   * @default 'div'
   */
  as?: Element;
  /**
   * HTML id attribute
   */
  id?: string;
  /**
   * HTML class attribute
   */
  className?: string;
  /**
   * The content to be rendered within the box
   */
  children?: React.ReactNode;

  /**
   * HTML role attribute
   */
  role?: string;
}
