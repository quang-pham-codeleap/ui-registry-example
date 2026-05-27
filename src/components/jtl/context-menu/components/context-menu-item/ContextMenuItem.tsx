import React, { useCallback, useMemo } from 'react';
import IContextMenuItemProps from './IContextMenuItemProps';
import {
  ContextMenuItemPrimitive,
  ContextMenuSub,
  ContextMenuSubContent,
  ContextMenuSubTrigger,
  ContextMenuSeparator,
  ContextMenuLabel,
  ContextMenuCheckboxItem,
  ContextMenuShortcut,
} from '../ContextMenuPrimitives';

/**
 * Context Menu Item component
 */
const ContextMenuItem: React.FC<IContextMenuItemProps> = props => {
  const { type = 'item', label, shortcut, onClick, isDisabled, children, isSelected, onClose, inset = true } = props;

  // Handle click with optional close
  const handleClick = useCallback(
    (event: React.MouseEvent) => {
      if (isDisabled) return;
      event.stopPropagation();
      onClick?.();
      onClose?.();
    },
    [onClick, onClose, isDisabled],
  );

  // Render shortcut if provided
  const shortcutComponent = useMemo(() => {
    if (!shortcut) return null;
    return <ContextMenuShortcut>{shortcut}</ContextMenuShortcut>;
  }, [shortcut]);

  // If item has children, render a submenu
  if (children && children.length > 0) {
    return (
      <ContextMenuSub>
        <ContextMenuSubTrigger disabled={isDisabled} inset={inset}>
          {label}
          {shortcutComponent}
        </ContextMenuSubTrigger>
        <ContextMenuSubContent>
          {children.map((childItem, index) => (
            <ContextMenuItem key={`${label}-child-${index}`} {...childItem} onClose={onClose} inset={false} />
          ))}
        </ContextMenuSubContent>
      </ContextMenuSub>
    );
  }

  // Special item types
  if (type === 'separator') {
    return <ContextMenuSeparator />;
  }

  if (type === 'label') {
    return <ContextMenuLabel inset={inset}>{label}</ContextMenuLabel>;
  }

  // Checkbox item
  if (isSelected !== undefined) {
    return (
      <ContextMenuCheckboxItem checked={isSelected} onCheckedChange={onClick} disabled={isDisabled}>
        {label}
        {shortcutComponent}
      </ContextMenuCheckboxItem>
    );
  }

  // Default menu item
  return (
    <ContextMenuItemPrimitive onClick={handleClick} disabled={isDisabled} inset={inset}>
      {label}
      {shortcutComponent}
    </ContextMenuItemPrimitive>
  );
};

export default ContextMenuItem;
