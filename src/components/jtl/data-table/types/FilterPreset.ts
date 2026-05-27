import FilterState from './FilterState';

/**
 * Props for the Filter Preset
 */
type FilterPreset<T> = {
  label: string;
  value: Partial<FilterState<T>>;
};

export default FilterPreset;
