import { DialogNavigationContext } from '../context';
import { useContext } from 'react';
import { DialogNavigationContextValue } from '../types';

/**
 * Hook to optionally access DialogNavigation context.
 * Returns undefined if not within a `DialogNavigation` tree.
 *
 * Use this variant in components (e.g. `DialogHeader`) that must work
 * both inside and outside a `DialogNavigation`.
 *
 * @returns The navigation context value, or undefined if no provider exists
 */
export default function useOptionalDialogNavigationContext(): DialogNavigationContextValue | undefined {
  return useContext(DialogNavigationContext);
}
