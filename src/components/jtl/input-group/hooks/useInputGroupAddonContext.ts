import { useContext } from 'react';
import { InputGroupAddonContext } from '../context/InputGroupAddonContext';
import { InputGroupAddonContextValue } from '../types';

/**
 * Hook to access InputGroupAddon context.
 * Returns the default context value when used outside of an InputGroupAddon provider.
 * Emits a dev-mode warning when used without a provider to aid debugging.
 * @returns InputGroupAddon context value
 */
export default function useInputGroupAddonContext(): InputGroupAddonContextValue {
  const context = useContext(InputGroupAddonContext);

  if (process.env.NODE_ENV !== 'production' && !context) {
    console.warn('[useInputGroupAddonContext] Hook used outside of InputGroupAddon. Make sure to wrap your component with <InputGroupAddon>.');
  }

  return context as InputGroupAddonContextValue;
}
