import type React from 'react';

/**
 * Props interface for the internal SidebarRow component.
 * Shared row rendering for SidebarItem and SidebarMenuTrigger.
 */
export default interface ISidebarRowProps extends React.HTMLAttributes<HTMLElement> {
  /** Whether this row is currently active/selected */
  isActive?: boolean;

  /** Custom element to render (e.g. Link) */
  as?: React.ElementType;

  /** Props passed to the custom `as` component */
  asProps?: Record<string, unknown>;

  /** Whether the sidebar is collapsed (centers content) */
  collapsed?: boolean;

  /** Row content (icons, labels, badges, actions) */
  children: React.ReactNode;
}
