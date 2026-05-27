import React, { createContext, useMemo } from 'react';
import { DataTableStaticContextValue } from '../types';

/**
 * DataTable context - provides shared state to eliminate props drilling
 */
const DataTableStaticContext = createContext<unknown>(null);

/**
 * Props for DataTableProvider component
 */
interface DataTableStaticProviderProps<T extends object> {
  children: React.ReactNode;
  value: DataTableStaticContextValue<T>;
}

/**
 * DataTableProvider component
 */
const DataTableStaticProvider = <T extends object>({ children, value }: DataTableStaticProviderProps<T>) => {
  const memoizedValue = useMemo(() => value, [value]);

  return <DataTableStaticContext value={memoizedValue}>{children}</DataTableStaticContext>;
};

export { DataTableStaticProvider, DataTableStaticContext };
