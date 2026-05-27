import React, { memo } from 'react';
import { de } from 'date-fns/locale';
import { Calendar } from '../../../calendar';
import { Box } from '../../../box';
import { cn } from '@/lib';
import { DatePickerInput } from '../date-picker-input';
import IDatePickerDropdownProps from './IDatePickerDropdownProps';

/**
 * Dropdown panel rendered by DatePicker when the picker is open.
 * Contains an optional header, optional inline input, a single-month calendar,
 * and an optional footer (render-prop or static node).
 *
 * This component is intentionally a pure render component — all state and
 * handler logic lives in the parent DatePicker.
 */
const DatePickerDropdown: React.FC<IDatePickerDropdownProps> = memo(
  ({
    header,
    hasInput,
    footer,
    dateFormat,
    inputValue,
    parsedInputDate,
    defaultMonth,
    calendarKey,
    disableDate,
    onInputChange,
    onInputBlur,
    onCalendarChange,
    onApply,
    onClear,
    captionLayout,
    fromYear,
    toYear,
  }) => {
    return (
      <Box className={cn('w-auto p-0', 'rounded-md shadow-md', 'bg-[var(--popover)]')}>
        <Box className={cn('flex flex-col gap-2 p-2 rounded-md')}>
          {/* Header — custom content injected by the consumer, rendered above the calendar */}
          {header && <Box>{header}</Box>}

          {/* Inline date input — shown only when hasInput=true */}
          {hasInput && (
            <DatePickerInput
              dateFormat={dateFormat}
              inputValue={inputValue}
              onInputChange={onInputChange}
              onInputBlur={onInputBlur}
              autoFocus={hasInput}
            />
          )}

          {/* Calendar */}
          <Box className="flex gap-4">
            <Box className="[&_.rdp-root]:shadow-none">
              <Calendar
                key={calendarKey}
                mode="single"
                value={parsedInputDate || undefined}
                defaultMonth={defaultMonth}
                onChange={onCalendarChange}
                numberOfMonths={1}
                disableDate={disableDate}
                locale={de}
                captionLayout={captionLayout}
                fromYear={fromYear}
                toYear={toYear}
              />
            </Box>
          </Box>
        </Box>

        {/* Footer — render prop form receives onApply/onClear; static node rendered as-is */}
        {footer && (
          <Box
            className={cn(
              'border-t border-[var(--border)]',
              'bg-[var(--muted)]',
              'flex items-center justify-end gap-4',
              'px-3 py-2',
              'rounded-bl-md rounded-br-md',
            )}
          >
            {typeof footer === 'function' ? footer({ onApply, onClear }) : footer}
          </Box>
        )}
      </Box>
    );
  },
);

DatePickerDropdown.displayName = 'DatePickerDropdown';

export default DatePickerDropdown;
