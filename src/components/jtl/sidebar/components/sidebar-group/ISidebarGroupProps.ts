import type React from 'react';

/**
 * Props interface for the SidebarGroup component.
 */
export default interface ISidebarGroupProps {
  /** Show divider above this group */
  hasDivider?: boolean;

  /** Additional CSS class name(s) */
  className?: string;

  /** Group content */
  children: React.ReactNode;
}
