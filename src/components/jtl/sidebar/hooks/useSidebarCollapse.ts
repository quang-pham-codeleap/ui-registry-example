import { useCallback, useState } from 'react';

/**
 * Parameters for the useSidebarCollapse hook.
 */
interface UseSidebarCollapseParams {
  /** Controlled collapsed state (takes precedence over internal state) */
  collapsed?: boolean;

  /** Default collapsed state for uncontrolled mode */
  defaultCollapsed?: boolean;

  /** Callback when collapsed state changes */
  onCollapsedChange?: (collapsed: boolean) => void;
}

/**
 * Reads a boolean value from localStorage.
 * Returns the fallback if the key doesn't exist or parsing fails.
 */
const readStorage = (key: string, fallback: boolean): boolean => {
  try {
    const stored = localStorage.getItem(key);

    if (stored === null) return fallback;

    return JSON.parse(stored) === true;
  } catch {
    return fallback;
  }
};

/**
 * Hook to manage sidebar collapse state.
 * Supports both controlled and uncontrolled modes.
 * Automatically persists collapsed state to localStorage.
 */
const STORAGE_KEY = 'jtl-sidebar-collapsed';

const useSidebarCollapse = ({ collapsed: controlledCollapsed, defaultCollapsed = false, onCollapsedChange }: UseSidebarCollapseParams) => {
  const [internalCollapsed, setInternalCollapsed] = useState(() => readStorage(STORAGE_KEY, defaultCollapsed));
  const isControlled = controlledCollapsed !== undefined;
  const collapsed = isControlled ? controlledCollapsed : internalCollapsed;

  const handleCollapsedChange = useCallback(
    (value: boolean) => {
      if (!isControlled) {
        setInternalCollapsed(value);
      }

      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(value));
      } catch {
        console.warn('Failed to persist sidebar collapsed state to localStorage');
      }

      onCollapsedChange?.(value);
    },
    [isControlled, onCollapsedChange],
  );

  return { collapsed, onCollapsedChange: handleCollapsedChange };
};

export { useSidebarCollapse };
export type { UseSidebarCollapseParams };
