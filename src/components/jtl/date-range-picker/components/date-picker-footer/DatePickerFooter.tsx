import React from 'react';
import { Button } from '../../../button';
import IDatePickerFooterProps from './IDatePickerFooterProps';
import { Box } from '../../../box';

/**
 * Footer component for DatePicker
 * Contains Clear and Apply action buttons
 */
const DatePickerFooter: React.FC<IDatePickerFooterProps> = ({ onClear, onApply }) => {
  return (
    <Box className="flex justify-end gap-[10px]">
      <Button variant="outline" size="default" onClick={onClear} label="Löschen" />
      <Button variant="default" size="default" onClick={onApply} label="Anwenden" />
    </Box>
  );
};

DatePickerFooter.displayName = 'DatePickerFooter';

export default DatePickerFooter;
