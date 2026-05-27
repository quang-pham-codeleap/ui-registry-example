import FieldFilter from './FieldFilter';

/**
 * Filter input object type
 * Maps each key of T to a FieldFilter with the corresponding value type
 * @example
 * type Data = { name: string; age: number };
 * FilterState<Data> = { name: FieldFilter<string> | null; age: FieldFilter<number> | null }
 */
type FilterState<T> = Partial<{ [K in keyof T]: FieldFilter<T[K]> | null }>;

export default FilterState;
