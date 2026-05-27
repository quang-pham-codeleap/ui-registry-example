import { Table as TablePrimitive } from './components/TablePrimitive';
import ITableProps from './ITableProps';
import { Text } from '../text';
import { useMemo, useState, useCallback } from 'react';
import { TableHeader, TableBody, TableLoader } from './components';
import { ScrollArea } from '../scroll-area';
import { TableStyle } from './types';
import { TableContext } from './context';
import { AppHeader } from '../app-header';
import { Box } from '../box';
import { TableToolbarConfig } from './types';

/**
 * Table component that provides a flexible way to display data in a tabular format
 * @param props {@link ITableProps} - The props for the Table component.
 * @returns A table component.
 *
 * @example
 * ```tsx
 * // Basic table example
 * interface DataType {
 *   name: string;
 *   age: number;
 *   address?: {
 *     street: string;
 *     city: string;
 *   };
 * }
 *
 * const App = () => {
 *   // Define columns
 *   const columns: ITableColumnProps<DataType>[] = [
 *     {
 *       title: 'Name',
 *       dataIndex: 'name',
 *       key: 'name',
 *     },
 *     {
 *       title: 'Age',
 *       dataIndex: 'age',
 *       key: 'age',
 *     },
 *     {
 *       title: 'Street',
 *       dataIndex: 'address.street',
 *       key: 'street',
 *     },
 *   ];
 *
 *   // Sample data
 *   const data: DataType[] = [
 *     {
 *       name: 'John Brown',
 *       age: 32,
 *       address: {
 *         street: 'No. 1 Lake Park',
 *         city: 'New York',
 *       },
 *     },
 *     {
 *       name: 'Jim Green',
 *       age: 42,
 *       address: {
 *         street: 'No. 3 Lake Park',
 *         city: 'London',
 *       },
 *     },
 *     {
 *       name: 'Joe Black',
 *       age: 32,
 *     },
 *   ];
 *
 *   return (
 *     <Table
 *       columns={columns}
 *       dataSource={data}
 *     />
 *   );
 * };
 *
 * export default App;
 * ```
 *
 * @example
 * ```tsx
 * // Advanced table with custom cell rendering and interactive elements
 * interface DataType {
 *   name: string;
 *   role: string;
 *   email: string;
 *   roleEditable?: boolean;
 * }
 *
 * const App = () => {
 *   // Define columns with custom rendering functions
 *   const columns: ITableColumnProps<DataType>[] = [
 *     {
 *       title: 'Name',
 *       dataIndex: 'name',
 *       key: 'name',
 *       render: (text, record) => (
 *         <div>
 *           <Label>{text}</Label>
 *           <Text type="muted">{record.email}</Text>
 *         </div>
 *       ),
 *     },
 *     {
 *       title: 'Role',
 *       dataIndex: 'role',
 *       key: 'role',
 *       render: (role, record) => {
 *         if (record.roleEditable) {
 *           return (
 *             <Select
 *               options={[
 *                 { label: 'Manager', value: 'manager' },
 *                 { label: 'Developer', value: 'developer' },
 *                 { label: 'Designer', value: 'designer' },
 *                 { label: 'QA', value: 'qa' },
 *               ]}
 *               value={role as string}
 *             />
 *           );
 *         }
 *         return <Badge label={String(role).charAt(0).toUpperCase() + String(role).slice(1)} variant="outline" />;
 *       },
 *     },
 *     {
 *       title: '',
 *       dataIndex: '',
 *       key: 'action',
 *       render: () => <Button variant="outline" label="Remove from organization" />,
 *     },
 *   ];
 *
 *   // Sample data
 *   const dataSource: DataType[] = [
 *     {
 *       name: 'John Brown',
 *       role: 'manager',
 *       email: 'john.brown@example.com',
 *     },
 *     {
 *       name: 'Jim Green',
 *       role: 'developer',
 *       email: 'jim.green@example.com',
 *       roleEditable: true,
 *     },
 *   ];
 *
 *   return (
 *     <Table
 *       columns={columns}
 *       dataSource={dataSource}
 *       onRowClick={(record) => console.log('Row clicked:', record)}
 *       hasColumnSeparator={true}
 *       size="sm"
 *     />
 *   );
 * };
 *
 * export default App;
 * ```
 *
 * @example
 * ```tsx
 * // Table with expandable rows
 * interface AppDataType {
 *   name: string;
 *   version: string;
 *   description: string;
 *   expandable?: boolean;
 * }
 *
 * const App = () => {
 *   const columns: ITableColumnProps<AppDataType>[] = [
 *     {
 *       title: 'App Name',
 *       dataIndex: 'name',
 *       key: 'name',
 *     },
 *     {
 *       title: 'Version',
 *       dataIndex: 'version',
 *       key: 'version',
 *     },
 *   ];
 *
 *   const dataSource: AppDataType[] = [
 *     {
 *       name: 'JTL Shop',
 *       version: '1.0.0',
 *       description: 'Complete e-commerce solution with advanced features',
 *     },
 *     {
 *       name: 'JTL WMS',
 *       version: '2.1.0',
 *       description: 'Warehouse management system for efficient logistics',
 *     },
 *     {
 *       name: 'Not Expandable App',
 *       version: '1.5.0',
 *       description: 'This app cannot be expanded',
 *     },
 *   ];
 *
 *   return (
 *     <Table
 *       columns={columns}
 *       dataSource={dataSource}
 *       expandable={{
 *         expandedRowRender: (record) => (
 *           <div className="p-4 bg-[var(--background)] rounded border">
 *             <p className="text-sm text-[var(--foreground-muted)]">
 *               {record.description}
 *             </p>
 *           </div>
 *         )
 *       }}
 *     />
 *   );
 * };
 *
 * export default App;
 * ```
 */
