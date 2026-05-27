import { CellEditHandler, EditableConfig } from '../../../types';
import { ITableColumnProps } from '../../../../table';

/**
 * Configuration returned from editable cell resolution.
 * Represents either a valid EditableConfig or null if not editable.
 */
export type ResolvedEditableConfig = EditableConfig | null;

/**
 * Parameters for resolving editable configuration.
 *
 * Used by the resolveEditableConfig function to determine
 * whether a cell is editable and what configuration to use.
 *
 * @template T - The type of the data record (must extend object)
 */
type EditableResolutionParam<T extends object> = {
  /** Cell edit handler containing the onSave callback */
  cellEdit: CellEditHandler<T> | undefined;
  /** Whether this is the selection checkbox column */
  isSelectionColumn: boolean;
  /** Whether this is the action buttons column */
  isActionColumn: boolean;
  /** The column definition containing editable configuration */
  columnDef: ITableColumnProps<T> | undefined;
  /** The data record for the current row */
  record: T;
  /** The index of the current row */
  rowIndex: number;
};

export default EditableResolutionParam;
