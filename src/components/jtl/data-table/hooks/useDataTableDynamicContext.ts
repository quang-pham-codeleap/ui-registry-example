import { useContext } from 'react';
import { DataTableDynamicContext } from '../context';
import { DataTableDynamicContextValue } from '../types';

/**
 * Custom hook to access DataTable context
 * Provides error handling if used outside of provider
 * Uses type assertion to properly type the context value for the specific component
 */
export default function useDataTableDynamicContext<T extends object>(): DataTableDynamicContextValue<T> {
  const context = useContext(DataTableDynamicContext);

  if (!context) {
    throw new Error('useDataTableDynamicContext must be used within a DataTableDynamicProvider');
  }

  return context as DataTableDynamicContextValue<T>;
}
