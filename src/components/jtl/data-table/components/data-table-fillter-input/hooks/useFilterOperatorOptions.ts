import { useCallback, useMemo } from 'react';
import { DropdownItem } from '../../../../jtl-dropdown';
import { FilterConditionOperator, operatorShortcutObject, operatorTextObject } from '../../../deprecated/advanced-filter/types';
import { SelectItem } from '../../../../select';
import { FilterValueType } from '../../../types';
import { COMPARABLE_OPERATORS, BOOLEAN_OPERATORS, STRING_OPERATORS, DATE_OPERATORS } from '../../../constants';

/**
 * Custom hook to generate operator options for filter based on column value type
 * @param handleChangeOperator - Function to update selected operator
 * @param valueType - The column value type (defaults to STRING)
 * @param labelOverrides - Optional operator label overrides (e.g., for date filters to show "innerhalb" instead of "ist einer")
 * @returns Function to render operator and function to get operator options
 */
const useFilterOperatorOptions = (
  handleChangeOperator: (operator: FilterConditionOperator) => void,
  valueType: FilterValueType = FilterValueType.STRING,
  labelOverrides?: Partial<Record<FilterConditionOperator, string>>,
) => {
  const supportedOperators = useMemo(() => {
    const operatorByValueType = {
      [FilterValueType.NUMBER]: COMPARABLE_OPERATORS,
      [FilterValueType.DATE]: DATE_OPERATORS,
      [FilterValueType.BOOLEAN]: BOOLEAN_OPERATORS,
      [FilterValueType.STRING]: STRING_OPERATORS,
    };
    return operatorByValueType[valueType] || STRING_OPERATORS;
  }, [valueType]);

  const renderSelectLabelValue = useCallback(
    (operator: FilterConditionOperator) => {
      return {
        label: labelOverrides?.[operator] ?? operatorTextObject[operator],
        value: operator,
      };
    },
    [labelOverrides],
  );

  /**
   * Operator options for Select component, filtered by value type
   */
  const operatorOptions: SelectItem[] = useMemo(() => supportedOperators.map(renderSelectLabelValue), [supportedOperators, renderSelectLabelValue]);

  const renderOperator = useCallback(
    (operator: FilterConditionOperator) => {
      return {
        type: DropdownItem.Default,
        shortcut: operatorShortcutObject[operator],
        label: labelOverrides?.[operator] ?? operatorTextObject[operator],
        onClick: () => handleChangeOperator(operator),
      };
    },
    [handleChangeOperator, labelOverrides],
  );

  /**
   * Get the appropriate operator options based on the column type
   */
  const getOperatorOptions = useCallback(() => {
    return supportedOperators.map(renderOperator);
  }, [renderOperator, supportedOperators]);

  return { renderOperator, getOperatorOptions, operatorOptions };
};

export default useFilterOperatorOptions;
