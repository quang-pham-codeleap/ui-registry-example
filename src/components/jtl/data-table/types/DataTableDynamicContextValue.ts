import SortingState from './SortingState';

/**
 * Data Table Dynamic Context Value interface
 * Contains shared state and callbacks to eliminate props drilling
 */
type DataTableDynamicContextValue<T extends object> = {
  sorting?: SortingState;
  setSorting?: (sorting: SortingState | undefined) => void;

  // Auto Resize
  handleAutoResize?: (columnKey: keyof T) => void;
  handleAutoResizeAll?: () => void;
};

export default DataTableDynamicContextValue;
