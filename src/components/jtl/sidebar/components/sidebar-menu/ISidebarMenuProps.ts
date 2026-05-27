import type React from 'react';

/**
 * Props interface for the SidebarMenu component.
 * Represents an expandable parent item with children.
 */
export default interface ISidebarMenuProps {
  /** Default open state (uncontrolled) */
  defaultOpen?: boolean;

  /** Controlled open state */
  open?: boolean;

  /** Callback when open state changes */
  onOpenChange?: (open: boolean) => void;

  /** SidebarMenuTrigger + child items (SidebarItem, SidebarMenu) */
  children: React.ReactNode;
}
