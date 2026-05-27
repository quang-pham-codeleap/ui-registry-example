import { IAppHeaderProps } from '../../app-header';

/**
 * Configuration for the toolbar displayed above a Table or DataTable.
 *
 * Uses the standardized AppHeader component internally.
 * Why "toolbar"? Avoids confusion with the table's <thead> (column headers).
 */
type TableToolbarConfig = IAppHeaderProps;

export default TableToolbarConfig;
