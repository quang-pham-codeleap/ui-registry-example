import FilterState from './FilterState';
import FilterPreset from './FilterPreset';
import FilterableColumn from './FilterableColumn';

/**
 * Base props shared by all filter handler variants
 */
type FilterHandlerBase<T> = {
  /**
   * Whether the filter is enabled
   */
  enabled: boolean;

  /**
   * The condition of the advanced filter
   * Use this prop to provide the saved condition of the advanced filter
   */
  condition?: Partial<FilterState<T>>;

  /**
   * Filter configuration for each column in the table
   * Define which columns should be filterable and how users can filter them.
   * Each field specifies the column key, filter mode (single/multi), and available options.
   *
   * @example
   * filterableColumns: [
   *   { columnKey: 'name', mode: 'multi', options: [...] },
   *   { columnKey: 'age', mode: 'single' },
   * ]
   */
  filterableColumns: FilterableColumn<T>[];

  /**
   * The callback function when the filter value changes
   * @param value
   * @returns
   */
  onChange?: (value?: Partial<FilterState<T>>) => void;

  // =========================================================================
  // Filter Preset Optional Props
  // =========================================================================

  /**
   * Optional boolean to enable the Filter Saving Feature.
   * When enabled, the filter save button will be displayed on the table top action bar
   */
  hasFilterSaving?: boolean;

  /**
   * The presets of the filter input
   * Use this prop to provide presets that saved by user and displayed on the filter saving popup
   */
  presets?: FilterPreset<T>[];

  /**
   * The callback function when the user saves a preset
   * @param preset
   * @returns
   */
  onSavePreset?: (preset: FilterPreset<T>[]) => void;
};

/**
 * Controlled "More Filters" mode.
 * Both props MUST be provided together — omitting one while supplying the
 * other is a TypeScript error. This prevents the silent UX bug where the
 * "More Filters" button appears but no filter inputs are rendered because
 * `selectedFilterableColumnKeys` was accidentally left out.
 */
type WithMoreFilter<T> = {
  /**
   * The currently selected filterable column keys.
   * Only filter inputs for these columns are shown in the toolbar.
   * Pass an empty array to explicitly show no filter inputs.
   * Must be provided together with `onSelectedFilterableColumnKeysChange`.
   */
  selectedFilterableColumnKeys: (keyof T)[];

  /**
   * Callback fired when the user changes the active filter column selection
   * via the "More Filters" popover. Providing this prop enables that button.
   * Must be provided together with `selectedFilterableColumnKeys`.
   * @param selectedKeys - The new array of selected column keys
   */
  onSelectedFilterableColumnKeysChange: (selectedKeys: (keyof T)[]) => void;
};

/**
 * Standard mode — no "More Filters" button.
 * All filterable columns are always shown.
 * Neither prop may be supplied individually; they must come as a pair.
 */
type WithoutMoreFilter = {
  selectedFilterableColumnKeys?: never;
  onSelectedFilterableColumnKeysChange?: never;
};

/**
 * Props for the Filter Handler.
 *
 * The controlled "More Filters" feature uses a **discriminated union**:
 * - Provide BOTH `selectedFilterableColumnKeys` and `onSelectedFilterableColumnKeysChange`
 *   to enable the "More Filters" button with controlled selection state.
 * - Omit BOTH to fall back to the standard mode where all filterable columns
 *   are always shown (fully backward-compatible).
 * - Providing only one of the two is a TypeScript error.
 */
type FilterHandler<T> = FilterHandlerBase<T> & (WithMoreFilter<T> | WithoutMoreFilter);

export default FilterHandler;
