import { useMemo, useEffect, useRef, useCallback, useState } from 'react';
import { useReactTable, getCoreRowModel, getFilteredRowModel, getPaginationRowModel, getSortedRowModel, ColumnDef } from '@tanstack/react-table';
import IDataTableProps from './IDataTableProps';
import { Box } from '../box';
import { DataTableHeader, DataTableBody, DataTableEmpty, DataTableContainer, DataTableGlobalSearch } from './components';
import { AppHeader } from '../app-header';
import { FilterInputMode, tableSizes, DatePickerHandler, FilterState } from './types';
import { DataTableSelectedAction } from './components/data-table-selected-action';
import { DataTableDynamicProvider, DataTableStaticProvider } from './context';
import { DataTableColumnSelector } from './components/data-table-column-selector';
import { useTableState, useTableColumns, useTableData, useTableFilterInput, useAutoTableHeight } from './hooks';
import { COLUMN_MIN_SIZE, DEFAULT_PAGE_SIZE, DEFAULT_ROW_HEIGHT, DEFAULT_TABLE_SIZE } from './constants/tableDefaults';
import { cn } from '@/lib';
import { DataTableFilterInput } from './components/data-table-fillter-input';
import { DataTableSaveFilter } from './components/data-table-save-filter';
import useDataTableResizing from './hooks/useDataTableResizing';
import { DataTableDatePicker } from './components/data-table-date-picker';
import { DataTableMoreFilter } from './components/data-table-more-filter';
import { TableStyle } from '../table/types';

