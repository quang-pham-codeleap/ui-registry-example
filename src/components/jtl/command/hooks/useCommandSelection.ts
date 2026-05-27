import { useCallback, useLayoutEffect, useRef } from 'react';
import { COMMAND_VARIANT } from '../constants';
import { CommandGroup, CommandItem, CommandVariant, UseCommandSelectionProps, UseCommandSelectionReturn } from '../types';

/**
 * Provides all selection/checkbox-related handlers for the Command component,
 * and the layout effect that compensates for scroll position jumps when
 * the "selected" group height changes.
 */
export const useCommandSelection = <T extends CommandVariant>({
  value,
  variant,
  setValueState,
  setOpen,
  onItemSelect,
  commandListRef,
  selectedGroupRef,
}: UseCommandSelectionProps<T>): UseCommandSelectionReturn<T> => {
  const prevSelectedHeightRef = useRef(0);

  /**
   * Handler to handle when an Item in the CommandContent is selected.
   */
  const handleContentItemOnSelect = useCallback(
    (item: CommandItem | string[]) => {
      if (variant === COMMAND_VARIANT.CHECKBOX) {
        (onItemSelect as (value: string[]) => void)?.(item as string[]);
      } else {
        const { label, value: itemValue } = item as CommandItem;
        setValueState(label);
        setOpen(false);
        (onItemSelect as (value: string) => void)?.(itemValue as string);
      }
    },
    [onItemSelect, setValueState, setOpen, variant],
  );

  /**
   * Handler for CheckboxGroup onChange in the checkbox variant layout.
   */
  const handleCheckboxGroupChange = useCallback(
    (vals: (string | null)[]) => {
      (onItemSelect as (value: string[]) => void)?.(vals.filter((v): v is string => v !== null));
    },
    [onItemSelect],
  );

  /**
   * Returns the string values of all selectable (non-null) items in a group.
   */
  const getSelectableGroupValues = useCallback(
    (group: CommandGroup<T>) => group.items.filter(item => item.value !== null).map(item => String(item.value)),
    [],
  );

  /**
   * Select all items in a single group (merges with existing selection)
   */
  const handleGroupSelectAll = useCallback(
    (group: CommandGroup<T>) => {
      const merged = Array.from(new Set([...((value as string[]) ?? []), ...getSelectableGroupValues(group)]));
      (onItemSelect as (value: string[]) => void)?.(merged);
    },
    [value, onItemSelect, getSelectableGroupValues],
  );

  /**
   * Deselect all items that belong to a single group
   */
  const handleGroupClear = useCallback(
    (group: CommandGroup<T>) => {
      const groupValues = new Set(getSelectableGroupValues(group));
      const remaining = ((value as string[]) ?? []).filter(v => !groupValues.has(v));
      (onItemSelect as (value: string[]) => void)?.(remaining);
    },
    [value, onItemSelect, getSelectableGroupValues],
  );

  /**
   * Deselect everything
   */
  const handleClearAll = useCallback(() => {
    (onItemSelect as (value: string[]) => void)?.([]);
  }, [onItemSelect]);

  /**
   * Compensate for height changes in the "Selected" group so the main list
   * appears not to jump when items are added or removed from the selection.
   */
  useLayoutEffect(() => {
    if (variant !== COMMAND_VARIANT.CHECKBOX) return;

    const selectedGroup = selectedGroupRef.current;
    const commandList = commandListRef.current;
    if (!commandList) return;

    const newHeight = selectedGroup ? selectedGroup.offsetHeight : 0;
    const delta = newHeight - prevSelectedHeightRef.current;

    if (delta !== 0) {
      commandList.scrollTop += delta;
    }

    prevSelectedHeightRef.current = newHeight;
  }, [value, variant, commandListRef, selectedGroupRef]);

  return {
    handleContentItemOnSelect,
    handleCheckboxGroupChange,
    getSelectableGroupValues,
    handleGroupSelectAll,
    handleGroupClear,
    handleClearAll,
  };
};
