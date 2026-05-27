import { createContext, useContext } from 'react';

/**
 * Menu-level context provided by SidebarMenu.
 * Read by SidebarMenuTrigger to access toggle state and handler.
 */
interface SidebarMenuContextValue {
  /** Whether the menu is currently expanded */
  isOpen: boolean;

  /** Whether the menu has child items and can expand */
  canExpand: boolean;

  /** Toggle the menu open/closed */
  toggle: () => void;
}

const SidebarMenuContext = createContext<SidebarMenuContextValue | null>(null);

/**
 * Hook to access the menu context.
 * Must be used within a SidebarMenu component.
 */
const useSidebarMenuContext = (): SidebarMenuContextValue => {
  const context = useContext(SidebarMenuContext);

  if (!context) {
    throw new Error('useSidebarMenuContext must be used within a <SidebarMenu>');
  }

  return context;
};

export { SidebarMenuContext, useSidebarMenuContext };
export type { SidebarMenuContextValue };
