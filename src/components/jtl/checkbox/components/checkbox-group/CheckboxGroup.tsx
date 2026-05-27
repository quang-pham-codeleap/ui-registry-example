import React, { useState, useCallback, useMemo } from 'react';
import { cn } from '@/lib/utils';
import Checkbox from '../../Checkbox';
import ICheckboxGroupProps from './ICheckboxGroupProps';
import { CheckboxGroupProvider } from '../../context/CheckboxGroupContext';
import { CheckboxGroupContextValue } from '../../types';
import { Box } from '../../../box';

/**
 * CheckboxGroup component that supports multiple usage patterns
 *
 * **Pattern 1: Options Array**
 * Pass an `options` array with {value, label} objects
 *
 * **Pattern 2: Children Checkboxes**
 * Pass individual Checkbox components as children with `value` props
 *
 * Supports both controlled and uncontrolled usage:
 * - Controlled: Use `value` and `onChange` props
 * - Uncontrolled: Use `defaultValue` prop
 *
 * @param props {@link ICheckboxGroupProps} - The component props
 * @returns The rendered checkbox group component
 *
 * @example
 * ```tsx
 * // Pattern 1: Options array
 * function App() {
 *   const [selectedValues, setSelectedValues] = useState<string[]>(['option1']);
 *   const options = [
 *     { value: 'option1', label: 'Option 1' },
 *     { value: 'option2', label: 'Option 2' },
 *   ];
 *
 *   return (
 *     <CheckboxGroup
 *       options={options}
 *       value={selectedValues}
 *       onChange={setSelectedValues}
 *     />
 *   );
 * }
 * ```
 *
 * @example
 * ```tsx
 * // Pattern 2: Children checkboxes (like Ant Design)
 * function App() {
 *   const [selectedValues, setSelectedValues] = useState<string[]>(['A']);
 *
 *   return (
 *     <CheckboxGroup value={selectedValues} onChange={setSelectedValues}>
 *       <div style={{ display: 'flex', gap: '16px' }}>
 *         <Checkbox value="A">Option A</Checkbox>
 *         <Checkbox value="B">Option B</Checkbox>
 *         <Checkbox value="C">Option C</Checkbox>
 *       </div>
 *     </CheckboxGroup>
 *   );
 * }
 * ```
 */
const CheckboxGroup: React.FC<ICheckboxGroupProps> = ({
  options,
  value,
  onChange,
  isDisabled = false,
  defaultValue,
  children,
  className,
  spacing = '2',
  ...props
}) => {
  // Internal state for uncontrolled usage
  const [internalValue, setInternalValue] = useState<(string | null)[]>(defaultValue || []);

  // Determine if component is controlled or uncontrolled
  const isControlled = value !== undefined;
  const currentValue = isControlled ? value : internalValue;

  /**
   * Handle individual checkbox change
   * Updates the selected values array by adding/removing the changed value
   */
  const handleCheckboxChange = useCallback(
    (checkboxValue: string | null, checked: boolean) => {
      const newValue = checked ? [...currentValue, checkboxValue] : currentValue.filter(v => v !== checkboxValue);

      // Update internal state for uncontrolled usage
      if (!isControlled) {
        setInternalValue(newValue);
      }

      // Call onChange callback with new values
      onChange?.(newValue);
    },
    [currentValue, isControlled, onChange],
  );

  // Context value for children checkboxes
  const contextValue: CheckboxGroupContextValue = useMemo(
    () => ({
      value: currentValue,
      disabled: isDisabled,
      toggleValue: handleCheckboxChange,
      isSelected: (checkboxValue: string | null) => currentValue.some(v => v === checkboxValue),
    }),
    [currentValue, isDisabled, handleCheckboxChange],
  );

  // Determine rendering pattern: options array or children
  const hasOptions = options && options.length > 0;
  const hasChildren = React.Children.count(children) > 0;

  // Render options pattern
  if (hasOptions && !hasChildren) {
    return (
      <div
        className={cn(
          `flex flex-col gap-[calc(var(--spacing)*${spacing})]`, // Stack checkboxes vertically with spacing
          isDisabled && 'opacity-50', // Visual disabled state
          className,
        )}
        {...props}
      >
        {options.map((option, index) => {
          const isChecked = currentValue.some(v => v === option.value);

          return (
            <Checkbox
              key={option.value ?? `option-${index}`}
              label={option.label}
              value={isChecked}
              disabled={isDisabled}
              onChange={checked => handleCheckboxChange(option.value, checked)}
            />
          );
        })}
      </div>
    );
  }

  // Render children pattern with context
  return (
    <CheckboxGroupProvider value={contextValue}>
      <div
        className={cn(
          isDisabled && 'opacity-50', // Visual disabled state for children pattern
          className,
        )}
        {...props}
      >
        {children}
        {/* Also render options if both are provided */}
        {hasOptions && (
          <Box className="flex flex-col gap-2">
            {options.map((option, index) => {
              const isChecked = currentValue.some(v => v === option.value);

              return (
                <Checkbox
                  key={option.value ?? `option-${index}`}
                  label={option.label}
                  value={isChecked}
                  disabled={isDisabled}
                  onChange={checked => handleCheckboxChange(option.value, checked)}
                />
              );
            })}
          </Box>
        )}
      </div>
    </CheckboxGroupProvider>
  );
};

export default CheckboxGroup;
