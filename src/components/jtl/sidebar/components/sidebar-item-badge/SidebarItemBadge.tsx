import type React from 'react';
import { useSidebarContext } from '../../context';
import type ISidebarItemBadgeProps from './ISidebarItemBadgeProps';
import { Text } from '../../../text';

/**
 * Renders a badge (string or number).
 * Hidden when the sidebar is collapsed.
 */
const SidebarItemBadge: React.FC<ISidebarItemBadgeProps> = ({ children }) => {
  const { collapsed } = useSidebarContext();

  if (collapsed) {
    return null;
  }

  return (
    <span className="shrink-0">
      <Text truncate type="xs">
        {children}
      </Text>
    </span>
  );
};

SidebarItemBadge.displayName = 'SidebarItemBadge';

export default SidebarItemBadge;
