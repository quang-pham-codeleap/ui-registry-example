import React from 'react';

/**
 * Interface for Layout component props
 */
export default interface ILayoutProps {
  /**
   * Automatically adds sections to layout
   */
  sectioned?: boolean;
  /**
   * The content to display inside the layout
   */
  children?: React.ReactNode;
}