const Table = <T extends object>({
  columns,
  dataSource,
  isLoading = false,
  emptyContent,
  hasColumnSeparator = false,
  hasHeader = true,
  size = 'md',
  height = 500,
  onRowClick,
  expandable,
  headerStyle,
  toolbar,
  title,
  description,
}: ITableProps<T>) => {
  const headerConfig: TableToolbarConfig | undefined = useMemo(() => {
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

  // Store the calculated height of the table
  const [calculatedHeight, setCalculatedHeight] = useState(0);

  /**
   * Memoized empty state content
   */
  const emptyStateContent = useMemo(
    () =>
      emptyContent || (
        <Text type="body" align="center">
          Keine Daten verfügbar
        </Text>
      ),
    [emptyContent],
  );

  const handleTableRef = useCallback(
    (node: HTMLTableElement | null) => {
      if (node) {
        const newHeight = node.getBoundingClientRect().height;
        if (newHeight !== calculatedHeight) {
          setCalculatedHeight(newHeight);
        }
      }
    },
    [calculatedHeight],
  );

  const isHeaderSeparator = useMemo(() => hasColumnSeparator === true || hasColumnSeparator === 'headerOnly', [hasColumnSeparator]);
  const isBodySeparator = useMemo(() => hasColumnSeparator === true || hasColumnSeparator === 'bodyOnly', [hasColumnSeparator]);

  /**
   * Use table-layout: fixed when any column has maxWidth.
   * Auto layout ignores max-width on th/td per CSS spec.
   * Fixed layout respects width constraints on cells.
   */
  const hasFixedLayout = useMemo(() => columns.some(col => col.maxWidth !== undefined), [columns]);

  const styles: TableStyle = {
    header: { backgroundColor: headerStyle?.backgroundColor },
    headerText: { color: headerStyle?.color },
  };

  return (
    <Box className="space-y-4">
      {headerConfig && <AppHeader {...headerConfig} />}
      <TableContext value={{ ...styles }}>
        <ScrollArea
          className="border border-[var(--border)] rounded-[var(--border-radius-default)]"
          style={calculatedHeight < height ? {} : { height }}
        >
          <TablePrimitive ref={handleTableRef} className={hasFixedLayout ? 'table-fixed' : undefined}>
            {hasHeader && <TableHeader columns={columns} hasColumnSeparator={isHeaderSeparator} hasExpandableRows={!!expandable} />}
            <TableBody
              dataSource={dataSource}
              columns={columns}
              emptyStateContent={emptyStateContent}
              hasColumnSeparator={isBodySeparator}
              size={size}
              onRowClick={onRowClick}
              expandable={expandable}
            />
          </TablePrimitive>
          {isLoading && <TableLoader />}
        </ScrollArea>
      </TableContext>
    </Box>
  );
};

Table.displayName = 'Table';

export default Table;
