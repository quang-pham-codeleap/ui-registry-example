import React, { useCallback } from 'react';
import { Input } from '../../../input';
import { Box } from '../../../box';
import IDatePickerInputProps from './IDatePickerInputProps';

/**
 * Input fields component for DatePicker
 * Displays single input for single mode or two inputs (Von/Bis) for range mode
 */
const DatePickerInput: React.FC<IDatePickerInputProps> = ({
  dateFormat,
  inputFromValue = '',
  inputToValue = '',
  onInputFromChange,
  onInputToChange,
  onInputFromBlur,
  onInputToBlur,
  autoFocus = false,
}) => {
  // Handle Enter key: programmatically blur the input so the native blur event fires.
  // Consistent with the single DatePickerInput pattern.
  const handleKeyDown = useCallback((e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      (e.target as HTMLInputElement).blur();
    }
  }, []);

  return (
    <Box className="flex items-center gap-4">
      <Box className="w-full">
        <Input
          type="text"
          placeholder={`Von ${dateFormat}`}
          value={inputFromValue}
          onChange={onInputFromChange}
          onBlur={onInputFromBlur}
          onKeyDown={handleKeyDown}
          size="default"
          autoFocus={autoFocus}
        />
      </Box>
      <Box className="w-full">
        <Input
          type="text"
          placeholder={`Bis ${dateFormat}`}
          value={inputToValue}
          onChange={onInputToChange}
          onBlur={onInputToBlur}
          onKeyDown={handleKeyDown}
          size="default"
        />
      </Box>
    </Box>
  );
};

DatePickerInput.displayName = 'DatePickerInput';

export default DatePickerInput;
