import React, { useCallback } from 'react';

import { cn } from '@/lib/utils';
import { Select as SelectContainer, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '../../../select/SelectPrimitives';
import ICalendarDropdownProps from './ICalendarDropdownProps';

/**
 * Custom dropdown for the calendar header (captionLayout="dropdown").
 * Replaces react-day-picker's native <select> with our styled Select primitive
 * so month and year pickers match the project's design system.
 *
 * @param props {@link ICalendarDropdownProps}
 */
const CalendarDropdown: React.FC<ICalendarDropdownProps> = props => {
  const { 'aria-label': ariaLabel, value, onChange, options = [], disabled } = props;

  // Convert our Select's onValueChange(string) back to a synthetic HTMLSelectElement event
  const handleValueChange = useCallback(
    (newValue: string) => {
      const syntheticEvent = { target: { value: newValue } } as React.ChangeEvent<HTMLSelectElement>;
      onChange?.(syntheticEvent);
    },
    [onChange],
  );

  // Normalise value: react-day-picker may pass a readonly string[] for multi-select,
  // but calendar dropdowns are always single-value (month or year index).
  // Guard against undefined/null/empty-array — passing those to Radix Select as a string
  // would produce the literal 'undefined' and put the component into an invalid controlled state.
  const normalizedValue: string | undefined = Array.isArray(value)
    ? value.length > 0
      ? String(value[0])
      : undefined
    : value != null
      ? String(value)
      : undefined;

  return (
    <SelectContainer value={normalizedValue} onValueChange={handleValueChange} disabled={disabled}>
      {/* Compact trigger — overrides the default h-10 with calendar-appropriate h-7 */}
      <SelectTrigger
        tabIndex={0}
        size="sm"
        aria-label={ariaLabel}
        className={cn(
          'h-7',
          'min-w-0 w-auto',
          // Reduce horizontal padding for compact header appearance
          'px-2',
          'gap-1',
          // Hide the default min-width so month/year labels stay concise
          '[&>span]:line-clamp-1',
        )}
      >
        <SelectValue />
      </SelectTrigger>
      <SelectContent className="bg-[var(--popover)] border-[var(--border)]" isPortal>
        <SelectGroup>
          {options.map(opt => (
            <SelectItem key={opt.value} value={String(opt.value)} disabled={opt.disabled}>
              {opt.label}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </SelectContainer>
  );
};

export default CalendarDropdown;
