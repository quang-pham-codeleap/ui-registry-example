import React from 'react';
import { DayPicker, getDefaultClassNames } from 'react-day-picker';

import { cn } from '@/lib/utils';
import { Button } from '../../../button';
import CalendarDayButton from '../calendar-day-button/CalendarDayButton';
import CalendarDropdown from '../calendar-dropdown/CalendarDropdown';
import IBaseCalendarProps from './IBaseCalendarProps';

/**
 * Base calendar component that wraps react-day-picker with custom styling,
 * localised month dropdown formatting, and project design-system components.
 *
 * All Calendar variants (single / range) render through this component.
 *
 * @param props {@link React.ComponentProps<typeof DayPicker>}
 */
const BaseCalendar: React.FC<IBaseCalendarProps> = ({
  className,
  classNames,
  showOutsideDays = true,
  captionLayout = 'label',
  formatters,
  components,
  // Extract locale so we can use it in formatMonthDropdown for correct localised month names
  locale,
  ...props
}) => {
  const defaultClassNames = getDefaultClassNames();
  const navBtnClasses =
    'flex justify-center items-center border border-[var(--input)] rounded-[var(--border-radius-md)] text-[var(--foreground)] hover:bg-[var(--accent)] h-7 w-7 bg-transparent hover:opacity-100 aria-disabled:opacity-50 p-0 select-none cursor-pointer';

  return (
    <DayPicker
      showOutsideDays={showOutsideDays}
      locale={locale}
      className={cn(
        'border rounded-md border-[var(--border)] shadow-md',
        'p-3',
        'bg-[var(--background)]',
        'group/calendar',
        '[--cell-size:--spacing(8)]',
        '[[data-slot=card-content]_&]:bg-transparent',
        '[[data-slot=popover-content]_&]:bg-transparent',
        'rtl:**:[.rdp-button_next>svg]:rotate-180',
        'rtl:**:[.rdp-button_previous>svg]:rotate-180',
        className,
      )}
      captionLayout={captionLayout}
      formatters={{
        // Use locale.code (BCP 47 tag e.g. 'de', 'en-US') so month names match
        // the locale prop (e.g. locale={de} → "Jan" becomes "Jan.", "Feb" → "Feb." in German).
        // Falls back to 'default' (browser locale) when no locale is provided.
        formatMonthDropdown: date => date.toLocaleString(locale?.code ?? 'default', { month: 'short' }),
        ...formatters,
      }}
      classNames={{
        root: cn('w-fit', defaultClassNames.root),
        months: cn('flex gap-4 flex-col md:flex-row relative', defaultClassNames.months),
        month: cn('flex flex-col w-full gap-4', defaultClassNames.month),
        // The nav is absolutely positioned and spans the full header width (inset-x-0).
        // Without pointer-events-none the nav's transparent middle area intercepts clicks
        // on the month/year dropdowns sitting underneath it in the caption row.
        nav: cn('flex items-center gap-1 w-full absolute top-0 inset-x-0 justify-between pointer-events-none', defaultClassNames.nav),
        // Restore pointer events only for the actual prev/next nav buttons.
        button_previous: cn(navBtnClasses, 'pointer-events-auto', defaultClassNames.button_previous),
        button_next: cn(navBtnClasses, 'pointer-events-auto', defaultClassNames.button_next),
        month_caption: cn('flex items-center justify-center h-(--cell-size) w-full px-(--cell-size)', defaultClassNames.month_caption),
        // Horizontal flex container that holds both the month and year CalendarDropdown components
        dropdowns: cn('w-full flex items-start justify-center h-(--cell-size) gap-1.5', defaultClassNames.dropdowns),
        // dropdown_root wraps our CalendarDropdown — keep it as a plain passthrough container
        dropdown_root: cn('relative', defaultClassNames.dropdown_root),
        // dropdown class targets the native <select> — unused since we override Dropdown component
        dropdown: cn(defaultClassNames.dropdown),
        caption_label: cn('select-none font-medium text-sm', defaultClassNames.caption_label),
        table: 'w-full border-collapse',
        weekdays: cn('flex', defaultClassNames.weekdays),
        weekday: cn('text-[var(--muted-foreground)] rounded-md flex-1 font-normal text-[0.8rem] select-none', defaultClassNames.weekday),
        week: cn('flex w-full mt-2', defaultClassNames.week),
        week_number_header: cn('select-none w-(--cell-size)', defaultClassNames.week_number_header),
        week_number: cn('text-[0.8rem] select-none text-[var(--muted-foreground)]', defaultClassNames.week_number),
        day: cn(
          'relative w-full h-full p-0 text-center group/day aspect-square select-none',
          '[&:first-child[data-selected=true]_button]:rounded-l-md',
          '[&:last-child[data-selected=true]_button]:rounded-r-md',
          defaultClassNames.day,
        ),
        range_start: cn('rounded-l-md bg-[var(--accent)]', defaultClassNames.range_start),
        range_middle: cn('rounded-none', defaultClassNames.range_middle),
        range_end: cn('rounded-r-md bg-[var(--accent)]', defaultClassNames.range_end),
        today: cn('bg-[var(--accent)] text-[var(--accent-foreground)] rounded-md data-[selected=true]:rounded-none', defaultClassNames.today),
        outside: cn(
          'opacity-30',
          'text-[var(--muted-foreground)]',
          'aria-selected:bg-[var(--accent)]/50',
          'aria-selected:text-[var(--accent-foreground)]',
          defaultClassNames.outside,
        ),
        disabled: cn('text-[var(--muted-foreground)] opacity-50', defaultClassNames.disabled),
        hidden: cn('invisible', defaultClassNames.hidden),
        // Allow consumers to override individual class names
        ...classNames,
      }}
      components={{
        Root: ({ className, rootRef, ...props }) => {
          return <div data-slot="calendar" ref={rootRef} className={cn(className)} {...props} />;
        },
        NextMonthButton: ({ ...props }) => {
          return <Button variant="outline" icon="ChevronRight" size="iconXs" {...props} />;
        },
        PreviousMonthButton: ({ ...props }) => {
          return <Button variant="outline" icon="ChevronLeft" size="iconXs" {...props} />;
        },
        DayButton: props => <CalendarDayButton {...props} />,
        WeekNumber: ({ children, ...props }) => {
          return (
            <td {...props}>
              <div className="flex size-(--cell-size) items-center justify-center text-center">{children}</div>
            </td>
          );
        },
        // Replace the native <select> with our styled Select component for month/year dropdowns
        Dropdown: props => <CalendarDropdown {...props} />,
        ...components,
      }}
      {...props}
    />
  );
};

export default BaseCalendar;
