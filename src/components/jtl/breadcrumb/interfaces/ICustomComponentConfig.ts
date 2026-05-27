import React from 'react';

/**
 * Configuration for custom link components
 */
export default interface ICustomComponentConfig {
  /**
   * Custom link components used in Breadcrumb
   *
   * Supports various router libraries like:
   * - TanStack Router (uses 'to' prop)
   * - React Router (uses 'to' prop)
   * - Next.js Link (uses 'href' prop)
   * - Standard anchor tags (uses 'href' prop)
   *
   * This type declaration ensures compatibility with any React component
   * that can render links, including TanStack Router's Link component.
   */
  as?: React.ElementType;

  /**
   * Property name to use for the URL
   * Restricted to common router prop names for security
   * This field will be ignored if no "as" component is provided
   * @default 'href'
   */
  urlField?: 'to' | 'href' | 'path' | 'url';
}
