import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import IDataTableFilterInputProps from './IDataTableFilterInputProps';
import { Box } from '../../../box';
import { Popover, PopoverContent, PopoverTrigger } from '../../../popover';
import { Command } from '../../../command';
import { COMMAND_VARIANT } from '../../../command/constants';
import { Button } from '../../../button';
import { DataTableFilterDisplay } from '../data-table-filter-display';
import { useDataTableFilterState, useFilterDisplayWidth, useFilterOperatorOptions, useDataTableFilterHandlers } from './hooks';
import { useDataTableStaticContext } from '../../hooks';
import { cn } from '@/lib';
import { Icon } from '../../../icon';
import { FilterValueType } from '../../types';
import { FilterConditionOperator } from '../../deprecated/advanced-filter/types';
import { DataTableDateFilterInput } from '../data-table-date-filter-input';
import { DATE_OPERATOR_TEXT_OVERRIDES } from '../../constants';

/**
 * Renders the filter input for a DataTable column.
 */
const DataTableFilterInput = <T extends object>({
  onChange,
  value,
  operator,
  mode,
  options,
  columnKey,
  valueType,
  autoOpen,
  onAutoOpenComplete,
}: IDataTableFilterInputProps<T>) => {
  // Track popover open state to animate the ChevronDown icon
  const [isOpen, setIsOpen] = useState(false);

  // Create columnKey-specific refs to avoid cross-component interference
  const filterDisplayRef = useRef<HTMLDivElement>(null);
  const popoverTriggerRef = useRef<HTMLButtonElement>(null);
  const popoverContentRef = useRef<HTMLDivElement>(null);

  const { columns } = useDataTableStaticContext<T>();

  // Use custom hooks to manage state and logic
  const {
    selectedOperator,
    setSelectedOperator,
    selectedValue,
    setSelectedValue,
    searchText,
    setSearchText,
    internalValue,
    internalOperator,
    isFilterActive,
    isSingleMode,
  } = useDataTableFilterState(value, operator, mode, valueType);

  // Auto-open the popover when this filter was just added via "Weitere Filter"
  useEffect(() => {
    if (autoOpen) {
      setIsOpen(true);
      onAutoOpenComplete?.();
    }
  }, [autoOpen, onAutoOpenComplete]);

  const width = useFilterDisplayWidth(filterDisplayRef, selectedOperator, selectedValue);

  // Restrict input to numbers when the column has a numeric value type and is in single-entry mode
  const isNumberMode = isSingleMode && valueType === FilterValueType.NUMBER;

  const { handleChangeValue, handleChangeOperator, handleClearFilter } = useDataTableFilterHandlers({
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
  });

  /** Whether this filter column is using the Date value type */
  const isDateType = valueType === FilterValueType.DATE;

  const { getOperatorOptions, operatorOptions } = useFilterOperatorOptions(
    handleChangeOperator,
    valueType,
    isDateType ? DATE_OPERATOR_TEXT_OVERRIDES : undefined,
  );

  const columnTitle = columns.find(column => column.key === columnKey)?.title;

  /**
   * The grouped options for the command component
   * We don't use the `heading` attribute of the Command (Design)
   */
  const filterGroup = useMemo(() => {
    return [
      {
        heading: 'Alle Werte',
        items: options,
      },
    ];
  }, [options]);

  /**
   * Apply date values as the filter value.
   */
  const handleDateApply = useCallback(
    (dates: Date[]) => {
      handleChangeValue(dates as unknown as T[keyof T][]);
    },
    [handleChangeValue],
  );

  if (!columnTitle) {
    return null;
  }

  /**
   * Date columns use a dedicated component that renders DataTableFilterDisplay
   * as the DatePicker trigger when active, or a plain Button when inactive.
   * This keeps date-specific rendering separate from the Popover+Command path below.
   */
  if (isDateType) {
    return (
      <DataTableDateFilterInput<T>
        filterDisplayRef={filterDisplayRef}
        columnTitle={columnTitle}
        internalOperator={internalOperator as FilterConditionOperator}
        internalValue={internalValue}
        isFilterActive={Boolean(isFilterActive)}
        operatorOptions={operatorOptions}
        getOperatorOptions={getOperatorOptions}
        valueType={valueType}
        onOperatorChange={handleChangeOperator as (operator: FilterConditionOperator) => void}
        onApply={handleDateApply}
        onClear={handleClearFilter}
      />
    );
  }

  return (
    <div className="flex">
      {/* open/onOpenChange wires Radix Popover state to local isOpen for icon rotation */}
      <Popover open={isOpen} onOpenChange={setIsOpen}>
        <PopoverTrigger asChild ref={popoverTriggerRef}>
          {isFilterActive ? (
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
          ) : (
            <Button
              label={columnTitle}
              variant="outline"
              size="sm"
              icon={<Icon name="ChevronDown" className={cn('transition-transform', isOpen ? 'rotate-180' : '')} size={16} />}
              iconPosition="right"
            />
          )}
        </PopoverTrigger>
        <PopoverContent style={{ width: `${Math.max(width, 240)}px` }} className="p-0" align="start" ref={popoverContentRef}>
          {/* Default variant: string/number/boolean multi-select or text input  */}
          <Command
            placeholder="Suche Filtername"
            isPopover
            groups={filterGroup}
            variant={isSingleMode ? COMMAND_VARIANT.SIMPLE : COMMAND_VARIANT.CHECKBOX}
            value={isSingleMode ? searchText : (internalValue as (string | null)[])}
            inputType={isNumberMode ? 'number' : undefined}
            selectionConfig={{
              enabled: true,
              options: operatorOptions,
              value: internalOperator,
              onSelect: handleChangeOperator,
            }}
            hideContent={isSingleMode}
            footer={
              isSingleMode || internalValue.length === 0 ? null : (
                <Box className="flex justify-center">
                  <Button label="Auswahl aufheben" variant="ghost" onClick={handleClearFilter} />
                </Box>
              )
            }
            onItemSelect={handleChangeValue as (value: string[] | string) => void}
            onValueChange={setSearchText}
          />
        </PopoverContent>
      </Popover>
    </div>
  );
};

export default DataTableFilterInput;
