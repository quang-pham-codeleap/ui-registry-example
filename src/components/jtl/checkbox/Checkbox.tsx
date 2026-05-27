import React, { isValidElement, useCallback, useId } from 'react';
import { CheckboxIndicator } from './components';
import { cn } from '@/lib/utils';
import { Label } from '../label';
import ICheckboxProps from './ICheckboxProps';
import { ErrorMessage } from '../error-message';
import { useCheckboxGroupContext } from './hooks';
import { Box } from '../box';
import { Text } from '../text';

/**
 * Checkbox component with custom styling and functionality
 *
 * @param props {@link ICheckboxProps} - The component props
 * @returns The rendered checkbox component
 *
 * @example
 * ```tsx
 * // Basic usage
 * function App() {
 *   const [checked, setChecked] = useState<boolean>(false);
 *
 *   return (
 *     <Checkbox label="Accept terms and conditions" description="This is a description" value={checked} onChange={setChecked} />
 *   );
 * }
 * ```
 *
 * @example
 * ```tsx
 * // Checkbox with indeterminate state
 * const App = () => {
 *   type Fruit = 'apple' | 'banana' | 'orange';
 *   type FruitChecked = { [key in Fruit]: boolean };
 *
 *   const [checkedAll, setCheckedAll] = useState<boolean>(false);
 *   const [checkedIndeterminate, setCheckedIndeterminate] = useState<boolean>(false);
 *   const [fruits, setFruits] = useState<FruitChecked>({
 *     apple: false,
 *     banana: false,
 *     orange: false,
 *   });
 *
 *   // Handle click to cycle through states
 *   const handleClickCheckAll = () => {
 *     if (checkedAll) {
 *       setCheckedAll(false);
 *       setCheckedIndeterminate(false);
 *       setFruits({
 *         apple: false,
 *         banana: false,
 *         orange: false,
 *       });
 *     } else if (checkedIndeterminate) {
 *       setCheckedAll(true);
 *       setCheckedIndeterminate(false);
 *       setFruits({
 *         apple: true,
 *         banana: true,
 *         orange: true,
 *       });
 *     } else {
 *       setCheckedAll(true);
 *       setCheckedIndeterminate(false);
 *       setFruits({
 *         apple: true,
 *         banana: true,
 *         orange: true,
 *       });
 *     }
 *   };
 *   const selectFruits = (fruit: Fruit, checked: boolean) => {
 *     const newFruits = { ...fruits };
 *     newFruits[fruit] = checked;
 *     setFruits(newFruits);
 *     setCheckedAll(Object.values(newFruits).every(value => value));
 *     setCheckedIndeterminate(Object.values(newFruits).some(value => value) && !Object.values(newFruits).every(value => value));
 *   };
 *   return (
 *     <Box className="flex flex-col gap-6">
 *       <Text>List of fruits:</Text>
 *       <Checkbox
 *         {...args}
 *         label="Select all"
 *         value={checkedAll}
 *         indeterminate={checkedIndeterminate}
 *         onChange={handleClickCheckAll}
 *       />
 *       <Separator />
 *       <Checkbox label="Apple" value={fruits.apple} onChange={checked => selectFruits('apple', checked)} />
 *       <Checkbox label="Banana" value={fruits.banana} onChange={checked => selectFruits('banana', checked)} />
 *       <Checkbox label="Orange" value={fruits.orange} onChange={checked => selectFruits('orange', checked)} />
 *     </Box>
 *   );
 * }
 * ```
 */
const Checkbox: React.FC<ICheckboxProps> = ({ label, description, disabled, errorMessage, onChange, value, children, ...props }) => {
  const id = useId();
  const labelId = `${id}-label`;

  // Get CheckboxGroup context if available
  const checkboxGroup = useCheckboxGroupContext();

  // When used inside CheckboxGroup, derive state from context
  const isInGroup = !!checkboxGroup && value !== undefined;
  const effectiveChecked = typeof value === 'boolean' ? value : isInGroup ? checkboxGroup.isSelected(value) : value;
  const effectiveDisabled = isInGroup ? disabled || checkboxGroup.disabled : disabled;
  const effectiveLabel = children || label;

  const handleChange = useCallback(
    (newChecked: boolean) => {
      if (isInGroup && value !== undefined) {
        // When in group, notify the group context
        checkboxGroup.toggleValue(value as string, newChecked);
      } else {
        // When standalone, use individual onChange
        onChange?.(newChecked);
      }
    },
    [isInGroup, value, checkboxGroup, onChange],
  );

  // Check if description or label is present
  const hasDescription = description && description?.trim() !== '';

  // Check if label is present
  const hasLabel = typeof effectiveLabel === 'string' ? effectiveLabel.trim() !== '' : isValidElement(effectiveLabel);

  return (
    <Box
      className={cn('relative', 'flex items-start leading-none gap-x-2 gap-y-1.5', hasLabel && hasDescription && 'grid grid-flow-col grid-rows-2')}
    >
      <Box className="flex items-start leading-none">
        <CheckboxIndicator
          id={id}
          disabled={effectiveDisabled}
          checked={effectiveChecked as boolean}
          onChange={handleChange}
          {...(effectiveDisabled && hasLabel ? { 'aria-labelledby': labelId } : {})}
          {...props}
        />
      </Box>
      {hasDescription && hasLabel && <Box className="empty-cell" />}
      {hasLabel && (
        <Box className="flex items-start leading-none">
          <Label
            id={effectiveDisabled ? labelId : undefined}
            htmlFor={effectiveDisabled ? undefined : id}
            className={cn(
              effectiveDisabled ? 'cursor-default' : 'cursor-pointer',
              'text-[length:var(--typography-base-sizes-small-font-size)]',
              'leading-4',
              effectiveDisabled && 'opacity-70',
              !!errorMessage && 'text-[var(--danger-text)]',
            )}
          >
            {effectiveLabel}
          </Label>
        </Box>
      )}
      {hasDescription && (
        <Box className="flex justify-start">
          <Text type="muted">{description}</Text>
        </Box>
      )}
      <ErrorMessage message={errorMessage} />
    </Box>
  );
};

export default Checkbox;
