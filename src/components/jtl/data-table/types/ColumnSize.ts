/**
 * Column size type
 */
type ColumnSize<T> = Record<keyof T, number>;

export default ColumnSize;
