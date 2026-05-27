import { useContext } from 'react';
import { InputGroupContext } from '../context';
import { InputGroupContextValue } from '../types';

/**
 * Hook to access InputGroup context.
 * Returns the default context value when used outside of an InputGroup provider.
 * Emits a dev-mode warning when used without a provider to aid debugging.
 * @returns InputGroup context value
 */
export default function useInputGroupContext(): InputGroupContextValue {
  const context = useContext(InputGroupContext);

  if (import.meta.env.MODE !== 'production' && !context) {
    console.warn('[useInputGroupContext] Hook used outside of InputGroup. Make sure to wrap your component with <InputGroup>.');
  }

  return context as InputGroupContextValue;
}
