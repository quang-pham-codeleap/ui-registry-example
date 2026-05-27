import { ColumnActionEnum } from '../enums';

/**
 * Column action type
 */
type ColumnAction = keyof typeof ColumnActionEnum;

export default ColumnAction;
