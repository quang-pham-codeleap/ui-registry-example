import type React from 'react';

/**
 * Props interface for the SidebarCollapsedPopover component.
 */
export default interface ISidebarCollapsedPopoverProps {
  /** Parent label text shown as popover heading */
  label: string;

  /** Child SidebarItem/SidebarMenu elements to render inside the popover */
  menuChildren: React.ReactNode;

  /** Trigger element (the icon button) */
  children: React.ReactNode;

  /** Additional CSS class name(s) */
  className?: string;
}
