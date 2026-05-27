import { useMemo, useState } from 'react';
import { FilterConditionOperator } from '../../../deprecated/advanced-filter/types';
import { FilterInputMode, FilterValueType } from '../../../types';

/**
 * Returns the appropriate default operator for the given value type and input mode.
 *
 * - DATE → In  ("innerhalb" — range picker by default)
 * - CUSTOM_VALUE (single/text) with STRING → Contains ("enthält")
 * - Everything else → Equals
 */
const getDefaultOperator = (valueType?: FilterValueType, mode?: FilterInputMode): FilterConditionOperator => {
  if (valueType === FilterValueType.DATE) {
    return FilterConditionOperator.In;
  }
  if (mode === FilterInputMode.CUSTOM_VALUE && (!valueType || valueType === FilterValueType.STRING)) {
    return FilterConditionOperator.Contains;
  }
  return FilterConditionOperator.Equals;
};

/**
 * Custom hook to manage filter state (operator, value, search text)
 * @param value - External controlled value (optional)
 * @param operator - External controlled operator (optional)
 * @param mode - Filter mode ('single' or 'multi')
 * @param valueType - Column value type (used to determine default operator)
 * @returns Filter state and derived values
 */
const useDataTableFilterState = <T extends object>(
  value?: T[keyof T][],
  operator?: FilterConditionOperator,
  mode?: FilterInputMode,
  valueType?: FilterValueType,
) => {
  const defaultOperator = useMemo(() => getDefaultOperator(valueType, mode), [valueType, mode]);
  const [selectedOperator, setSelectedOperator] = useState<FilterConditionOperator>(defaultOperator);
  const [selectedValue, setSelectedValue] = useState<T[keyof T][]>([]);
  const [searchText, setSearchText] = useState('');

  /**
   * Internal value and operator are used to display the filter display
   * If value and operator are not provided, use the selected value and operator
   */
  const internalValue = value === undefined ? selectedValue : value;
  const internalOperator = operator === undefined ? selectedOperator : operator;

  const isFilterActive = internalValue.length > 0 && internalOperator;
  const isSingleMode = mode === FilterInputMode.CUSTOM_VALUE;

  return {
    selectedOperator,
    setSelectedOperator,
    selectedValue,
    setSelectedValue,
    searchText,
    setSearchText,
    internalValue,
    internalOperator,
    isFilterActive,
    isSingleMode,
  };
};

export default useDataTableFilterState;
