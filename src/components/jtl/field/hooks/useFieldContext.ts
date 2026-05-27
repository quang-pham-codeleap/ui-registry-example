import { useContext } from 'react';
import FieldContext, { IFieldContext } from '../context/FieldContext';

/**
 * useFieldContext — hook for consuming FieldContext in sub-components.
 *
 * Safe to call outside a Field provider — returns default values so components
 * degrade gracefully when used standalone.
 *
 * @returns The current FieldContext value
 *
 * @example
 * ```tsx
 * // Inside a custom sub-component
 * const { name, field } = useFieldContext();
 * ```
 */
export default function useFieldContext(): IFieldContext {
  return useContext(FieldContext);
}
