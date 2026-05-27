import React from 'react';
import type { TypographyVariant, FontWeightVariant, TextAlignVariant, TextColorVariant } from './types';

export default interface ITextProps {
  /**
   * The type of text to display
   */
  type?: TypographyVariant;
  /**
   * The color of the text
   * @default 'default'
   */
  color?: TextColorVariant;
  /**
   * Add a line-through to the text
   * @default false
   */
  isStriked?: boolean;
  /**
   * The font weight of the text
   * @default 'regular'
   */
  weight?: FontWeightVariant;
  /**
   * Adjust horizontal alignment of text
   * @default 'start'
   */
  align?: TextAlignVariant;
  /**
   * Prevent text from overflowing
   * @default true
   */
  breakWord?: boolean;
  /**
   * The ID of the text. Useful to set anchor links
   * @default null
   */
  id?: string | null;
  /**
   * Truncate text overflow with ellipsis
   * @default false
   */
  truncate?: boolean;
  /**
   * Maximum number of lines before truncation with ellipsis.
   * Only works when truncate is true. Values less than 1 are ignored.
   * Uses CSS -webkit-line-clamp for multi-line truncation.
   * @default undefined
   */
  maxLines?: number;
  /**
   * The content to display
   */
  children: React.ReactNode;
  /**
   * Uses the text's predefined line-height
   * @default true
   */
  isLeading?: boolean;

  /**
   * The HTML element to render the text as
   * @default 'span'
   */
  as?: React.ElementType;
}
