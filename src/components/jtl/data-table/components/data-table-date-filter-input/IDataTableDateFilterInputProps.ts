import React from 'react';
import { FilterConditionOperator } from '../../deprecated/advanced-filter/types';
import { IJTLDropdownMenuItemProps } from '../../../jtl-dropdown';
import { SelectItem } from '../../../select';
import { FilterValueType } from '../../types';

/**
 * Props for the DataTableDateFilterInput component.
 *
 * Receives pre-computed values from the parent DataTableFilterInput's hooks and
 * decides which trigger element to pass to DataTableDateFilterContent:
 * - Active filter  → DataTableFilterDisplay (chip that re-opens the picker on click)
 * - Inactive filter → Button with the column title
 */
export default interface IDataTableDateFilterInputProps<T extends object> {
  /** Ref attached to the DataTableFilterDisplay element for width measurement. */
  filterDisplayRef: React.RefObject<HTMLDivElement | null>;

  /** Human-readable title of the column being filtered. */
  columnTitle: string;

  /** Currently selected filter operator (e.g. eq, gt, in). */
  internalOperator: FilterConditionOperator;

  /** Currently applied filter values (ISO date strings cast to T[keyof T][]). */
  internalValue: T[keyof T][];

  /** Whether the filter has at least one applied value. */
  isFilterActive: boolean;

  /** Options rendered in the operator dropdown inside the date picker. */
  operatorOptions: SelectItem[];

  /**
   * Factory that returns the operator dropdown items for DataTableFilterDisplay.
   * Used to populate the JTLDropdown inside the active-filter chip.
   */
  getOperatorOptions: () => IJTLDropdownMenuItemProps[];

  /** Column value type — passed to DataTableFilterDisplay for correct date formatting. */
  valueType: FilterValueType;

  /** Called when the user selects a different operator. */
  onOperatorChange: (operator: FilterConditionOperator) => void;

  /**
   * Called when the user confirms the filter ("Filtern").
   * Receives raw Date objects so the caller decides the output format.
   * - Single operators: [Date]
   * - Range operator: [fromDate, toDate] (undefined boundaries are omitted)
   */
  onApply: (dates: Date[]) => void;

  /** Called when the user clears the filter ("Auswahl aufheben"). */
  onClear: () => void;
}
