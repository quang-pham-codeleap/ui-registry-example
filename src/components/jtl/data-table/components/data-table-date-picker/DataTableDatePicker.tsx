import { DateRangePicker } from '../../../date-range-picker';
import IDataTableDatePickerProps from './IDataTableDatePickerProps';
import { Box } from '../../../box';
import { DatePicker } from '../../../date-picker';
import { DateRange } from 'react-day-picker';
import { useDataTableStaticContext } from '../../hooks';

/**
 * DataTableDatePicker component for the DataTable action bar.
 * Wraps the DateRangePicker component with DataTable-specific props.
 *
 * @param props {@link IDataTableDatePickerProps} - The component props
 * @returns The rendered DataTableDatePicker component
 */
const DataTableDatePicker = <M extends 'single' | 'range'>({
  value,
  onChange,
  placeholder,
  isDisabled,
  disableDate,
  format,
  mode,
}: IDataTableDatePickerProps<M>) => {
  const { size } = useDataTableStaticContext<object>();

  // Keep date picker controls visually aligned with DataTable size.
  // DataTable has sm | md | lg, while DatePicker supports sm | default.
  const pickerSize = size === 'sm' ? 'sm' : 'default';

  if (mode === 'single') {
    return (
      <DatePicker
        value={value as Date}
        onChange={date => {
          if (date) {
            (onChange as (date: Date) => void)(date);
          }
        }}
        placeholder={placeholder}
        isDisabled={isDisabled}
        disableDate={disableDate}
        format={format}
        size={pickerSize}
      />
    );
  }
  return (
    <Box className="w-[216px]">
      <DateRangePicker
        value={value as DateRange}
        onChange={range => {
          if (range) {
            (onChange as (range: DateRange) => void)(range);
          }
        }}
        placeholder={placeholder}
        isDisabled={isDisabled}
        disableDate={disableDate}
        format={format}
        size={pickerSize}
      />
    </Box>
  );
};

DataTableDatePicker.displayName = 'DataTableDatePicker';

export default DataTableDatePicker;
