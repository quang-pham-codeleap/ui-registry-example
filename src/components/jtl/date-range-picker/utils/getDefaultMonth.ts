import { addMonths, subMonths } from 'date-fns';

/**
 * Calculate the default month to show in the calendar.
 * Ensures selected dates are visible in the 2-month calendar view.
 */
export default function getDefaultMonth(fromDate: Date | null, toDate: Date | null): Date {
  // No selection yet, show current month
  if (!fromDate && !toDate) {
    return new Date();
  }

  const now = new Date();
  const currentMonth = now.getMonth();
  const currentYear = now.getFullYear();
  const nextMonth = addMonths(now, 1);

  // Check if a date is within the visible 2-month window
  const isInVisibleRange = (date: Date): boolean => {
    const dateMonth = date.getMonth();
    const dateYear = date.getFullYear();
    const isCurrentMonth = dateMonth === currentMonth && dateYear === currentYear;
    const isNextMonth = dateMonth === nextMonth.getMonth() && dateYear === nextMonth.getFullYear();
    return isCurrentMonth || isNextMonth;
  };

  const fromInRange = fromDate ? isInVisibleRange(fromDate) : true;
  const toInRange = toDate ? isInVisibleRange(toDate) : true;

  // Both dates visible, no adjustment needed
  if (fromInRange && toInRange) {
    return new Date();
  }

  // Adjust to show the end date (or from date if no end)
  const baseMonth = toDate || fromDate || new Date();
  return subMonths(baseMonth, 1);
}
