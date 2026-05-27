import { useState, useCallback } from 'react';
import { IToggleSingleGroupProps } from '../interfaces';

/**
 * Hook to handle single toggle group state
 */
export default function useSingleToggleGroup(props: Partial<IToggleSingleGroupProps>) {
  const { defaultValue, value, onChange, ...rest } = props;

  // Initialize state with default value if provided
  const [internalValue, setInternalValue] = useState<string | undefined>(defaultValue);

  // Determine if component is controlled
  const isControlled = value !== undefined;
  const activeValue = isControlled ? value : internalValue;

  // Handle toggle value change
  const toggleValue = useCallback(
    (toggledValue: string) => {
      const updateValue = (currentValue: string | undefined) => {
        // If the same value is clicked again, deselect it
        if (currentValue === toggledValue) {
          return undefined;
        }
        return toggledValue;
      };

      // Update internal state if uncontrolled
      if (!isControlled) {
        setInternalValue(prev => updateValue(prev));
      }

      // Call onChange if provided
      if (onChange) {
        const newValue = updateValue(activeValue);
        onChange(newValue || '');
      }
    },
    [activeValue, isControlled, onChange],
  );

  return { activeValue, toggleValue, extractedProps: rest };
}
