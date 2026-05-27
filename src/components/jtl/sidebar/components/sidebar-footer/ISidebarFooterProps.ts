import type React from 'react';

/**
 * Props interface for the SidebarFooter component.
 */
export default interface ISidebarFooterProps {
  /** Additional CSS class name(s) */
  className?: string;

  /** Footer content */
  children: React.ReactNode;
}
