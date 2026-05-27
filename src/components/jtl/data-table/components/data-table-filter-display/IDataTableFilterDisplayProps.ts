import React from 'react';
import { IJTLDropdownMenuItemProps } from '../../../jtl-dropdown';
import { FilterConditionOperator } from '../../deprecated/advanced-filter/types';
import { FilterValueType } from '../../types';

/**
 * Props for the DataTableFilterDisplay component.
 */
export default interface IDataTableFilterDisplayProps<T extends object> extends React.RefAttributes<HTMLDivElement> {
  /**
   * Factory that returns the operator dropdown items for DataTableFilterDisplay.
   * Used to populate the JTLDropdown inside the active-filter chip.
   */
  getOperatorOptions: () => IJTLDropdownMenuItemProps[];

  /** The currently selected filter operator (e.g. eq, gt, in). */
  selectedOperator: FilterConditionOperator;

  /** The currently selected filter value(s). For date filters, these are ISO date strings. */
  selectedValue: T[keyof T][];

  /** The human-readable title of the column being filtered. */
  columnTitle: string;

  /**
   * The value type of the column — used to format the displayed value.
   * When FilterValueType.DATE, ISO date strings are converted to dd.MM.yyyy for display.
   */
  valueType?: FilterValueType;
}
