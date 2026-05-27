import { FilterConditionOperator } from '../deprecated/advanced-filter/types';

/**
 * Filter input value type
 * @template V - The value type of the column (e.g., string, number)
 */
type FieldFilter<V = unknown> = {
  value: V[];
  operator: FilterConditionOperator;
};

export default FieldFilter;
