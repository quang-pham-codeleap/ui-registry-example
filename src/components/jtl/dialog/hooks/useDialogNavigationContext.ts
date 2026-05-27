import { DialogNavigationContext } from '../context';
import { useContext } from 'react';
import { DialogNavigationContextValue } from '../types';

/**
 * Hook to access DialogNavigation context.
 * Throws if used outside a `DialogNavigation` tree.
 *
 * @returns The navigation context value
 * @throws Error if no `DialogNavigation` ancestor exists
 */
export default function useDialogNavigationContext(): DialogNavigationContextValue {
  const context = useContext(DialogNavigationContext);

  if (!context) {
    throw new Error('useDialogNavigationContext must be used within a <DialogNavigation> component');
  }

  return context;
}
