import { IDataTableGlobalSearchProps } from '../components';

/**
 * Props for the global search feature
 */
type GlobalSearchHandler = IDataTableGlobalSearchProps & {
  /**
   * If true, enables the global search feature.
   */
  enabled?: boolean;
};

export default GlobalSearchHandler;
