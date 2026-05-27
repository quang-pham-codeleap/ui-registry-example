import { DateRange } from 'react-day-picker';
import { DatePreset } from '../types';

/**
 * Get date range for the last N days
 */
const getLastNDays = (days: number): DateRange => {
  const today = new Date();
  const from = new Date(today);
  from.setDate(today.getDate() - days);
  return { from, to: today };
};

/**
 * Get date range for the current week (Monday to Sunday)
 */
const getThisWeek = (): DateRange => {
  const today = new Date();
  const dayOfWeek = today.getDay();
  const diff = dayOfWeek === 0 ? 6 : dayOfWeek - 1; // Adjust for Monday start

  const monday = new Date(today);
  monday.setDate(today.getDate() - diff);
  monday.setHours(0, 0, 0, 0);
  const sunday = new Date(today);
  sunday.setDate(today.getDate() + (6 - diff));
  sunday.setHours(23, 59, 59, 999);

  return { from: monday, to: sunday };
};

/**
 * Get date range for the current month
 */
const getThisMonth = (): DateRange => {
  const today = new Date();
  const firstDayOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);
  const lastDayOfMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0);
  return { from: firstDayOfMonth, to: lastDayOfMonth };
};

/**
 * Get date range for the current year
 */
const getThisYear = (): DateRange => {
  const today = new Date();
  const firstDayOfYear = new Date(today.getFullYear(), 0, 1);
  const lastDayOfYear = new Date(today.getFullYear(), 11, 31);
  return { from: firstDayOfYear, to: lastDayOfYear };
};

/**
 * Common date range presets for DatePicker component
 */
export const DATE_RANGE_PRESETS: DatePreset[] = [
  {
    label: 'Letzte 30 Tage',
    getValue: () => getLastNDays(30),
  },
  {
    label: 'Letzte 60 Tage',
    getValue: () => getLastNDays(60),
  },
  {
    label: 'Letzte 90 Tage',
    getValue: () => getLastNDays(90),
  },
  {
    label: 'Diese Woche',
    getValue: getThisWeek,
  },
  {
    label: 'Dieser Monat',
    getValue: getThisMonth,
  },
  {
    label: 'Dieses Jahr',
    getValue: getThisYear,
  },
  {
    label: 'Individuelle',
  },
];

/**
 * Helper functions for creating custom date range presets
 */
const dateRangePresetHelpers = {
  getLastNDays,
  getThisWeek,
  getThisMonth,
  getThisYear,
};

export default dateRangePresetHelpers;
