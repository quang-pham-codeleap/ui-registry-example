import { DatePreset } from '../../types';

/**
 * Props for DatePickerPresets component
 */
export default interface IDatePickerPresetsProps {
  /**
   * Array of preset configurations
   */
  presets: DatePreset[];

  /**
   * Index of currently selected preset
   */
  selectedPreset: number | null;

  /**
   * Handler for preset selection
   */
  onPresetClick: (index: number) => void;
}
