import { ITableColumnProps } from '../../../table';

/**
 * DataTableHeadActionProps interface
 */
export default interface IDataTableHeadActionProps<T extends object> {
  column: ITableColumnProps<T>;
}
