import { cn } from '@/lib/utils';
import { Item, List, Root } from '@radix-ui/react-navigation-menu';
import React, { useCallback, useMemo, useState, useEffect, useRef } from 'react';
import ITabProps from './ITabProps';
import { Box } from '../box';
import { IconExtend } from '../icon/components';

/**
 * A navigation tabs component with support for primary and regular tabs.
 * Built on @radix-ui/react-navigation-menu for accessibility.
 *
 * @param props {@link ITabProps} - Props for the Tab component
 * @returns The rendered Tab component
 *
 * @example
 * ```tsx
 * import { useState } from 'react';
 *
 * // Default
 * function App() {
 *   const [activeTab, setActiveTab] = useState('tab-1');
 *   return (
 *     <Tab
 *       tabs={[
 *         { id: 'tab-1', title: 'Dashboard' },
 *         { id: 'tab-2', title: 'Orders' },
 *       ]}
 *       activeTab={activeTab}
 *       onSelectTab={(id) => setActiveTab(id)}
 *     />
 *   );
 * }
 * ```
 */
const Tab: React.FC<ITabProps> = ({ tabs, activeTab, onSelectTab }) => {
  /**
   * Handles tab selection by invoking the onSelectTab callback
   * @param tabId - ID of the tab being selected
   */
  const handleTabSelect = useCallback(
    (tabId: string) => {
      onSelectTab(tabId);
    },
    [onSelectTab],
  );

  /**
   * Handles tab link clicks by preventing default navigation and triggering tab selection
   * @param e - Click event object
   * @param tabId - ID of the tab to select
   */
  const handleClickLink = useCallback(
    (e: React.MouseEvent, tabId: string) => {
      e.preventDefault();
      handleTabSelect(tabId);
    },
    [handleTabSelect],
  );

  // Refs for tab items
  const tabRefs = useRef<Map<string, HTMLElement>>(new Map());

  // State to track the ink bar position and width
  const [inkBarStyle, setInkBarStyle] = useState({
    left: 0,
    width: 0,
  });

  // Update ink bar position when active tab changes or on initial render
  useEffect(() => {
    const updateInkBar = () => {
      const activeTabElement = tabRefs.current.get(activeTab);

      if (activeTabElement) {
        // Get the tab's position and dimensions
        const tabRect = activeTabElement.getBoundingClientRect();
        const parentRect = activeTabElement.parentElement?.parentElement?.getBoundingClientRect() || { left: 0 };

        // Calculate the left position relative to the parent
        const left = tabRect.left - parentRect.left;

        // Update ink bar style
        setInkBarStyle({
          left,
          width: tabRect.width || activeTabElement.offsetWidth || 0,
        });
      }
    };

    // Set a small delay to ensure elements are rendered
    const timerId = setTimeout(updateInkBar, 0);

    // Also update on window resize
    window.addEventListener('resize', updateInkBar);

    return () => {
      clearTimeout(timerId);
      window.removeEventListener('resize', updateInkBar);
    };
  }, [activeTab, tabs]);

  /**
   * Render tabs with refs to track their position for the ink bar
   */
  const renderedItems = useMemo(() => {
    return tabs.map(tab => {
      const isActiveTab = tab.id === activeTab;

      return (
        <Item key={tab.id} value={tab.id} className="relative">
          <Box
            ref={el => {
              if (el) tabRefs.current.set(tab.id, el);
            }}
            className={cn(
              'relative',
              'max-w-64',
              'flex',
              'items-center',
              'transition-all duration-200',
              'text-[var(--foreground)]',
              'rounded-t-[var(--border-radius-default)]',
            )}
          >
            <a
              href={tab.id}
              className={cn(
                'truncate',
                'flex',
                'h-full',
                'flex-1',
                'items-center',
                'gap-2',
                'rounded-[var(--border-radius-md)]',
                'px-3',
                'py-2',
                'hover:cursor-pointer',
                'hover:bg-[var(--accent)]',
              )}
              onClick={e => handleClickLink(e, tab.id)}
            >
              {tab.icon && (
                <span className={cn('shrink-0', 'text-[var(--muted-foreground)]', { 'text-[var(--foreground)]': isActiveTab })}>
                  <IconExtend icon={tab.icon} size={16} />
                </span>
              )}
              <span
                className={cn(
                  'truncate',
                  'text-[var(--muted-foreground)]',
                  'font-[family-name:var(--typography-font-family-font-sans)]',
                  'text-(length:var(--typography-base-sizes-small-font-size))',
                  'font-normal',
                  'leading-[var(--typography-base-sizes-small-line-height)]',
                  { 'text-[var(--foreground)]': isActiveTab },
                )}
              >
                {tab.title}
              </span>
            </a>
          </Box>
        </Item>
      );
    });
  }, [activeTab, handleClickLink, tabs]);

  return (
    <Box className="w-full relative flex overflow-hidden">
      <Box className="w-full flex overflow-x-auto overflow-y-hidden relative">
        <Root className="w-full border-b-(length:--border-width-border-1) border-b-[var(--border)]">
          <List className="flex items-center relative py-1.5">{renderedItems}</List>
          {/* Ink bar - positioned based on active tab */}
          <div
            className={cn('absolute', 'bottom-0', 'h-[2px]', 'bg-[var(--primary)]', 'transition-all duration-300 ease-in-out')}
            style={{
              left: `${inkBarStyle.left}px`,
              width: `${inkBarStyle.width}px`,
            }}
            aria-hidden="true" // This is a visual element, not interactive
          />
        </Root>
      </Box>
    </Box>
  );
};

Tab.displayName = 'Tab';

export default Tab;
