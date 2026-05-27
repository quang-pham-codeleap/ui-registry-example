import { useContext } from 'react';
import { DataTableStaticContext } from '../context/DataTableStaticContext';
import { DataTableStaticContextValue } from '../types';

/**
 * Custom hook to access DataTable context
 * Provides error handling if used outside of provider
 * Uses type assertion to properly type the context value for the specific component
 */
export default function useDataTableStaticContext<T extends object>(): DataTableStaticContextValue<T> {
  const context = useContext(DataTableStaticContext);

  if (!context) {
    throw new Error('useDataTableStaticContext must be used within a DataTableStaticProvider');
  }

  return context as DataTableStaticContextValue<T>;
}
