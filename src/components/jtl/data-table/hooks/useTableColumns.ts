import React, { useCallback, useMemo, useState } from 'react';
import { HeaderContext, Row } from '@tanstack/react-table';
import { Checkbox } from '../../checkbox';
import { Button } from '../../button';
import { IJTLDropdownMenuItemProps, JTLDropdown } from '../../jtl-dropdown';
import convertToColumnDef from '../utils/convertToColumnDef';
import { TableColumnDef, RowsSelectionHandler, ColumnSelectorHandler, RowActionHandler, DraggableHandler } from '../types';
import { ITableColumnProps } from '../../table';
import { ACTION_COLUMN_ID, ACTION_COLUMN_SIZE, SELECTION_COLUMN_ID, SELECTION_COLUMN_SIZE } from '../constants/tableDefaults';

/**
 * Custom hook to manage table columns creation and memoization
 * Handles selection column, action column, and column filtering
 */
export default function useTableColumns<T extends object>(
  columns: ITableColumnProps<T>[],
  rowsSelection?: RowsSelectionHandler<T>,
  rowAction?: RowActionHandler<T>,
  columnSelector?: ColumnSelectorHandler<T>,
  draggable?: DraggableHandler,
) {
  const [internalSelectedColumns, setInternalSelectedColumns] = useState<ITableColumnProps<T>[]>(columns);

  const [internalColumnOrder, setInternalColumnOrder] = useState<string[]>(() => columns.map(c => c.key!));

  // Use controlled value if provided, otherwise use internal state
  const columnOrder = useMemo(
    () => (draggable?.enabled ? (draggable?.value?.length ? draggable.value : internalColumnOrder) : []),
    [draggable, internalColumnOrder],
  );

  // Wrapper to handle both controlled and uncontrolled column order
  const setColumnOrder = useCallback(
    (newOrder: React.SetStateAction<string[]>) => {
      const resolvedOrder = typeof newOrder === 'function' ? newOrder(columnOrder) : newOrder;

      // Call onChange callback if provided
      if (draggable?.onChange) {
        draggable.onChange(resolvedOrder);
      }

      // Always update internal state
      setInternalColumnOrder(resolvedOrder);
    },
    [columnOrder, draggable],
  );

  const selectedColumns = columnSelector && columnSelector.value ? columnSelector.value : internalSelectedColumns;

  // Create checkbox selection column
  const selectionColumn = useMemo(
    () => ({
      id: SELECTION_COLUMN_ID,
      header: ({ table }: HeaderContext<T, unknown>) => {
        return React.createElement(Checkbox, {
          'aria-label': 'Select all rows',
          value: table.getIsAllRowsSelected(),
          indeterminate: !table.getIsAllRowsSelected() && table.getIsSomeRowsSelected(),
          onChange: value => table.toggleAllRowsSelected(!!value),
        });
      },
      cell: ({ row }: { row: Row<T> }) => {
        return React.createElement(Checkbox, {
          'aria-label': 'Select row',
          value: row.getIsSelected(),
          onChange: (value: boolean) => row.toggleSelected(!!value),
          onClick: (e: React.MouseEvent) => e.stopPropagation(),
          // Radix Checkbox follows WAI-ARIA spec and only responds to Space, not Enter.
          // We add Enter support here so keyboard users can toggle selection without
          // having to know that only Space works — Enter is the expected activation
          // key for most interactive elements.
          onKeyDown: (e: React.KeyboardEvent) => {
            if (e.key === 'Enter') {
              row.toggleSelected(!row.getIsSelected());
            }
          },
        });
      },
      enableSorting: false,
      enableResizing: false,
      minSize: SELECTION_COLUMN_SIZE,
      maxSize: SELECTION_COLUMN_SIZE,
      size: SELECTION_COLUMN_SIZE,
    }),
    [],
  );

  // Create action column
  const actionColumn = useMemo((): TableColumnDef<T> | undefined => {
    if (!rowAction?.enabled || !rowAction?.menuItems || rowAction?.menuItems.length === 0) {
      return;
    }

    return {
      accessorKey: ACTION_COLUMN_ID,
      id: ACTION_COLUMN_ID,
      header: '',
      cell: ({ row }: { row: Row<T> }) => {
        const newMenuItem = rowAction?.menuItems?.map(item => {
          return {
            ...item,
            onClick: () => {
              item?.onClick?.(row.original);
            },
          };
        }) as IJTLDropdownMenuItemProps[];
        return React.createElement(
          JTLDropdown,
          {
            position: 'right',
            menuItems: newMenuItem || [],
          },
          React.createElement(Button, {
            'aria-label': 'Row action button',
            variant: 'ghost',
            icon: 'MoreVertical',
            size: 'icon',
          }),
        );
      },
      size: ACTION_COLUMN_SIZE,
    };
  }, [rowAction]);

  // Convert and memoize columns
  const memoizedColumns = useMemo(() => {
    // Convert to TanStack Table column definitions
    const convertedColumns = convertToColumnDef(selectedColumns);

    // Add selection column at the start if row selection is enabled
    const hasRowSelection = rowsSelection?.enabled && (rowsSelection?.menuItems || []).length > 0;
    const finalColumns = hasRowSelection ? [selectionColumn, ...convertedColumns] : convertedColumns;

    if (actionColumn?.id) {
      finalColumns.push(actionColumn);
    }

    return finalColumns as TableColumnDef<T>[];
  }, [selectedColumns, rowsSelection, selectionColumn, actionColumn]);

  const columnInitialSize = useMemo(() => {
    const columnSize = {} as Record<keyof T, number>;

    columns.forEach(column => {
      columnSize[column.key as keyof T] = column.width || 150;
    });

    return columnSize;
  }, [columns]);

  const handleSelectedColumns = useCallback(
    (columns: ITableColumnProps<T>[]) => {
      if (columnSelector?.onChange) {
        columnSelector.onChange(columns);
      }
      setInternalSelectedColumns(columns);
    },
    [columnSelector],
  );

  return {
    memoizedColumns,
    selectionColumn,
    actionColumn,
    columnInitialSize,
    selectedColumns,
    columnOrder,
    handleSelectedColumns,
    setColumnOrder,
  };
}
