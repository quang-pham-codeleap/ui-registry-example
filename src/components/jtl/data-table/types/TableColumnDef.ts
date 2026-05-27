import { ColumnAlign, SortOrder } from '../../table/types';
import { CellContext, ColumnDef, ColumnDefTemplate, SortingFn } from '@tanstack/react-table';

type TableColumnDef<T extends object> = {
  accessorKey: string;
  id: string;
  header: string;
  cell: ColumnDefTemplate<CellContext<T, unknown>>;
  size?: number;
  enableSorting?: boolean;
  sortingFn?: SortingFn<T>;
  sortDescFirst?: boolean;
  meta?: ColumnDef<T, unknown>['meta'] & {
    className?: string;
    align?: ColumnAlign;
    defaultSortOrder?: SortOrder;
    sortDirections?: SortOrder[];
  };
};

export default TableColumnDef;
