import type React from 'react';

/**
 * Props interface for the SidebarGroupHeader component.
 */
export default interface ISidebarGroupHeaderProps {
  /** Additional CSS class name(s) */
  className?: string;

  /** Header content (typically GroupLabel + GroupActions) */
  children: React.ReactNode;
}
