import { FilterHandler, FilterState } from '../types';
import { useState } from 'react';

export default function useTableFilterInput<T extends object>(filterInput?: FilterHandler<T>) {
  const [filterValue, setFilterValue] = useState<Partial<FilterState<T>> | undefined>(undefined);

  const memoizedFilterCondition = filterInput?.condition === undefined ? filterValue : filterInput?.condition;

  const handleFilterInputChange = (value?: FilterState<T>) => {
    console.log('Received filter input change:', value);
    const newFilterValue = { ...(memoizedFilterCondition || {}), ...value } as Partial<FilterState<T>>;

    // Filter out fields where value is not an array or is empty
    const filteredValue = Object.keys(newFilterValue).reduce(
      (acc, key) => {
        const fieldValue = newFilterValue[key as keyof T];
        if (fieldValue && Array.isArray(fieldValue.value) && fieldValue.value.length > 0) {
          acc[key as keyof T] = fieldValue;
        }
        return acc;
      },
      {} as Partial<FilterState<T>>,
    );

    // If filteredValue is empty, set value and onChange to undefined
    const finalValue = Object.keys(filteredValue).length === 0 ? undefined : filteredValue;

    console.log('Filter input changed:', finalValue);

    setFilterValue(finalValue);
    filterInput?.onChange?.(finalValue);
  };

  return {
    memoizedFilterCondition,
    handleFilterInputChange,
  };
}
