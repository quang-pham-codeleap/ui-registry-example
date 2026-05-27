import type React from 'react';

/**
 * Props interface for the SidebarHeader component.
 */
export default interface ISidebarHeaderProps {
  /** Additional CSS class name(s) */
  className?: string;

  /** Header content */
  children: React.ReactNode;
}
