import IDataTableHeadActionProps from './IDataTableHeadActionProps';
import { Button } from '../../../button';
import { DropdownItem, IJTLDropdownMenuItemProps, JTLDropdown } from '../../../jtl-dropdown';
import { useDataTableDynamicContext, useDataTableStaticContext } from '../../hooks';
import { ColumnAction, SortDirection } from '../../types';
import { useCallback, useMemo } from 'react';
import { ColumnActionEnum } from '../../enums';
import { ASCENDING, DESCENDING } from '../../constants/tableState';

/**
 * Component that renders the action dropdown menu for a table column header.
 * Provides functionality for sorting, filtering, pinning, hiding, and resizing columns.
 */
const DataTableHeadAction = <T extends object>({ column }: IDataTableHeadActionProps<T>) => {
  const { columnAction } = useDataTableStaticContext<T>();
  const { setSorting, sorting, handleAutoResize, handleAutoResizeAll } = useDataTableDynamicContext<T>();

  const handleColumnActionChange = useCallback(
    (action: ColumnAction) => {
      if (!column?.key) {
        return;
      }
      columnAction?.onClick?.({ key: column.key, action });
    },
    [column?.key, columnAction],
  );

  /**
   * Internal handler for sorting logic.
   * Toggles: Direction -> Undefined (Remove Sort) -> Opposite Direction
   * Updates the internal table sorting state via `setSorting`.
   */
  const handleSort = useCallback(
    (direction: SortDirection) => {
      if (!column?.key) {
        return;
      }
      // If clicking the active sort direction, remove sorting
      if (direction === sorting?.direction && column.key === sorting?.columnKey) {
        setSorting?.(undefined);
      } else {
        // Otherwise apply new sort direction
        setSorting?.({ columnKey: column.key, direction });
      }
    },
    [column, setSorting, sorting],
  );

  const isSorting = sorting?.columnKey === column?.key;
  const isSortAsc = isSorting && sorting?.direction === ASCENDING;
  const isSortDesc = isSorting && sorting?.direction === DESCENDING;

  // Define the dropdown menu structure
  const columnActions: IJTLDropdownMenuItemProps[] = useMemo(
    () => [
      {
        type: DropdownItem.Default,
        label: isSortAsc ? 'Sortierung aufheben' : 'Sortiere aufsteigend',
        icon: isSortAsc ? 'ArrowUpDown' : 'ArrowUpAZ',
        onClick: () => {
          // Update internal table state
          handleSort(ASCENDING);
          // Notify external listeners
          handleColumnActionChange(isSortAsc ? ColumnActionEnum.ClearSort : ColumnActionEnum.SortAsc);
        },
      },
      {
        type: DropdownItem.Default,
        label: isSortDesc ? 'Sortierung aufheben' : 'Sortiere absteigend',
        icon: isSortDesc ? 'ArrowUpDown' : 'ArrowDownZA',
        onClick: () => {
          handleSort(DESCENDING);
          handleColumnActionChange(isSortDesc ? ColumnActionEnum.ClearSort : ColumnActionEnum.SortDes);
        },
      },
      {
        type: DropdownItem.Default,
        label: 'Filter hinzufügen',
        icon: 'Filter',
        onClick: () => handleColumnActionChange(ColumnActionEnum.Filter),
      },
      {
        type: DropdownItem.Separator,
      },
      {
        type: DropdownItem.SubMenuTrigger,
        label: 'Spalte anheften',
        icon: 'Pin',
        children: [
          {
            type: DropdownItem.Default,
            label: 'Links anheften',
            onClick: () => handleColumnActionChange(ColumnActionEnum.PinLeft),
          },
          {
            type: DropdownItem.Default,
            label: 'Rechts anheften',
            onClick: () => handleColumnActionChange(ColumnActionEnum.PinRight),
          },
        ],
      },
      {
        type: DropdownItem.Default,
        label: 'Spalte umbenennen',
        icon: 'Edit3',
        onClick: () => handleColumnActionChange(ColumnActionEnum.Rename),
      },
      {
        type: DropdownItem.Default,
        label: 'Spalte ausblenden',
        icon: 'EyeOff',
        onClick: () => handleColumnActionChange(ColumnActionEnum.Hide),
      },
      {
        type: DropdownItem.Default,
        label: 'Farbschema definieren',
        icon: 'PaintBucket',
        onClick: () => handleColumnActionChange(ColumnActionEnum.SetColor),
      },
      {
        type: DropdownItem.Separator,
      },
      {
        type: DropdownItem.Default,
        label: 'Automatisch skalieren',
        icon: 'MoveHorizontal',
        onClick: () => {
          // Calculate optimum width for this specific column
          handleAutoResize?.(column.key as keyof T);
          handleColumnActionChange(ColumnActionEnum.AutoResize);
        },
      },
      {
        type: DropdownItem.Default,
        label: 'Alle Spalten skalieren',
        icon: 'StretchVertical',
        onClick: () => {
          // Trigger auto-resize for all columns in the table
          handleAutoResizeAll?.();
          handleColumnActionChange(ColumnActionEnum.AutoResizeAll);
        },
      },
    ],
    [handleColumnActionChange, handleSort, isSortAsc, isSortDesc, column, handleAutoResize, handleAutoResizeAll],
  );

  if (!columnAction?.enabled) {
    return null;
  }

  return (
    <JTLDropdown menuItems={columnActions} position="right">
      <Button variant="ghost" icon="EllipsisVertical" size="iconXs"></Button>
    </JTLDropdown>
  );
};

export default DataTableHeadAction;
