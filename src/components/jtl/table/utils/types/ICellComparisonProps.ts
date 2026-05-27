import type { ITableColumnProps } from '../../interfaces';

/**
 * Props interface for cell comparison
 */
type ICellComparisonProps<T extends object> = {
  hasColumnSeparator?: boolean;
  cellsLength: number;
  isSelected?: boolean;
  columnSizingId: string | false;
  columnSizingDeltaOffset: number | null;
  columnSizeNumber?: number;
  rowIndex: number;
  cell: {
    id: string;
    column: {
      id: string;
    };
  };
  record: T;
  columns?: ITableColumnProps<T>[];
};

export default ICellComparisonProps;
