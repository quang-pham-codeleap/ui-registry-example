import React from 'react';
import { Button } from '../../../button';
import IDatePickerPresetsProps from './IDatePickerPresetsProps';
import { Box } from '../../../box';

/**
 * Presets sidebar component for DatePicker
 * Displays a list of quick date selection options
 */
const DatePickerPresets: React.FC<IDatePickerPresetsProps> = ({ presets, selectedPreset, onPresetClick }) => {
  if (!presets || presets.length === 0) {
    return null;
  }

  return (
    <Box className="flex flex-col items-start w-max gap-2 p-2 rounded-[var(--border-radius-default)]">
      {presets.map((preset, index) => (
        <Button
          key={preset.label}
          variant={selectedPreset === index ? 'default' : 'ghost'}
          size="xs"
          onClick={() => onPresetClick(index)}
          label={preset.label}
          data-selected={selectedPreset === index}
        />
      ))}
    </Box>
  );
};

DatePickerPresets.displayName = 'DatePickerPresets';

export default DatePickerPresets;
