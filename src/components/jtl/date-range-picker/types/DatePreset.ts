import { DateRange } from 'react-day-picker';

/**
 * Preset configuration for quick date selection
 */
type DatePreset = {
  /**
   * Display label for the preset
   */
  label: string;

  /**
   * Function to calculate the date or date range
   */
  getValue?: () => DateRange;
};

export default DatePreset;
