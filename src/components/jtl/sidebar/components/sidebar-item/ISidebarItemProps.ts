import type React from 'react';

/**
 * Props interface for the SidebarItem component.
 * Represents a leaf item that navigates on click.
 */
export default interface ISidebarItemProps {
  /** Item label text — shown as text when expanded, as tooltip when collapsed */
  label: string;

  /** Whether this item is currently active/selected */
  isActive?: boolean;

  /** Whether this item has unsaved changes (shows warning dot indicator) */
  unsavedChanges?: boolean;

  /** Click handler — typically navigation */
  onClick?: () => void;

  /** Custom element to render (e.g. TanStack Router Link) */
  as?: React.ElementType;

  /** Props passed to the custom `as` component */
  asProps?: Record<string, unknown>;

  /** Additional CSS class name(s) */
  className?: string;

  /** Item sub-components (ItemIcon, ItemBadge, ItemActions, etc.) */
  children?: React.ReactNode;
}
