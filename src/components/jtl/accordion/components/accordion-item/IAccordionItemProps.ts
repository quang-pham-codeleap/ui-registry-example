import React from 'react';

export default interface IAccordionItemProps {
  /**
   * Value of the item
   */
  value: string;

  /**
   * Title of the item
   */
  title: string;

  /**
   * Text content of the item
   */
  text?: string;

  /**
   * Child content of the item
   */
  children?: React.ReactNode;

  /**
   * Size of the item
   * @default default
   * @internal
   */
  size?: 'default' | 'sm';
}
