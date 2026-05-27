import React from 'react';

/**
 * Interface for AnnotatedSection component props
 */
export default interface IAnnotatedSectionProps {
  /**
   * The content to be rendered within the annotated section
   */
  children?: React.ReactNode;

  /**
   * The title of the annotated section
   */
  title?: React.ReactNode;

  /**
   * Additional descriptive content for the section
   */
  description?: React.ReactNode;

  /**
   * Optional unique identifier for the section
   */
  id?: string;
}
