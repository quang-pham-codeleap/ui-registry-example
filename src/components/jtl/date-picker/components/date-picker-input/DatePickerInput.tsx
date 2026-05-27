import React, { useCallback } from 'react';
import { Input } from '../../../input';
import { Box } from '../../../box';
import IDatePickerInputProps from './IDatePickerInputProps';

/**
 * Input field component for DatePicker.
 * Renders a single text input for entering a date.
 */
const DatePickerInput: React.FC<IDatePickerInputProps> = ({ dateFormat, inputValue, onInputBlur, onInputChange, autoFocus = false }) => {
  // Handle Enter key: programmatically blur the input so the native blur event fires.
  // This triggers the onBlur handler through the normal DOM event flow,
  // allowing the rAF-based container check in DatePicker to run and close correctly.
  const handleKeyDown = useCallback((e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      (e.target as HTMLInputElement).blur();
    }
  }, []);

  return (
    <Box className="w-full">
      <Input
        type="text"
        placeholder={dateFormat}
        value={inputValue}
        onChange={onInputChange}
        onBlur={onInputBlur}
        onKeyDown={handleKeyDown}
        size="default"
        autoFocus={autoFocus}
      />
    </Box>
  );
};

DatePickerInput.displayName = 'DatePickerInput';

export default DatePickerInput;