/**
 * A high-performance data table component using TanStack Table with optimizations
 * for handling large datasets. Uses native HTML table elements.
 * @param props {@link IDataTableProps} - The props for the DataTable component.
 * @returns A data table component.
 *
 * @example
 * ```tsx
 * interface DataType {
 *   name: string;
 *   age: number;
 * }
 *
 * const columns: ITableColumnProps<DataType>[] = [
 *   {
 *     title: 'Name',
 *     key: 'name',
 *     dataIndex: 'name',
 *     // Add custom sorter function
 *     sorter: (a, b) => a.name.localeCompare(b.name),
 *     // Set default sort order
 *     defaultSortOrder: 'ascend'
 *   },
 *   {
 *     title: 'Age',
 *     key: 'age',
 *     dataIndex: 'age',
 *     // Sorter function with access to sort order
 *     sorter: (a, b) => a.age - b.age
 *   },
 * ];
 *
 * const dataSource: DataType[] = [
 *   { name: 'John Doe', age: 30 },
 *   { name: 'Jane Smith', age: 25 },
 * ];
 *
 * const App = () => {
 *   return (
 *     <DataTable dataSource={dataSource} columns={columns} />
 *   );
 * }
 *
 * export default App;
 * ```
 *
 * @example
 * ```tsx
 * // Advanced example with custom rendering, row actions, filtering, and column selection
 * interface Person {
 *   id: string;
 *   name: string;
 *   age: number;
 *   status: 'active' | 'inactive' | 'pending';
 *   occupation: string;
 *   country: string;
 * }
 *
 * // Define columns with custom rendering
 * const columns: ITableColumnProps<Person>[] = [
 *   { dataIndex: 'id', title: 'ID', key: 'id', width: 120 },
 *   { dataIndex: 'name', title: 'Name', key: 'name' },
 *   { dataIndex: 'age', title: 'Age', key: 'age', align: 'end' },
 *   {
 *     dataIndex: 'status',
 *     title: 'Status',
 *     key: 'status',
 *     // Custom render function for status with Badge component
 *     render: status => (
 *       <Badge
 *         variant={status === 'active' ? 'success' : status === 'inactive' ? 'destructive' : 'warning'}
 *         label={status}
 *       />
 *     ),
 *   },
 *   { dataIndex: 'occupation', title: 'Occupation', key: 'occupation', width: 200 },
 *   { dataIndex: 'country', title: 'Country', key: 'country' }
 * ];
 *
 * const rowsSelectionMenuItems: RowsSelectionMenuItem<Person>[] = [
 *   {
 *     label: 'Edit',
 *     icon: 'Edit',
 *     onClick: (records) => {
 *       console.log(`Editing: ${records.map(r => r.name).join(', ')}`);
 *     },
 *   },
 *   {
 *     label: 'Delete',
 *     icon: 'Trash2',
 *     onClick: (records) => {
 *       console.log(`Deleting: ${records.map(r => r.id).join(', ')}`);
 *     },
 *   },
 * ];
 *
 * // Define row actions
 * const rowActionMenuItems: RowActionMenuItem<Person>[] = [
 *   {
 *     label: 'Edit',
 *     icon: 'Edit',
 *     type: DropdownItem.Default,
 *     onClick: (record) => {
 *       console.log(`Editing: ${record.name}`);
 *     },
 *   },
 *   {
 *     label: 'Delete',
 *     icon: 'Trash2',
 *     type: DropdownItem.Default,
 *     onClick: (record) => {
 *       console.log(`Deleting: ${record.id}`);
 *     },
 *   },
 * ];
 *
 * const App = () => {
 *
 *   // State management
 *   const [data, setData] = useState<Person[]>([]);
 *   const [selectedColumns, setSelectedColumns] = useState(columns);
 *   const [filter, setFilter] = useState<IFilterCondition<Person>[] | undefined>();
 *
 *   // Data fetching simulation
 *   useEffect(() => {
 *     // In a real app, replace this with your API call
 *     const mockData: Person[] = [
 *       { id: '1', name: 'John Smith', age: 32, status: 'active', occupation: 'Developer', country: 'USA' },
 *       { id: '2', name: 'Jane Doe', age: 28, status: 'inactive', occupation: 'Designer', country: 'Canada' },
 *       { id: '3', name: 'Robert Chen', age: 45, status: 'active', occupation: 'Manager', country: 'China' },
 *       { id: '4', name: 'Maria Garcia', age: 36, status: 'pending', occupation: 'Analyst', country: 'Mexico' },
 *     ];
 *     setData(mockData);
 *   }, []);
 *
 *   return (
 *     <DataTable
 *       // Data and columns
 *       dataSource={data}
 *       columns={columns}
 *
 *       // Table styling and behavior
 *       tableHeight={500}
 *       toolbar={{
 *         title: 'Employee Directory',
 *         subtitle: 'Manage employee information',
 *       }}
 *       size="sm"
 *       hasColumnSeparator={true}
 *
 *       // Column selection
 *       columnSelector={{
 *         enabled: true,
 *         value: selectedColumns,
 *         onChange: setSelectedColumns,
 *       }}
 *
 *       // Search and filtering
 *       globalSearch={{
 *         enabled: true,
 *         placeholder: 'Search employees...',
 *         onSearch: (value) => console.log(`Searching: ${value}`),
 *         debounce: 300,
 *       }}
 *
 *       // Advanced filtering
 *       filter={{
 *         enabled: true,
 *         value: filter,
 *         onChange: setFilter,
 *       }}
 *
 *       // Row selection and actions
 *       rowsSelection={{
 *        enabled: true,
 *        menuItems: rowsSelectionMenuItems,
 *       }}
 *
 *       // Row Action
 *       rowAction={{
 *         enabled: true,
 *         menuItems: rowActionMenuItems,
 *       }}
 *
 *       // Column Action
 *       columnAction={{
 *         enabled: true,
 *         onClick: (action: ColumnActionState<Person>) => console.log(action),
 *       }}
 *
 *       // Row click and header click
 *       onRowClick={(record) => console.log('Row clicked:', record)}
 *       onHeaderClick={(headerTitle, column) => console.log('Header clicked:', headerTitle, column)}
 *
 *       // Scroll detection for infinite loading
 *       onScrollEnd={() => console.log('Reached end of table, loading more data...')}
 *     />
 *   );
 * };
 *
 * export default App;
 * ```
 */

