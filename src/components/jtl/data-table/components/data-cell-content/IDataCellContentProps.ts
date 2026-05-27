import { ColumnAlign } from '../../../table/types';

export default interface IDataCellContentProps {
  /**
   * Text content to display in the cell
   */
  text: string;
  /**
   * Text alignment in the cell
   */
  align?: ColumnAlign;
}
