import { CellContext, ColumnDef, ColumnDefTemplate, SortingFn } from '@tanstack/react-table';
import { ITableColumnProps } from '../../table/interfaces';
import DataCellContent from '../components/data-cell-content/DataCellContent';
import { GetTypeOfField, PathsToString } from '../../table/types';
import { getNestedValue } from '../../table/utils';
import { TableColumnDef } from '../types';
import React from 'react';

/**
 * Converts ITableColumnProps format to TanStack Table column definitions
 *
 * @param columns - Array of ITableColumnProps objects from Table component
 * @returns Array of ColumnDef objects compatible with the TanStack Table
 */
export default function convertToColumnDef<T extends object>(columns: ITableColumnProps<T>[]): TableColumnDef<T>[] {
  return columns.map(column => {
    const dataIndex = column.dataIndex as string;

    return {
      // Use dataIndex as accessorKey
      accessorKey: dataIndex,
      id: column.key, // Ensure we use the key as the column ID

      // Use title as header
      header: column.title as string,

      // Convert render function to cell renderer if it exists
      cell: (column.render
        ? info => {
            const value = info.getValue() as GetTypeOfField<T, PathsToString<T, Required<T>>> | undefined;
            const rowData = info.row.original;
            // Call the original render function with the appropriate parameters
            const cellContent = column.render?.(value, rowData, info.row.index);

            if (typeof cellContent === 'string' || typeof cellContent === 'number') {
              return React.createElement(DataCellContent, { text: cellContent.toString(), align: column.align });
            } else {
              return cellContent;
            }
          }
        : info => {
            const value = info.getValue() as GetTypeOfField<T, PathsToString<T, Required<T>>> | undefined;

            if (typeof value === 'string' || typeof value === 'number') {
              return React.createElement(DataCellContent, { text: value.toString(), align: column.align });
            } else {
              return value;
            }
          }) as ColumnDefTemplate<CellContext<T, unknown>>,

      // Pass through width if it exists
      ...(column.width !== undefined ? { size: column.width } : {}), // Default size if not specified

      // Add sorting configuration if sorter exists
      ...(column.sorter
        ? {
            enableSorting: true,
            sortingFn: ((rowA, rowB) => {
              if (typeof column.sorter === 'boolean') {
                const valueA = getNestedValue(rowA.original, column.dataIndex) ?? '';
                const valueB = getNestedValue(rowB.original, column.dataIndex) ?? '';
                // Compare values and return appropriate sort order value
                if (valueA < valueB) {
                  return -1; // First value is smaller
                }
                if (valueA > valueB) {
                  return 1; // First value is larger
                }
                return 0; // Values are equal
              }
              const sorterFn = column.sorter as (a: T, b: T) => number;
              return sorterFn(rowA.original, rowB.original);
            }) as SortingFn<T>,
          }
        : {}),

      // Add meta information for styling and sorting configuration
      meta: {
        className: column.className,
        align: column.align,
        defaultSortOrder: column.defaultSortOrder,
      } as ColumnDef<T, unknown>['meta'],
    };
  });
}
