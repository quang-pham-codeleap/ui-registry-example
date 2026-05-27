import React, { useMemo } from 'react';
import IContextMenuProps from './IContextMenuProps';
import { ContextMenuRoot, ContextMenuTrigger, ContextMenuContent } from './components/ContextMenuPrimitives';
import { ContextMenuItem } from './components/context-menu-item';
import { cn } from '@/lib';

/**
 * Context Menu component
 * Provides a context menu for right-click actions
 *
 * @param {IContextMenuProps} props - The props for the ContextMenu component
 * @returns The rendered ContextMenu component
 *
 * @example
 * ```tsx
 * function App() {
 *    const menuItems = [
 *      { label: 'Copy', onClick: () => navigator.clipboard.writeText('Copy') },
 *      { label: 'Paste', onClick: () => navigator.clipboard.readText() },
 *    ];
 *
 *    return (
 *      <ContextMenu menuItems={menuItems}>
 *        <Button label="Right-click me" />
 *      </ContextMenu>
 *    );
 * }
 * ```
 */
const ContextMenu: React.FC<IContextMenuProps> = ({ children, menuItems, inset = true, width = '16rem' }) => {
  // Memoize the menu items to prevent unnecessary re-renders
  const menuItemElements = useMemo(() => {
    return menuItems.map((item, index) => <ContextMenuItem key={`${item.label}-${index}`} {...item} inset={inset} />);
  }, [menuItems, inset]);

  return (
    <ContextMenuRoot>
      <ContextMenuTrigger asChild>{children}</ContextMenuTrigger>
      <ContextMenuContent
        className={cn('w-64 rounded-md border border-[var(--border)] bg-[var(--background)] p-1 shadow-md', width && `w-[${width}]`)}
      >
        {menuItemElements}
      </ContextMenuContent>
    </ContextMenuRoot>
  );
};

export default ContextMenu;
