import { IDataTableColumnSelectorProps } from '../components';

/**
 * Props for the column selection feature
 */
type ColumnSelectorHandler<T extends object> = IDataTableColumnSelectorProps<T> & {
  /**
   * If true, enables the global search feature.
   */
  enabled?: boolean;
};

export default ColumnSelectorHandler;
