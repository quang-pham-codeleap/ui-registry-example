import { Column, Row } from '@tanstack/react-table';
import measureColumnWidth from './measureColumnWidth';

/**
 * Calculate the maximum width for each column based on header and cell content
 * @param table - TanStack Table instance
 * @returns Record mapping column IDs to their calculated maximum widths
 */
export default function calculateColumnMaxWidth<T extends object>(allLeafColumns: Column<T, unknown>[], rows: Row<T>[]): Record<keyof T, number> {
  try {
    const columnMaxWidth: Record<keyof T, number> = {} as Record<keyof T, number>;
    allLeafColumns.forEach(column => {
      const headerText = String(column.columnDef.header);
      const cellTexts = rows.map(r => String(r.getValue(column.id) ?? ''));

      const width = measureColumnWidth(headerText, cellTexts);

      columnMaxWidth[column.id as keyof T] = width;
    });

    return columnMaxWidth;
  } catch {
    return {} as Record<keyof T, number>;
  }
}
