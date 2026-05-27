import ColumnSize from './ColumnSize';

/**
 * Props for the column resize feature
 * @param enabled If true, enables the column resize feature
 * @param onResize Callback fired when the column size changes
 */
type ColumnResizeHandler<T extends object> = {
  enabled: boolean;
  onResize: (columnSize: ColumnSize<T>) => void;
};

export default ColumnResizeHandler;
