import type React from 'react';

/**
 * Props interface for the Sidebar root component.
 * Manages the overall sidebar container and collapse/expand state.
 */
export default interface ISidebarProps {
  /** Controlled collapsed state */
  collapsed?: boolean;

  /** Default collapsed state for uncontrolled mode */
  defaultCollapsed?: boolean;

  /** Callback when sidebar collapse/expand state changes */
  onCollapsedChange?: (collapsed: boolean) => void;

  /** Width of the sidebar when extended @default '240px' */
  width?: string;

  /** Width when collapsed @default '48px' */
  collapsedWidth?: string;

  /** Additional CSS class name(s) */
  className?: string;

  /** Sidebar content */
  children: React.ReactNode;
}
