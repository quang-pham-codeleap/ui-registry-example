import { IToggleMultipleGroupProps } from '../interfaces';
import { useState, useCallback } from 'react';

/**
 * Hook to handle multiple toggle group state
 */
export default function useMultipleToggleGroup(props: Partial<IToggleMultipleGroupProps>) {
  const { defaultValues = [], value, onChange, ...rest } = props;

  // State for tracking active values (controlled or uncontrolled)
  const [internalValues, setInternalValues] = useState<string[]>(defaultValues);

  // Determine if component is controlled
  const isControlled = value !== undefined;
  const activeValues = isControlled ? value : internalValues || [];

  // Handle toggle value change
  const toggleValue = useCallback(
    (values: string[]) => {
      // Update internal state if uncontrolled
      if (!isControlled) {
        setInternalValues(values);
      }

      // Call onChange if provided
      onChange?.(values);
    },
    [isControlled, onChange],
  );

  return { activeValues, toggleValue, extractedProps: rest };
}
