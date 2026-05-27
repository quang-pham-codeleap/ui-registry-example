import type React from 'react';

/**
 * Props interface for the SidebarMenuTrigger component.
 * Renders the clickable trigger row of a SidebarMenu.
 */
export default interface ISidebarMenuTriggerProps {
  /** Trigger label text — shown as text when expanded, used for collapsed tooltip/popover */
  label: string;

  /** Whether this trigger row is currently active/selected */
  isActive?: boolean;

  /** Where to place the expand/collapse chevron: 'left' or 'right' */
  chevronSide?: 'left' | 'right';

  /** Custom element to render (e.g. Link) */
  as?: React.ElementType;

  /** Props passed to the custom `as` component */
  asProps?: Record<string, unknown>;

  /** Additional CSS class name(s) */
  className?: string;

  /** Trigger content (SidebarItemIcon, etc.) */
  children?: React.ReactNode;
}
