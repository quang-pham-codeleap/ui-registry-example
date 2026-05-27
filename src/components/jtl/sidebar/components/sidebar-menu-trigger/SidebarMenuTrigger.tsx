import { Text } from '../../../text';
import { cn } from '@/lib/utils';
import { ChevronDown, ChevronRight } from 'lucide-react';
import { forwardRef } from 'react';
import { useSidebarContext, useSidebarMenuContext } from '../../context';
import { SidebarRow } from '../sidebar-row';
import type ISidebarMenuTriggerProps from './ISidebarMenuTriggerProps';

/**
 * Trigger row for a SidebarMenu.
 * Renders the clickable row with icon, label, and chevron.
 * Reads toggle state from SidebarMenuContext.
 */
const SidebarMenuTrigger = forwardRef<HTMLElement, ISidebarMenuTriggerProps>(
  ({ label, isActive = false, chevronSide = 'right', as, asProps, className, children }, ref) => {
    const { collapsed } = useSidebarContext();
    const { isOpen, canExpand, toggle } = useSidebarMenuContext();

    const ChevronIcon = isOpen ? ChevronDown : ChevronRight;

    if (collapsed) {
      return (
        <SidebarRow
          ref={ref}
          isActive={isActive}
          as={as}
          asProps={asProps}
          onClick={canExpand ? toggle : undefined}
          collapsed
          aria-label={label}
          className={className}
        >
          {children}
        </SidebarRow>
      );
    }

    return (
      <SidebarRow
        ref={ref}
        isActive={isActive}
        as={as}
        asProps={asProps}
        onClick={canExpand ? toggle : undefined}
        aria-expanded={canExpand ? isOpen : undefined}
        className={className}
      >
        {chevronSide === 'left' && canExpand && <ChevronIcon className={cn('size-4', 'shrink-0', 'opacity-70')} />}
        {children}
        <span className={cn('flex-1', 'min-w-0', 'text-left')}>
          <Text type="small" truncate>
            {label}
          </Text>
        </span>
        {chevronSide === 'right' && canExpand && <ChevronIcon className={cn('ml-auto', 'size-4', 'shrink-0', 'opacity-70')} />}
      </SidebarRow>
    );
  },
);

SidebarMenuTrigger.displayName = 'SidebarMenuTrigger';

export default SidebarMenuTrigger;
