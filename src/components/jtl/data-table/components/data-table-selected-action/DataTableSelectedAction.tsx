import { useCallback } from 'react';
import { Box } from '../../../box';
import IDataTableSelectedActionProps from './IDataTableSelectedActionProps';
import { Button } from '../../../button';
import JTLDropdown from '../../../jtl-dropdown/JTLDropdown';
import DropdownItem from '../../../jtl-dropdown/types/DropdownItem';
import { cn } from '@/lib';

const DataTableSelectedAction = <T extends object>({ selectedRows, rowActions }: IDataTableSelectedActionProps<T>) => {
  // Show first 4 actions directly, rest in dropdown
  const visibleActions = rowActions.filter(action => !action.isDropdownAction).slice(0, 4);
  // Actions that will be in the dropdown
  const dropdownActions = rowActions.filter(action => !visibleActions.includes(action));
  const totalSegments = visibleActions.length + (dropdownActions.length > 0 ? 1 : 0);

  const getSegmentClassName = useCallback(
    (segmentIndex: number) => {
      if (totalSegments <= 1) {
        return '[&_button]:rounded [&_button]:hover:rounded';
      }

      const isFirst = segmentIndex === 0;
      const isLast = segmentIndex === totalSegments - 1;

      return cn(
        '[&_button]:rounded-none [&_button]:hover:rounded-none',
        isFirst && '[&_button]:rounded-l [&_button]:hover:rounded-l',
        isLast && '[&_button]:rounded-r [&_button]:hover:rounded-r',
      );
    },
    [totalSegments],
  );

  // Convert rowActions to dropdown menu items format
  const dropdownMenuItems = dropdownActions.map(action => ({
    type: DropdownItem.Default,
    label: action.label,
    icon: action.icon,
    onClick: () => action.onClick(selectedRows),
  }));

  return (
    <div
      className="absolute -top-[60px] left-0 flex items-center rounded bg-[var(--background)] z-50"
      style={{ boxShadow: '0 4px 6px -1px var(--shadow-10, rgba(0, 0, 0, 0.10)), 0 2px 4px -1px var(--shadow-5, rgba(0, 0, 0, 0.05))' }}
    >
      {/* Render first 4 actions directly */}
      {visibleActions.map((action, index) => {
        const ActionIcon = action.icon;
        const isLastVisibleAction = index === visibleActions.length - 1;
        const hasDropdownAction = dropdownActions.length > 0;
        const shouldShowBorderRight = !isLastVisibleAction || hasDropdownAction;

        return (
          <Box
            key={`${action.label}-${index}`}
            className={cn(shouldShowBorderRight && 'border-r border-[var(--border)]', getSegmentClassName(index))}
          >
            <Button
              variant="ghost"
              size="sm"
              label={action.iconOnly ? undefined : action.label}
              icon={ActionIcon}
              onClick={() => action.onClick(selectedRows)}
              aria-label={action.label}
            />
          </Box>
        );
      })}

      {/* Show dropdown for additional actions if there are more than 4 */}
      {dropdownActions.length > 0 && (
        <JTLDropdown menuItems={dropdownMenuItems} position="right">
          <Box className={getSegmentClassName(totalSegments - 1)}>
            <Button variant="ghost" size="sm" icon="MoreVertical" iconPosition="right" aria-label="Mehr Aktionen" />
          </Box>
        </JTLDropdown>
      )}
    </div>
  );
};

export default DataTableSelectedAction;
