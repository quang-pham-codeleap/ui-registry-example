import { useCallback, useMemo, useRef } from 'react';
import { useControlledState } from '@/hooks';
import { ComboBoxDefault } from './components';
import { COMMAND_VARIANT } from '../command/constants';
import { Command } from '../command';
import IComboBoxProps from './IComboBoxProps';
import { ComboBoxMode } from './types';
import { ComboBoxSelectMode } from './types/ComboBoxMode';
import { CommandGroup } from '../command/types';
/**
 * A versatile combo box component that combines an input field with a dropdown list of options.
 * It provides a powerful way to search, filter, and select from a list of items.
 *
 * The ComboBox is highly customizable and supports:
 * - Grouped results with section headers
 * - Custom item rendering
 * - Asynchronous data loading
 * - Dialog mode for combo box-style interfaces
 *
 * @component
 * @param {IComboBoxProps} props - The component props
 * @returns {React.ReactElement} The rendered ComboBox component
 *
 * @example
 * Basic usage
 * ```tsx
 * <ComboBox
 *   placeholder="Search..."
 *   menuItems={[
 *     {
 *       heading: 'Actions',
 *       items: [
 *         {
 *           label: 'Create New Item',
 *           value: 'create-new',
 *         },
 *         {
 *           label: 'Edit Item',
 *           value: 'edit',
 *         }
 *       ]
 *     }
 *   ]}
 *   onItemSelect={(values) => console.log(values)}
 * />
 * ```
 *
 * @example
 * With loading state and controlled value
 * ```tsx
 * <ComboBox
 *   placeholder="Search..."
 *   menuItems={menuGroups}
 *   value={['item-1', 'item-2']}
 *   isLoading={isSearching}
 *   onItemSelect={handleSelection}
 * />
 * ```
 *
 * @example
 * With loading content and disabled state
 * ```tsx
 * <ComboBox
 *   placeholder="Select users..."
 *   menuItems={[
 *     {
 *       heading: 'Users',
 *       items: [
 *         { label: 'John Doe', value: 'john' },
 *         { label: 'Jane Smith', value: 'jane' },
 *         { label: 'Bob Johnson', value: 'bob' }
 *       ]
 *     }
 *   ]}
 *   isLoading={isFetching}
 *   isContentLoading={isContentLoading}
 *   isDisabled={!isReady}
 *   value={selectedUsers}
 *   onItemSelect={setSelectedUsers}
 * />
 * ```
 */
const ComboBox = <T extends ComboBoxMode>({
  placeholder = 'Search...',
  menuItems,
  isLoading,
  onSelect,
  value,
  noResultText = 'No results found for',
  isDisabled = false,
  triggerId,
  contentId,
  isContentLoading,
  isOpen,
  mode = 'single' as T,
  ref,
  renderItem,
}: IComboBoxProps<T>) => {
  const triggerRef = useRef<HTMLButtonElement>(null);

  const availableRef = ref ?? triggerRef;

  // Type assertion needed: onSelect uses conditional type T extends 'single' ? string : string[]
  // which TypeScript can't statically prove is compatible with string | string[]
  // At runtime, the conditional type always resolves to either string or string[], so this is safe
  const { value: selectedValue, setValue: handleInputChange } = useControlledState<string | string[] | undefined, undefined>(
    value,
    undefined,
    onSelect as ((value: string | string[]) => void) | undefined,
  );

  /**
   * Prepare command groups for single mode
   * Add selected state to item
   */
  const commandGroups = useMemo(() => {
    return menuItems.map(group => ({
      ...group,
      heading: group.heading || '',
      items: group.items.map(item => ({
        ...item,
        ...(mode === ComboBoxSelectMode.SINGLE ? { selected: item.value === selectedValue } : {}),
      })),
    }));
  }, [menuItems, mode, selectedValue]);

  /**
   * Handle select value for single mode
   * Trigger close when select value
   */
  const handleSelect = useCallback(
    (value: string | string[]) => {
      if (mode === ComboBoxSelectMode.SINGLE) {
        triggerRef.current?.click();
      }
      handleInputChange(value);
    },
    [handleInputChange, mode, triggerRef],
  );

  /**
   * Handle remove value for multi mode
   */
  const handleRemoveValue = useCallback(
    (value: string | null) => {
      if (mode === ComboBoxSelectMode.MULTI) {
        handleInputChange?.((selectedValue as string[])?.filter(item => item !== value));
      }
    },
    [handleInputChange, selectedValue, mode],
  );

  return (
    <ComboBoxDefault
      value={selectedValue}
      placeholder={placeholder}
      isDisabled={isDisabled}
      triggerId={triggerId}
      contentId={contentId}
      isLoading={isLoading}
      isOpen={isOpen}
      handleRemoveValue={handleRemoveValue}
      mode={mode}
      triggerRef={availableRef}
      groups={commandGroups}
    >
      <Command
        variant={mode === ComboBoxSelectMode.MULTI ? COMMAND_VARIANT.CHECKBOX : COMMAND_VARIANT.SIMPLE}
        groups={commandGroups as CommandGroup[]}
        placeholder={placeholder}
        value={mode === ComboBoxSelectMode.SINGLE ? undefined : selectedValue}
        onItemSelect={handleSelect}
        isPopover
        noResultsLabel={noResultText}
        isLoading={isContentLoading}
        renderItem={renderItem}
      />
    </ComboBoxDefault>
  );
};

export default ComboBox;
