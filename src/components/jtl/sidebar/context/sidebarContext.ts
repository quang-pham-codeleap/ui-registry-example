import { createContext, useContext } from 'react';

/**
 * Sidebar-level context shared across all children.
 * Provides collapsed state for the entire sidebar.
 */
interface SidebarContextValue {
  /** Whether the sidebar is in collapsed (icons-only) mode */
  collapsed: boolean;

  /** Callback to change the collapsed state */
  onCollapsedChange: (collapsed: boolean) => void;
}

const SidebarContext = createContext<SidebarContextValue | null>(null);

/**
 * Hook to access the sidebar context.
 * Must be used within a Sidebar component.
 */
const useSidebarContext = (): SidebarContextValue => {
  const context = useContext(SidebarContext);

  if (!context) {
    throw new Error('useSidebarContext must be used within a <Sidebar> component');
  }

  return context;
};

export { SidebarContext, useSidebarContext };
export type { SidebarContextValue };
