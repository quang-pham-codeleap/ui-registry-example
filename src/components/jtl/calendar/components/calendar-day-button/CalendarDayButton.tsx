import React from 'react';
import { getDefaultClassNames } from 'react-day-picker';

import { cn } from '@/lib/utils';
import ICalendarDayButtonProps from './ICalendarDayButtonProps';

/**
 * Calendar day button component that uses react-day-picker DayButton with custom
 * styling and focus management via modifier flags.
 *
 * @param props {@link React.ComponentProps<typeof DayButton>}
 */
const CalendarDayButton: React.FC<ICalendarDayButtonProps> = ({ className, day, modifiers, ...props }) => {
  const defaultClassNames = getDefaultClassNames();

  const ref = React.useRef<HTMLButtonElement>(null);

  // Programmatically focus the button when react-day-picker signals the focused modifier.
  // This is required because DayPicker manages keyboard focus via the modifiers object,
  // not via native DOM focus events.
  React.useEffect(() => {
    if (modifiers.focused) {
      ref.current?.focus();
    }
  }, [modifiers.focused]);

  return (
    <button
      ref={ref}
      data-day={day.date.toLocaleDateString()}
      data-selected-single={modifiers.selected && !modifiers.range_start && !modifiers.range_end && !modifiers.range_middle}
      data-range-start={modifiers.range_start}
      data-range-end={modifiers.range_end}
      data-range-middle={modifiers.range_middle}
      className={cn(
        'items-center',
        'justify-center',
        'whitespace-nowrap',
        'rounded-md',
        'text-sm',
        'transition-all',
        'disabled:pointer-events-none',
        'disabled:opacity-50',
        '[&_svg]:pointer-events-none',
        "[&_svg:not([class*='size-'])]:size-4",
        'shrink-0',
        '[&_svg]:shrink-0',
        'focus:outline-2',
        'focus:outline-offset-1',
        'focus:outline-[var(--ring)]',
        'aria-invalid:border-[var(--destructive)]',
        'size-9',
        'hover:bg-[var(--accent)]',
        'hover:text-[var(--accent-foreground)]',
        'hover:cursor-pointer',
        'data-[selected-single=true]:bg-[var(--primary)]',
        'data-[selected-single=true]:text-[var(--primary-foreground)]',
        'data-[range-middle=true]:bg-[var(--accent)]',
        'data-[range-middle=true]:text-[var(--accent-foreground)]',
        'data-[range-start=true]:bg-[var(--primary)]',
        'data-[range-start=true]:text-[var(--primary-foreground)]',
        'data-[range-end=true]:bg-[var(--primary)]',
        'data-[range-end=true]:text-[var(--primary-foreground)]',
        'flex',
        'aspect-square',
        'min-w-(--cell-size)',
        'flex-col',
        'gap-1',
        'leading-none',
        'font-normal',
        'group-data-[focused=true]/day:relative',
        'group-data-[focused=true]/day:z-10',
        'data-[range-end=true]:rounded-md',
        'data-[range-end=true]:rounded-r-md',
        'data-[range-middle=true]:rounded-none',
        'data-[range-start=true]:rounded-md',
        'data-[range-start=true]:rounded-l-md',
        '[&>span]:text-xs',
        '[&>span]:opacity-70',
        defaultClassNames.day,
        className,
      )}
      {...props}
      tabIndex={0}
    />
  );
};

export default CalendarDayButton;
