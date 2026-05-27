import React from 'react';

/**
 * Props for the Accordion component.
 */
export default interface IAccordionProps {
  /**
   * The visual size of the accordion
   */
  size?: 'default' | 'sm';

  /**
   * Optional value of the item to be open by default
   */
  defaultValue?: string;

  /**
   * Optional content to be passed to the root element
   */
  children?: React.ReactNode;
}
