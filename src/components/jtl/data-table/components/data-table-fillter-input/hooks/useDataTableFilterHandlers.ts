import React, { useCallback, useEffect } from 'react';
import { FilterConditionOperator } from '../../../deprecated/advanced-filter/types';
import { FilterState } from '../../../types';

/**
 * Props for the DataTable filter handlers hook
 * Defines the configuration and state management for filter interactions
 */
interface UseDataTableFilterHandlersProps<T extends object> {
  columnKey: keyof T;
  internalOperator: FilterConditionOperator;
  internalValue: T[keyof T][];
  searchText: string;
  isSingleMode: boolean;
  popoverContentRef: React.RefObject<HTMLDivElement | null>;
  popoverTriggerRef: React.RefObject<HTMLButtonElement | null>;
  setSelectedValue: (value: T[keyof T][]) => void;
  setSelectedOperator: (operator: FilterConditionOperator) => void;
  onChange?: (value: FilterState<T>) => void;
}

/**
 * Custom hook to manage all filter event handlers
 * @param props - Configuration and state setters
 * @returns Event handlers for filter interactions
 */
const useDataTableFilterHandlers = <T extends object>({
  columnKey,
  internalOperator,
  internalValue,
  searchText,
  isSingleMode,
  popoverContentRef,
  popoverTriggerRef,
  setSelectedValue,
  setSelectedOperator,
  onChange,
}: UseDataTableFilterHandlersProps<T>) => {
  /**
   * Handle value change event
   */
  const handleChangeValue = useCallback(
    (value: T[keyof T][]) => {
      setSelectedValue(value);
      onChange?.({ [columnKey]: { value, operator: internalOperator } } as FilterState<T>);
    },
    [columnKey, internalOperator, onChange, setSelectedValue],
  );

  /**
   * Handle operator change event
   */
  const handleChangeOperator = useCallback(
    (operator: string) => {
      setSelectedOperator(operator as FilterConditionOperator);
      onChange?.({ [columnKey]: { value: internalValue, operator } } as FilterState<T>);
    },
    [columnKey, internalValue, onChange, setSelectedOperator],
  );

  /**
   * Handle clear filter event
   */
  const handleClearFilter = useCallback(() => {
    setSelectedValue([]);
    setSelectedOperator(FilterConditionOperator.Equals);
    onChange?.({ [columnKey]: null } as FilterState<T>);
  }, [columnKey, onChange, setSelectedOperator, setSelectedValue]);

  /**
   * Handle enter key to apply filter - scoped to this component instance
   */
  const handleEnter = useCallback(
    (event: globalThis.KeyboardEvent) => {
      // Only handle Enter if the event target is within this component's popover content
      if (!popoverContentRef.current || !popoverContentRef.current.contains(event.target as Node)) {
        return;
      }

      if (event.key === 'Enter' && isSingleMode) {
        event.preventDefault();
        setSelectedValue([searchText] as T[keyof T][]);
        if (searchText.trim() !== '') {
          onChange?.({ [columnKey]: { value: [searchText], operator: internalOperator } } as FilterState<T>);
        } else {
          handleClearFilter();
        }

        // Close the popover after applying filter
        // If popoverContentRef exists, it means popover is open
        if (popoverContentRef.current && popoverTriggerRef.current) {
          popoverTriggerRef.current.click();
        }
      }
    },
    [searchText, columnKey, onChange, handleClearFilter, internalOperator, isSingleMode, popoverContentRef, popoverTriggerRef, setSelectedValue],
  );

  /**
   * Add component-scoped event listeners
   */
  useEffect(() => {
    document.addEventListener('keydown', handleEnter);

    return () => {
      document.removeEventListener('keydown', handleEnter);
    };
  }, [handleEnter]);

  return {
    handleChangeValue,
    handleChangeOperator,
    handleClearFilter,
  };
};

export default useDataTableFilterHandlers;
