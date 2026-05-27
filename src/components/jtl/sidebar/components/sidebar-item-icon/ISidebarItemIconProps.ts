import type { ReactNode } from 'react';

/**
 * Props interface for the SidebarItemIcon component.
 */
export default interface ISidebarItemIconProps {
  /** Additional CSS class name(s) */
  className?: string;

  /** Icon component (e.g., Lucide icon or Icon component) */
  children?: ReactNode;
}
