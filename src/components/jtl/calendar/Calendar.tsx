import React from 'react';
import { ICalendarRangeProps, ICalendarSingleProps } from './interfaces';
import ICalendarProps from './ICalendarProps';
import { BaseCalendar } from './components';

/**
 * Calendar component that wraps react-day-picker with custom styling and functionality
 * Supports both single date and date range selection modes
 *
 * @param props {@link ICalendarProps} - The component props
 * @returns The rendered calendar component
 *
 * @example
 * ```tsx
 * // Basic usage
 * function App() {
 *   const [date, setDate] = useState<Date | undefined>(new Date());
 *
 *   return (
 *     <Calendar value={date} onChange={setDate} />
 *   );
 * }
 * ```
 *
 * @example
 * ```tsx
 * // Date range selection
 * function App() {
 *   const [dateRange, setDateRange] = useState<DateRange | undefined>(() => {
 *     const today = new Date();
 *     const nextWeek = new Date(today);
 *     nextWeek.setDate(today.getDate() + 7);
 *     return {
 *       from: today,
 *       to: nextWeek,
 *     };
 *   });
 *
 *   return (
 *     <Calendar mode="range" value={dateRange} onChange={setDateRange} />
 *   );
 * }
 * ```
 */
const Calendar: React.FC<ICalendarProps> = React.memo(
  ({
    mode = 'single',
    fromYear = new Date().getFullYear() - 100,
    toYear = new Date().getFullYear() + 10,
    captionLayout = 'label',
    ...props
  }: ICalendarProps) => {
    // Guard against inverted year range — swap if fromYear > toYear to prevent broken navigation
    const safeFromYear = Math.min(fromYear, toYear);
    const safeToYear = Math.max(fromYear, toYear);

    // Handling single date selection mode
    if (mode === 'single') {
      const { value, onChange, numberOfMonths = 1, defaultMonth, disableDate, ...restProps } = props as ICalendarSingleProps;

      return (
        <BaseCalendar
          key={'jtl-calendar-single'}
          mode="single"
          required={true}
          selected={value}
          onSelect={onChange}
          numberOfMonths={numberOfMonths}
          defaultMonth={defaultMonth}
          disabled={disableDate}
          captionLayout={captionLayout}
          startMonth={captionLayout === 'dropdown' ? new Date(safeFromYear, 0) : undefined}
          endMonth={captionLayout === 'dropdown' ? new Date(safeToYear, 11) : undefined}
          {...restProps}
        />
      );
    }

    // Handling date range selection mode
    const { value, onChange, numberOfMonths = 1, defaultMonth, disableDate, ...restProps } = props as ICalendarRangeProps;

    return (
      <BaseCalendar
        key={'jtl-calendar-range'}
        mode="range"
        required={true}
        selected={value}
        onSelect={onChange}
        numberOfMonths={numberOfMonths}
        defaultMonth={defaultMonth}
        disabled={disableDate}
        captionLayout={captionLayout}
        startMonth={captionLayout === 'dropdown' ? new Date(safeFromYear, 0) : undefined}
        endMonth={captionLayout === 'dropdown' ? new Date(safeToYear, 11) : undefined}
        {...restProps}
      />
    );
  },
);

Calendar.displayName = 'Calendar';

export default Calendar;
