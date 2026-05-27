import React, { useCallback, useMemo, useState } from 'react';
import { Root } from '@radix-ui/react-radio-group';
import { generateCustomID } from '@/utils';
import { Label } from '../label';
import { RadioContainer, RadioItem } from './RadioPrimitive';
import IRadioProps from './IRadioProps';
import { cn } from '@/lib/utils';
import { Box } from '../box';
import { ErrorMessage } from '../error-message';

/**
 * A Radio component that renders a group of radio buttons with labels and optional descriptions
 *
 * @param props {@link IRadioProps} - Props for the Radio component
 * @returns The rendered Radio component
 *
 * @example
 * ```tsx
 * // Basic usage with default settings
 * function App() {
 *   const [value, setValue] = useState<string>(undefined);
 *
 *   const listOptions = [
 *     { value: 'default', label: 'Default' },
 *     { value: 'comfortable', label: 'Comfortable' },
 *     { value: 'compact', label: 'Compact' },
 *   ];
 *
 *   return <Radio options={listOptions} value={value} onChange={setValue} />;
 * }
 * ```
 */
const Radio: React.FC<IRadioProps & Pick<React.ComponentPropsWithRef<typeof Root>, 'ref'>> = ({
  ref,
  options,
  value: selected,
  hasBorder = false,
  onChange,
  defaultValue,
  errorMessage,
  ...rest
}) => {
  const [internalValue, setInternalValue] = useState<string | number | undefined>(defaultValue);
  /**
   * Memoize IDs for each option to keep them stable across renders
   */
  const optionIds = useMemo(() => options.map(() => generateCustomID('radio-value')), [options]);

  /**
   * Check if the component is controlled
   */
  const isControlled = selected !== undefined;

  /**
   * If the component is controlled, use the selected value; otherwise, use the default value
   */
  const value = isControlled ? selected : internalValue;

  const handleValueChange = useCallback(
    (value: string) => {
      if (!isControlled) {
        setInternalValue(value); // Update internal state if not controlled
      }
      onChange?.(value); // Call the provided onValueChange function with the new value
    },
    [isControlled, onChange],
  );

  return (
    <div className="relative">
      <RadioContainer
        ref={ref}
        {...rest}
        defaultValue={String(defaultValue)}
        value={String(value)}
        onValueChange={handleValueChange}
        className={cn(hasBorder && 'border rounded-[var(--border-radius-md)] border-[var(--border)] gap-0')}
      >
        {options.map((option, index) => {
          const itemId = optionIds[index];
          const { label, description } = option;
          return (
            <div
              key={itemId}
              className={cn(
                'grid grid-flow-row gap-x-2',
                'grid-cols-2',
                hasBorder && 'p-3',
                hasBorder && index !== options.length - 1 ? 'border-b border-[var(--border)]' : '',
              )}
              style={{ gridTemplateColumns: '16px 1fr' }}
            >
              <Box className="flex items-center">
                <RadioItem
                  className={cn('align-baseline', !!errorMessage && '!border-[var(--danger-text)]')}
                  value={String(option.value)}
                  id={itemId}
                />
              </Box>
              {label && (
                <Box className="flex items-center leading-none">
                  <Label htmlFor={itemId} variant="subtitle" className={errorMessage ? 'text-[var(--danger-text)]' : 'text-[var(--foreground)]'}>
                    {label}
                  </Label>
                </Box>
              )}
              {label && description && <div className="empty-cell" />}
              {description && (
                <Box className="flex justify-start">
                  <Label variant="subtitle">{description}</Label>
                </Box>
              )}
            </div>
          );
        })}
      </RadioContainer>
      <ErrorMessage message={errorMessage} />
    </div>
  );
};
Radio.displayName = 'Radio';

export default Radio;
