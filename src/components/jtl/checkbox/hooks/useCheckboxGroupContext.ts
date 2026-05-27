import { CheckboxGroupContext } from '../context';
import { useContext } from 'react';
import { CheckboxGroupContextValue } from '../types';

/**
 * Hook to access CheckboxGroup context
 * Returns undefined if not within a CheckboxGroup
 */
export default function useCheckboxGroupContext(): CheckboxGroupContextValue | undefined {
  return useContext(CheckboxGroupContext);
}
