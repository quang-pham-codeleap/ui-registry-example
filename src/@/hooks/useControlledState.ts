import { useCallback, useMemo, useState } from 'react';

/**
 * Type helper for onChange callbacks that can handle string-only callbacks
 * when the value might be string | undefined
 */
type ControlledStateCallback<T> = T extends string | undefined ? ((value: string) => void) | ((value: T) => void) : (value: T) => void;

/**
 * Custom hook to manage controlled/uncontrolled state pattern
 * Handles both controlled mode (when value and onChange are provided)
 * and uncontrolled mode (when using internal state)
 *
 * @param controlledValue The externally controlled value
 * @param defaultValue Default value for uncontrolled mode
 * @param onChange Callback for when value changes in controlled mode
 * @returns Object with value, setValue function, and isControlled flag
 */
export default function useControlledState<T, V extends T = T>(
  controlledValue: T | undefined,
  defaultValue: V,
  onChange?: ControlledStateCallback<T>,
) {
  // Internal state for uncontrolled mode
  const [internalValue, setInternalValue] = useState<V>(defaultValue);

  // Determine if we're in controlled mode
  const isControlled = useMemo(() => controlledValue !== undefined, [controlledValue]);

  // Use controlled value if available, otherwise use internal state
  const value = useMemo(() => (isControlled ? (controlledValue as T) : (internalValue as T)), [isControlled, controlledValue, internalValue]);

  // Handle value changes based on controlled/uncontrolled mode
  const setValue = useCallback(
    (newValue: T) => {
      if (onChange) {
        // Safe to call onChange now
        if (typeof newValue === 'string') {
          (onChange as (value: string) => void)(newValue);
        } else {
          (onChange as (value: T) => void)(newValue);
        }
      }
      setInternalValue(newValue as V);
    },
    [onChange],
  );

  return { value, setValue, isControlled };
}
