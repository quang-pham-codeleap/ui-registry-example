/**
 * Gets the number of days in a specific month
 * @param month - Month (1-12)
 * @param year - Year (e.g., 2025)
 * @returns Number of days in the month
 */
export default function getDaysInMonth(month: number, year: number): number {
  // Month is 0-indexed in Date constructor
  return new Date(year, month, 0).getDate();
}
