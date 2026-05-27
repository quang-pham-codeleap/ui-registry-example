import React, { useMemo } from 'react';
import { Text } from '../../text';
import { DEFAULT_EMPTY_MESSAGE } from '../constants/tableDefaults';

/**
 * Custom hook to manage table data processing and memoization
 * Handles data filtering, searching, and empty state content
 */
export default function useTableData<T extends object>(dataSource: T[], emptyContent?: React.ReactNode) {
  // Memoized data to prevent unnecessary re-renders
  // Guard against undefined/null during HMR to maintain stable data reference
  const memoizedData = useMemo(() => dataSource || [], [dataSource]);

  // Memoized empty state content
  const emptyStateContent = useMemo(
    () =>
      emptyContent ||
      React.createElement(Text, {
        children: DEFAULT_EMPTY_MESSAGE,
        align: 'center',
        type: 'body',
      }),
    [emptyContent],
  );

  return {
    memoizedData,
    emptyStateContent,
  };
}
