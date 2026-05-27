import { FilterState } from '../../types';
import FilterPreset from '../../types/FilterPreset';

/**
 * Props for the Data Table Save Filter
 */
export default interface IDataTableSaveFilterProps<T> {
  /**
   * The current filter conditions to save
   */
  conditions?: Partial<FilterState<T>>;

  /**
   * The presets of the filter
   */
  presets?: FilterPreset<T>[];

  /**
   * The callback function when the user saves a preset
   * @param preset
   * @returns
   */
  onSavePreset?: (preset: FilterPreset<T>[]) => void;
}
