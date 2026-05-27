import React, { memo } from 'react';
import { DateRange } from 'react-day-picker';
import { de } from 'date-fns/locale';
import { Calendar } from '../../../calendar';
import { Box } from '../../../box';
import { cn } from '@/lib';
import { DatePickerPresets } from '../date-picker-presets';
import { DatePickerFooter } from '../date-picker-footer';
import { DatePickerInput } from '../date-picker-input';
import { DATE_RANGE_PRESETS } from '../../utils';
import IDateRangePickerDropdownProps from './IDateRangePickerDropdownProps';

/**
 * Dropdown panel rendered by DateRangePicker when the picker is open.
 * Contains an optional header, a presets sidebar, optional inline Von/Bis inputs,
 * a two-month calendar, and a footer (render-prop, static node, or default).
 *
 * This component is intentionally a pure render component — all state and
 * handler logic lives in the parent DateRangePicker.
 */
const DateRangePickerDropdown: React.FC<IDateRangePickerDropdownProps> = memo(
  ({
    header,
    hasInput,
    footer,
    dateFormat,
    calendarValue,
    defaultMonth,
    selectedPreset,
    individualPresetIndex,
    fromInputValue,
    toInputValue,
    disableDate,
    onPresetClick,
    onCalendarChange,
    onFromInputChange,
    onToInputChange,
    onFromInputBlur,
    onToInputBlur,
    onClear,
    onApply,
    captionLayout,
    fromYear,
    toYear,
  }) => {
    return (
      <Box className={cn('w-auto p-0', 'border border-[var(--border)] rounded-md shadow-md', 'bg-[var(--popover)]')}>
        <Box className={cn('flex flex-col gap-2 p-3 rounded-md')}>
          {/* Header — custom content injected by the consumer, rendered above the calendar */}
          {header && <Box>{header}</Box>}

          <Box className="flex gap-4">
            {/* Presets sidebar */}
            <DatePickerPresets
              presets={DATE_RANGE_PRESETS}
              selectedPreset={selectedPreset ?? individualPresetIndex}
              onPresetClick={index => onPresetClick(index)}
            />

            {/* Right column: optional inline inputs + calendar */}
            <Box className="flex flex-col gap-2">
              {/* Inline Von/Bis date inputs — shown only when hasInput=true */}
              {hasInput && (
                <DatePickerInput
                  dateFormat={dateFormat}
                  inputFromValue={fromInputValue}
                  inputToValue={toInputValue}
                  onInputFromChange={onFromInputChange}
                  onInputToChange={onToInputChange}
                  onInputFromBlur={onFromInputBlur}
                  onInputToBlur={onToInputBlur}
                  autoFocus={hasInput}
                />
              )}

              {/* Calendar */}
              <Box className="border border-[var(--border)] rounded-md bg-[var(--background)]">
                <Box className="[&_.rdp-root]:shadow-none [&_.rdp-root]:border-none">
                  <Calendar
                    mode="range"
                    value={calendarValue as DateRange | undefined}
                    defaultMonth={defaultMonth}
                    onChange={onCalendarChange}
                    numberOfMonths={2}
                    disableDate={disableDate}
                    locale={de}
                    captionLayout={captionLayout}
                    fromYear={fromYear}
                    toYear={toYear}
                  />
                </Box>
              </Box>
            </Box>
          </Box>

          {/* Footer — render prop form receives onApply/onClear; static node rendered as-is; fallback to default */}
          {footer ? (
            <Box
              className={cn(
                'border-t border-[var(--border)]',
                'bg-[var(--muted)]',
                'flex items-center justify-end gap-4',
                '-mx-3 -mb-3',
                'px-3 py-2',
                'rounded-bl-[var(--border-radius-md)] rounded-br-[var(--border-radius-md)]',
              )}
            >
              {typeof footer === 'function' ? footer({ onApply, onClear }) : footer}
            </Box>
          ) : (
            <DatePickerFooter onClear={onClear} onApply={onApply} />
          )}
        </Box>
      </Box>
    );
  },
);

DateRangePickerDropdown.displayName = 'DateRangePickerDropdown';

export default DateRangePickerDropdown;
