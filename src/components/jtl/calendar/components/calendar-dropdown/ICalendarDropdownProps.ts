import React from 'react';
import DropdownOption from '../../types/DropdownOption';

/**
 * Props passed by react-day-picker to its Dropdown component.
 * We receive these when overriding the default native <select> behaviour.
 * `value` uses the full HTML select value type to match react-day-picker's typings.
 */
export default interface ICalendarDropdownProps {
  /** Current selected value — matches React.SelectHTMLAttributes value type */
  value?: React.SelectHTMLAttributes<HTMLSelectElement>['value'];
  /** Native select onChange — we wrap it to work with our Select primitive */
  onChange?: React.ChangeEventHandler<HTMLSelectElement>;
  /** List of selectable month or year options */
  options?: DropdownOption[];
  /** Whether the dropdown is disabled */
  disabled?: boolean;
  /** Accessible label e.g. "Month" or "Year" */
  'aria-label'?: string;
}
