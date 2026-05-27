import { formatDate, isValid, parseISO } from 'date-fns';
import { DEFAULT_DATE_DISPLAY_FORMAT } from '../constants';

/**
 * Format a raw filter value for display in the filter chip.
 * - DATE type: accepts either Date instances or ISO strings, reformats as dd.MM.yyyy;
 *   range values joined with " - "
 * - All other types: render the first value as a string with a "+N" count badge
 */
export default function formatDateValue(rawValues: Date[]): string {
  if (!rawValues.length) return '';

  const formatSingle = (raw: unknown): string => {
    // Date instance — format directly (filter state now stores Date objects)
    if (raw instanceof Date) {
      return isValid(raw) ? formatDate(raw, DEFAULT_DATE_DISPLAY_FORMAT) : String(raw);
    }
    // Fallback: ISO string (backwards-compatible with persisted/external filter state)
    if (typeof raw !== 'string') return String(raw);
    try {
      const parsed = parseISO(raw);
      return isValid(parsed) ? formatDate(parsed, DEFAULT_DATE_DISPLAY_FORMAT) : raw;
    } catch {
      return raw;
    }
  };

  // Range operator emits two values → show "from - to"
  if (rawValues.length === 2) {
    return `${formatSingle(rawValues[0])} - ${formatSingle(rawValues[1])}`;
  }

  return formatSingle(rawValues[0]);
}