const DataTable = <T extends object, M extends 'single' | 'range' = 'range'>({
  dataSource,
  columns,
  emptyContent,
  toolbar,
  title,
  description,
  hasColumnSeparator,
  size = DEFAULT_TABLE_SIZE,
  onRowClick,
  onHeaderClick,
  rowsSelection,
  isLoading,
  onScrollEnd,
  columnResize,
  columnAction,
  columnSelector,
  globalSearch,
  rowAction,
  tableHeight,
  filter,
  rowKey,
  cellEdit,
  datePicker = { mode: 'range', enabled: false } as DatePickerHandler<M>,
  draggable,
  headerStyle,
}: IDataTableProps<T, M>) => {
  const headerConfig = useMemo(() => {
    if (toolbar) {
      return toolbar;
    }

    if (!title && !description) {
      return undefined;
    }

    return {
      title: title ?? '',
      subtitle: description,
    };
  }, [description, title, toolbar]);

  // Use custom hooks for data management
  const { memoizedData = [], emptyStateContent } = useTableData(dataSource, emptyContent);

  // Use custom hooks for state management
  const { selectedRow, selectedRows, sorting, setSorting, handleRowSelectionChange } = useTableState(memoizedData, rowKey, rowsSelection);

  // Use custom hooks for columns management
  const { memoizedColumns, columnInitialSize, selectedColumns, columnOrder, setColumnOrder, handleSelectedColumns } = useTableColumns(
    columns,
    rowsSelection,
    rowAction,
    columnSelector,
    draggable,
  );

  // Use custom hooks for filter input management
  const { memoizedFilterCondition, handleFilterInputChange } = useTableFilterInput(filter);

  /** Tracks the column key that was most recently added via "Weitere Filter" so the
   * corresponding DataTableFilterInput can auto-open its popover. */
  const [lastAddedFilterKey, setLastAddedFilterKey] = useState<keyof T | null>(null);

  /**
   * Wraps the user-supplied onSelectedFilterableColumnKeysChange to also clear
   * any active filter conditions for columns that are being deselected.
   *
   * Without this, removing a column from the "Weitere Filter" popover would
   * hide its input but leave its filter condition active – the data would keep
   * being filtered by an invisible, unreachable criterion.
   */
  const handleMoreFilterSelectionChange = useCallback(
    (nextKeys: (keyof T)[]) => {
      const nextKeySet = new Set(nextKeys.map(String));

      // Determine which keys were just removed so we can clear their conditions
      const removedKeys = (filter?.selectedFilterableColumnKeys ?? []).filter(key => !nextKeySet.has(String(key)));

      // Detect which key was freshly added (at most one per interaction)
      const currentKeySet = new Set((filter?.selectedFilterableColumnKeys ?? []).map(String));
      const newlyAdded = nextKeys.find(key => !currentKeySet.has(String(key)));
      if (newlyAdded !== undefined) {
        setLastAddedFilterKey(newlyAdded);
      }

      // Clear the filter condition for each removed column by setting it to null.
      // The hook's reduce step skips null/falsy entries, so the key is effectively
      // removed from the active filter state after the merge.
      if (removedKeys.length > 0 && memoizedFilterCondition) {
        const clearedCondition = removedKeys.reduce(
          (acc, key) => {
            acc[key] = null;
            return acc;
          },
          {} as Partial<FilterState<T>>,
        );

        handleFilterInputChange(clearedCondition as FilterState<T>);
      }

      filter?.onSelectedFilterableColumnKeysChange?.(nextKeys);
    },
    [filter, memoizedFilterCondition, handleFilterInputChange],
  );

  // Reference to the table container for virtualization
  const tableContainerRef = useRef<HTMLDivElement>(null);

  // Reference to the outer wrapper for auto-height measurement
  const outerBoxRef = useRef<HTMLElement>(null);

  // Whether the table should expand to fill available vertical space
  const isAutoHeight = tableHeight === 'auto';

  // Compute auto-height via ResizeObserver when tableHeight="auto"
  const autoHeight = useAutoTableHeight({ outerRef: outerBoxRef, tableContainerRef, enabled: isAutoHeight });

  // Calculate row height based on table size
  const ROW_HEIGHT = tableSizes[size] || DEFAULT_ROW_HEIGHT;

  // Style for the table header
  const styles: TableStyle = useMemo(() => {
    return {
      header: { backgroundColor: headerStyle?.backgroundColor },
      headerText: { color: headerStyle?.color },
    };
  }, [headerStyle]);

  // Initialize the table instance with all necessary features
  const table = useReactTable({
    data: memoizedData,
    columns: memoizedColumns as ColumnDef<T, unknown>[],
    enableRowSelection: rowsSelection?.enabled ?? false,
    enableSorting: true,
    enableColumnResizing: columnResize?.enabled ?? false,
    defaultColumn: {
      minSize: COLUMN_MIN_SIZE, // Set minimum width for all columns
    },
    state: {
      rowSelection: selectedRow,
      columnOrder,
    },
    initialState: {
      pagination: {
        pageSize: Math.max(memoizedData?.length || 0, DEFAULT_PAGE_SIZE),
      },
    },
    onColumnOrderChange: setColumnOrder,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onRowSelectionChange: handleRowSelectionChange,
    getRowId: (row: T, index: number) => String(rowKey ? row[rowKey as keyof T] : index),
  });

  const { setColumnSizing, setPageSize, getHeaderGroups, getRowModel, getAllLeafColumns, getState } = table;

  // Get column sizing information
  const {
    columnSizingInfo: { isResizingColumn, deltaOffset },
    columnSizing: columnSizingState,
  } = getState();

  const headerGroups = getHeaderGroups();
  const allLeafColumns = getAllLeafColumns();
  const { rows } = getRowModel();

  // Use custom hook for column resizing
  const { handleAutoResize, handleAutoResizeAll } = useDataTableResizing({
    setColumnSizing,
    columnResize,
    columnAction,
    columnSizingState,
    columnInitialSize,
    allLeafColumns,
    rows,
  });

  // Update pagination when data changes
  useEffect(() => {
    if (memoizedData.length) {
      setPageSize(memoizedData.length);
    }
  }, [memoizedData.length, setPageSize]);

  /**
   * Static context for DataTable
   * Contains configuration props and callbacks to eliminate props drilling
   */
  const staticContext = useMemo(
    () => ({
      hasColumnSeparator,
      size,
      rowHeight: ROW_HEIGHT,
      rowsSelection,
      columns,
      rowKey,
      tableHeight,
      autoHeight,
      columnAction,
      cellEdit,
      columnOrder,
      draggable,
      onHeaderClick,
      onRowClick,
      setColumnOrder,
      styles,
    }),
    [
      hasColumnSeparator,
      size,
      ROW_HEIGHT,
      rowsSelection,
      columns,
      rowKey,
      tableHeight,
      autoHeight,
      columnAction,
      cellEdit,
      columnOrder,
      draggable,
      onHeaderClick,
      onRowClick,
      setColumnOrder,
      styles,
    ],
  );

  /**
   * Dynamic context for DataTable
   * Contains state and callbacks to eliminate props drilling
   */
  const dynamicContext = useMemo(
    () => ({ sorting, setSorting, handleAutoResize, handleAutoResizeAll }),
    [sorting, setSorting, handleAutoResize, handleAutoResizeAll],
  );

  // Check if rows selection action is visible
  const isVisibleRowsSelectionAction = rowsSelection?.enabled && selectedRows.length > 0 && (rowsSelection?.menuItems || []).length > 0;

  // Check if rows selection is enabled but no menu items are provided
  if (rowsSelection?.enabled && !rowsSelection.menuItems.length) {
    console.warn(
      "DataTable: Rows selection is enabled but no menu items are provided. Please provide at least one menu item. E.g: rowsSelection={{ enabled: true, menuItems: [{ label: 'Delete', icon: 'Trash2', onClick: (record) => console.log('Delete', record) }]}",
    );
  }

  // Check if row action is enabled but no menu items are provided
  if (rowAction?.enabled && !rowAction.menuItems.length) {
    console.warn(
      "DataTable: Row action is enabled but no menu items are provided. Please provide at least one menu item. E.g: rowAction={{ enabled: true, menuItems: [{ label: 'Delete', type: DropdownItem.Default, icon: 'Trash2', onClick: (record) => console.log('Delete', record) }]}",
    );
  }

  const isTopActionVisible = globalSearch?.enabled || columnSelector?.enabled || filter?.enabled || datePicker?.enabled;

  const topActions = isTopActionVisible ? (
    <Box className={cn('flex flex-wrap items-center gap-3 relative', isVisibleRowsSelectionAction && 'opacity-20 pointer-events-none')}>
      {/* {isVisibleRowsSelectionAction && <DataTableSelectedAction selectedRows={selectedRows} rowActions={rowsSelection?.menuItems || []} />} */}
      {globalSearch?.enabled && <DataTableGlobalSearch {...globalSearch} />}
      {datePicker?.enabled && <DataTableDatePicker {...datePicker} />}
      {filter?.enabled &&
        filter.filterableColumns.length > 0 &&
        // When selectedFilterableColumnKeys is controlled (onSelectedFilterableColumnKeysChange provided),
        // only render filter inputs for the currently selected column keys.
        // Otherwise render all filterable columns (backward-compatible behaviour).
        filter.filterableColumns
          .filter(column => {
            if (!filter.onSelectedFilterableColumnKeysChange) return true;
            return (filter.selectedFilterableColumnKeys ?? []).includes(column.columnKey);
          })
          .map(column => (
            <DataTableFilterInput
              key={column.columnKey.toString()}
              onChange={handleFilterInputChange}
              value={memoizedFilterCondition?.[column.columnKey]?.value}
              operator={memoizedFilterCondition?.[column.columnKey]?.operator}
              options={'options' in column ? (column.options ?? []) : []}
              mode={'mode' in column ? (column.mode ?? FilterInputMode.MULTI) : FilterInputMode.MULTI}
              columnKey={column.columnKey}
              valueType={column.valueType}
              autoOpen={column.columnKey === lastAddedFilterKey}
              onAutoOpenComplete={() => setLastAddedFilterKey(null)}
            />
          ))}
      {/* "Weitere Filter" button – only shown when the caller supplies a selection-change handler */}
      {filter?.enabled && filter.filterableColumns.length > 0 && filter.onSelectedFilterableColumnKeysChange && (
        <DataTableMoreFilter
          filterableColumns={filter.filterableColumns}
          selectedKeys={filter.selectedFilterableColumnKeys ?? []}
          onSelectionChange={handleMoreFilterSelectionChange}
        />
      )}
      {filter?.enabled && filter.hasFilterSaving && (
        <DataTableSaveFilter conditions={memoizedFilterCondition} presets={filter.presets} onSavePreset={filter.onSavePreset} />
      )}
      {columnSelector?.enabled && <DataTableColumnSelector {...columnSelector} onChange={handleSelectedColumns} />}
    </Box>
  ) : null;

  // Render the table with either virtualization or standard pagination
  return (
    <DataTableStaticProvider<T> value={staticContext}>
      <Box ref={outerBoxRef} className={cn('flex flex-col gap-6 w-full', isAutoHeight && 'h-full min-h-0 overflow-hidden')}>
        {/** Toolbar: AppHeader with composed top actions */}
        {(headerConfig || isTopActionVisible) && (
          <Box className="flex flex-col gap-6">
            {headerConfig && <AppHeader {...headerConfig} />}
            {topActions}
          </Box>
        )}

        {/** Table Container */}
        <Box className="relative">
          <DataTableDynamicProvider<T> value={dynamicContext}>
            <DataTableContainer
              containerRef={tableContainerRef}
              onScrollEnd={onScrollEnd}
              isLoading={isLoading}
              rowLength={rows.length}
              rowHeight={ROW_HEIGHT}
              setColumnOrder={setColumnOrder}
            >
              <DataTableHeader
                headerGroups={headerGroups}
                selectedColumns={selectedColumns || columns}
                columnSizingId={isResizingColumn}
                columnSizingDeltaOffset={deltaOffset}
              />
              {rows.length > 0 ? (
                <DataTableBody
                  tableContainerRef={tableContainerRef}
                  rows={rows}
                  columnSizingId={isResizingColumn}
                  columnSizingDeltaOffset={deltaOffset}
                  columnSize={columnSizingState}
                  selectedColumns={selectedColumns || columns}
                />
              ) : (
                <DataTableEmpty colSpan={memoizedColumns.length} emptyContent={emptyStateContent} />
              )}
            </DataTableContainer>
          </DataTableDynamicProvider>
          {isVisibleRowsSelectionAction && <DataTableSelectedAction selectedRows={selectedRows} rowActions={rowsSelection?.menuItems || []} />}
        </Box>
      </Box>
    </DataTableStaticProvider>
  );
};

export default DataTable;
