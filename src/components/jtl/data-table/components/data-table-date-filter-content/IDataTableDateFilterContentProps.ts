import React from 'react';
import { FilterConditionOperator } from '../../deprecated/advanced-filter/types';
import { SelectItem } from '../../../select';

/**
 * Props for the DataTableDateFilterContent component.
 * Renders an operator selector + a date picker (single or range) based on the current operator.
 *
 * @template T - The row data object type
 */
export default interface IDataTableDateFilterContentProps<T extends object> {
  /**
   * Currently active filter condition operator (e.g. eq, gt, in).
   */
  operator: FilterConditionOperator;

  /**
   * Raw filter value array — date cast to T[keyof T][].
   * - Single operators: [Date]
   * - Range operator (in): [Date, Date] (from, to)
   */
  value?: T[keyof T][];

  /**
   * Available operator options rendered in the operator Select dropdown.
   */
  operatorOptions: SelectItem[];

  /**
   * The title of the column for which to display filter options.
   */
  columnTitle: string;

  /**
   * Called when the user changes the selected operator.
   */
  onOperatorChange: (operator: FilterConditionOperator) => void;

  /**
   * Called when the user confirms the filter ("Filtern").
   * Receives raw Date objects so the caller decides the output format.
   * - Single operators: [Date]
   * - Range operator: [fromDate, toDate] (undefined boundaries are omitted)
   */
  onApply: (dates: Date[]) => void;

  /**
   * Called when the user clears the filter ("Auswahl aufheben").
   * Clears both local staged state and the parent filter state.
   */
  onClear: () => void;

  /**
   * Called after apply or clear to close the outer filter popover.
   */
  onClose: () => void;

  /**
   * Optional custom trigger element rendered as the DatePicker / DateRangePicker trigger.
   * When provided, replaces the default `<Button label={columnTitle} />` trigger.
   * Use this to pass `<DataTableFilterDisplay />` when a filter is already active,
   * so clicking the chip re-opens the picker for editing.
   */
  triggerContent?: React.ReactNode;
}
