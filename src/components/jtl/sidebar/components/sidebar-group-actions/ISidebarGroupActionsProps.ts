import type React from 'react';

/**
 * Props interface for the SidebarGroupActions component.
 */
export default interface ISidebarGroupActionsProps {
  /** Additional CSS class name(s) */
  className?: string;

  /** Action buttons (e.g. IconButton for add, search, more) */
  children: React.ReactNode;
}
