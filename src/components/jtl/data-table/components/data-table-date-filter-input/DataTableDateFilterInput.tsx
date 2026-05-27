import { useCallback, useMemo } from 'react';
import { Button } from '../../../button';
import { DataTableFilterDisplay } from '../data-table-filter-display';
import { FilterConditionOperator } from '../../deprecated/advanced-filter/types';
import IDataTableDateFilterInputProps from './IDataTableDateFilterInputProps';
import { DataTableDateFilterContent } from '../data-table-date-filter-content';
import { Icon } from '../../../icon';

/**
 * Renders the date-specific filter trigger + picker for a DataTable column.
 *
 * Extracted from DataTableFilterInput to keep the parent component focused on
 * non-date filter rendering (Popover + Command).
 *
 * Trigger strategy:
 * - Filter active  → DataTableFilterDisplay chip (clicking it re-opens the picker)
 * - Filter inactive → plain Button with the column title
 *
 * The DatePicker / DateRangePicker inside DataTableDateFilterContent manages its
 * own open state, so no outer Popover or manual close ref is needed here.
 */
const DataTableDateFilterInput = <T extends object>({
  filterDisplayRef,
  columnTitle,
  internalOperator,
  internalValue,
  isFilterActive,
  operatorOptions,
  getOperatorOptions,
  valueType,
  onOperatorChange,
  onApply,
  onClear,
}: IDataTableDateFilterInputProps<T>) => {
  /**
   * Choose the trigger element based on whether a filter is already applied.
   * DataTableFilterDisplay lets the user see the current filter value and
   * click to reopen the picker for editing.
   */
  const triggerContent = useMemo(() => {
    if (isFilterActive) {
      return (
        <button>
          <DataTableFilterDisplay
            ref={filterDisplayRef}
            getOperatorOptions={getOperatorOptions}
            columnTitle={columnTitle}
            selectedOperator={internalOperator}
            selectedValue={internalValue}
            valueType={valueType}
          />
        </button>
      );
    }
    return (
      <Button
        label={columnTitle}
        variant="outline"
        size="sm"
        icon={<Icon name="ChevronDown" size={16} className="transition-transform duration-200 [button[aria-expanded=true]_&]:rotate-180" />}
        iconPosition="right"
      />
    );
  }, [isFilterActive, filterDisplayRef, getOperatorOptions, columnTitle, internalOperator, internalValue, valueType]);

  /**
   * No-op close handler: the DatePicker / DateRangePicker closes itself when the
   * user confirms ("Filtern") or cancels. There is no outer Popover to close.
   */
  const handleClose = useCallback(() => {}, []);

  return (
    <DataTableDateFilterContent<T>
      columnTitle={columnTitle}
      operator={internalOperator as FilterConditionOperator}
      value={internalValue}
      operatorOptions={operatorOptions}
      onOperatorChange={onOperatorChange}
      onApply={onApply}
      onClear={onClear}
      onClose={handleClose}
      triggerContent={triggerContent}
    />
  );
};

export default DataTableDateFilterInput;
