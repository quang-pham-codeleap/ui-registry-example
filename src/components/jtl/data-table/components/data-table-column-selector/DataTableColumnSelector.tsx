import { useState, useCallback, useMemo } from 'react';
import { Button } from '../../../button';
import { DropdownItem, IJTLDropdownMenuItemProps, JTLDropdown } from '../../../jtl-dropdown';
import IDataTableColumnSelectorProps from './IDataTableColumnSelectorProps';
import { useDataTableStaticContext } from '../../hooks';

/**
 * DataTableColumnSelector component for selecting which columns to display
 */
const DataTableColumnSelector = <T extends object>({ value, onChange }: IDataTableColumnSelectorProps<T>) => {
  const { columns } = useDataTableStaticContext<T>();

  // Track which columns are visible
  const [visibleColumns, setVisibleColumns] = useState<Record<string, boolean>>(
    columns.reduce(
      (acc, column) => {
        // If selectedColumns is provided, use it to determine initial visibility
        if (value && value.length > 0) {
          acc[column.key] = value.includes(column);
        } else {
          acc[column.key] = true;
        }
        return acc;
      },
      {} as Record<string, boolean>,
    ),
  );

  /**
   * Creates a new visibility state with the toggled column
   * @param prevVisibleColumns - Previous visibility state
   * @param columnKey - Key of the column to toggle
   * @returns New visibility state with the toggled column
   */
  const createNewVisibilityState = useCallback((prevVisibleColumns: Record<string, boolean>, columnKey: string): Record<string, boolean> => {
    return { ...prevVisibleColumns, [columnKey]: !prevVisibleColumns[columnKey] };
  }, []);

  /**
   * Gets columns that should be visible based on the visibility state
   * @param visibilityState - Current visibility state
   * @returns Array of columns that should be visible
   */
  const getVisibleColumns = useCallback(
    (visibilityState: Record<string, boolean>) => {
      return columns.filter(column => visibilityState[column.key]);
    },
    [columns],
  );

  /**
   * Creates a state where all columns are visible
   * @returns Visibility state with all columns visible
   */
  const createAllVisibleState = useCallback((): Record<string, boolean> => {
    return columns.reduce(
      (acc, column) => {
        acc[column.key] = true;
        return acc;
      },
      {} as Record<string, boolean>,
    );
  }, [columns]);

  /**
   * Notifies parent component about column changes
   * @param columnsToNotify - Columns to notify parent about
   */
  const notifyColumnChange = useCallback(
    (columnsToNotify: typeof columns) => {
      onChange?.(columnsToNotify);
    },
    [onChange],
  );

  /**
   * Handles the case when no columns would be visible
   * @returns Reset visibility state with all columns visible
   */
  const handleNoVisibleColumns = useCallback((): Record<string, boolean> => {
    const allVisibleState = createAllVisibleState();
    notifyColumnChange(columns);
    return allVisibleState;
  }, [columns, createAllVisibleState, notifyColumnChange]);

  /**
   * Handle toggling a column's visibility
   * @param columnKey - Key of the column to toggle
   */
  const handleToggleColumn = useCallback(
    (columnKey: string) => {
      setVisibleColumns(prev => {
        // Create new visibility state with the toggled column
        const newVisibleColumns = createNewVisibilityState(prev, columnKey);

        // Get columns that should be visible based on the new state
        const updatedColumns = getVisibleColumns(newVisibleColumns);

        // If no columns would be visible, reset to all columns visible
        if (updatedColumns.length === 0) {
          return handleNoVisibleColumns();
        }

        // Notify parent about the updated columns
        notifyColumnChange(updatedColumns);

        // Return the new visibility state
        return newVisibleColumns;
      });
    },
    [createNewVisibilityState, getVisibleColumns, handleNoVisibleColumns, notifyColumnChange],
  );

  // Memoize the column items to prevent unnecessary re-renders
  const columnItems: IJTLDropdownMenuItemProps[] = useMemo(
    () =>
      columns.map(column => ({
        type: DropdownItem.Checkbox,
        label: column.title as string,
        onClick: () => handleToggleColumn(column.key),
        isSelected: visibleColumns[column.key],
      })),
    [columns, visibleColumns, handleToggleColumn],
  );

  return (
    <JTLDropdown menuItems={columnItems} position="right">
      <Button variant="outline" size="sm" icon={'Columns3'} iconPosition="right" aria-label="Spalten" />
    </JTLDropdown>
  );
};

export default DataTableColumnSelector;
