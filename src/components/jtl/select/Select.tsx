import React from 'react';
import { cn } from '@/lib/utils';
import ISelectProps from './ISelectProps';
import type { SelectGroup as SelectGroupType, SelectItem as SelectItemType } from './types';
import { Select as SelectContainer, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from './SelectPrimitives';
import { isSelectGroup, isValidValue } from './utils';
import { Text } from '../text';
import { Box } from '../box';

/**
 * Render select item to make sure if select item change, select will still have the same value
 */
const renderSelectItem = (key: string, option: SelectItemType) => (
  <SelectItem key={key} value={String(option.value)} disabled={option.disabled}>
    {option.label}
  </SelectItem>
);

/**
 * Render the select option based on the type of option
 */
const renderOption = (option: SelectGroupType | SelectItemType, index: number) => {
  const { label, value, children } = option as SelectGroupType & SelectItemType;

  if (isSelectGroup(option)) {
    return (
      <React.Fragment key={`group-${label}-${index}`}>
        <SelectLabel>{label}</SelectLabel>
        {children.map((item: SelectItemType, itemIndex: number) => {
          const { value: itemValue } = item;
          return isValidValue(itemValue) ? renderSelectItem(`child-${itemValue}-${itemIndex}`, item) : null;
        })}
      </React.Fragment>
    );
  }

  return isValidValue(value) ? renderSelectItem(`item-${value}-${index}`, option) : null;
};

/**
 * A Select component that renders a dropdown with a list of options
 * @param props {@link ISelectProps} - The props for the Select component
 * @returns A Select component
 *
 * @example
 * ```tsx
 * function App() {
 *   return (
 *    <Select
 *      label="Fruits"
 *      options={[
 *        {
 *          value: 'apple',
 *          label: 'Apple',
 *        },
 *        {
 *          value: 'banana',
 *          label: 'Banana',
 *        },
 *        {
 *          value: 'orange',
 *          label: 'Orange',
 *        },
 *      ]}
 *      placeholder="Select an option"
 *    />
 *   )
 * }
 * ```
 */
const Select: React.FC<ISelectProps & Pick<React.ComponentPropsWithRef<typeof SelectTrigger>, 'ref'>> = ({
  ref,
  label,
  description,
  options,
  placeholder,
  disabled,
  errorMessage,
  size = 'default',
  onChange,
  isPortal = true,
  isError,
  ...props
}) => {
  return (
    <SelectContainer onValueChange={onChange} {...props}>
      <div className="flex flex-col gap-2">
        {label && (
          <label
            className={cn(
              'font-[family-name:var(--typography-font-family-font-sans)]',
              'text-[length:var(--typography-base-sizes-small-font-size)]',
              'text-[var(--foreground)]',
              'font-medium leading-none',
              !!errorMessage && 'text-[var(--danger-text)]',
            )}
          >
            {label}
          </label>
        )}
        <SelectTrigger
          ref={ref}
          size={size}
          className={cn((!!errorMessage || isError) && 'ring-1 ring-[var(--danger-border)] focus:ring-[var(--danger-border)]')}
          disabled={disabled}
        >
          <SelectValue placeholder={placeholder} />
        </SelectTrigger>
        {description && (
          <Box className="flex items-center">
            <Text type="muted" weight="regular">
              {description}
            </Text>
          </Box>
        )}

        {errorMessage && (
          <p
            className={cn(
              'text-[var(--danger-text)]',
              'text-[length:var(--typography-base-sizes-extra-small-font-size)]',
              'font-[family-name:var(--typography-font-family-font-sans)]',
              'font-normal',
              'leading-none',
            )}
          >
            {errorMessage}
          </p>
        )}
        <SelectContent className="bg-[var(--popover)] border-[var(--border)]" isPortal={isPortal}>
          <SelectGroup>{options?.length ? options.map(renderOption) : <SelectLabel>No options available</SelectLabel>}</SelectGroup>
        </SelectContent>
      </div>
    </SelectContainer>
  );
};
Select.displayName = 'Select';

export default Select;
