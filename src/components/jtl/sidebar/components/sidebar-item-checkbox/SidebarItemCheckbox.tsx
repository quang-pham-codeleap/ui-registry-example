import { Checkbox } from '../../../checkbox';
import { cn } from '@/lib/utils';
import type React from 'react';
import { useCallback } from 'react';
import type ISidebarItemCheckboxProps from './ISidebarItemCheckboxProps';

/**
 * Consumer-controlled checkbox for a sidebar item.
 * Stops click propagation to prevent triggering the parent item's onClick.
 */
const SidebarItemCheckbox: React.FC<ISidebarItemCheckboxProps> = ({ checked = false, onChange, className }) => {
  const handleClick = useCallback((e: React.MouseEvent) => {
    e.stopPropagation();
  }, []);

  return (
    <div className={cn('order-[-1]', 'shrink-0', className)} onClick={handleClick} role="presentation">
      <Checkbox value={checked} onChange={onChange} />
    </div>
  );
};

SidebarItemCheckbox.displayName = 'SidebarItemCheckbox';

export default SidebarItemCheckbox;
