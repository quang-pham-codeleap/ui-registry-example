import React from 'react';
import { Direction, Justify, ItemAlign, ResponsiveProp, Spacing } from './types';

export default interface IStackProps {
  /** HTML id attribute */
  id?: string;
  /**
   * The HTML element type is used to render the Stack component.
   * This prop allows you to specify which HTML element should be used as the container for the Stack.
   * Useful for semantic HTML and accessibility purposes. For example, use 'ul' when the Stack represents a list.
   * @default "div"
   */
  as?: 'div' | 'span' | 'ul' | 'ol' | 'li' | 'fieldset';
  /**
   * Controls how content is positioned along a container's cross axis.
   */
  itemAlign?: ItemAlign;
  /**
   * Controls how content is positioned along a container's main axis.
   */
  justify?: Justify;
  /**
   * Controls the direction of content.
   * @default "column"
   */
  direction?: Direction;
  /**
   * Sets the space between child elements.
   * @default "1"
   */
  spacing?: Spacing;
  /**
   * Allows the adjustment of direction and spacing based on screen breakpoints.
   * @example
   * {
   *   sm: { direction: 'row', spacing: '4' },
   *   md: { direction: 'rowReverse', spacing: '8' },
   *   lg: { direction: 'column', spacing: '12' },
   *   xl: { direction: 'columnReverse', spacing: '16' },
   *   '2xl': { direction: 'row', spacing: '20' },
   * }
   */
  responsive?: ResponsiveProp;
  /**
   * The content of the Stack.
   */
  children?: React.ReactNode;
  /**
   * Whether the Stack should wrap its content.
   * @default false
   */
  isWrap?: boolean;
}
