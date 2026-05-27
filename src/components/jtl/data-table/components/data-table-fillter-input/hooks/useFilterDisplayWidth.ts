import React, { useLayoutEffect, useState } from 'react';
import { FilterConditionOperator } from '../../../deprecated/advanced-filter/types';

/**
 * Custom hook to calculate and track filter display width
 * @param filterDisplayRef - Ref to the filter display element
 * @param selectedOperator - Current selected operator (for re-calculation trigger)
 * @param selectedValue - Current selected value (for re-calculation trigger)
 * @returns Current calculated width
 */
const useFilterDisplayWidth = <T extends object>(
  filterDisplayRef: React.RefObject<HTMLDivElement | null>,
  selectedOperator: FilterConditionOperator,
  selectedValue: T[keyof T][],
) => {
  const [width, setWidth] = useState(0);

  useLayoutEffect(() => {
    if (filterDisplayRef.current) {
      setWidth(filterDisplayRef.current.offsetWidth);
    }
  }, [filterDisplayRef, selectedOperator, selectedValue]);

  return width;
};

export default useFilterDisplayWidth;
