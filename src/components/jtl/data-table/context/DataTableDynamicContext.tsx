import React, { createContext, useMemo } from 'react';
import { DataTableDynamicContextValue } from '../types';

/**
 * DataTable context - provides shared state to eliminate props drilling
 */
const DataTableDynamicContext = createContext<unknown>(null);

/**
 * Props for DataTableProvider component
 */
interface DataTableDynamicProviderProps<T extends object> {
  children: React.ReactNode;
  value: DataTableDynamicContextValue<T>;
}

/**
 * DataTableProvider component
 */
const DataTableDynamicProvider = <T extends object>({ children, value }: DataTableDynamicProviderProps<T>) => {
  const memoizedValue = useMemo(() => value, [value]);

  return <DataTableDynamicContext value={memoizedValue}>{children}</DataTableDynamicContext>;
};

export { DataTableDynamicProvider, DataTableDynamicContext };
