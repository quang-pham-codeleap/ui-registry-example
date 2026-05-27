import type React from 'react';

/**
 * Props interface for the SidebarItemActions component.
 * Accepts children instead of fixed action handlers — consumers provide their own buttons.
 */
export default interface ISidebarItemActionsProps {
  /** Action buttons to render (e.g., edit, delete, more menu) */
  children: React.ReactNode;

  /** Additional CSS class name(s) */
  className?: string;
}
