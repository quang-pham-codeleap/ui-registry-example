import React from 'react';
import { DayPicker } from 'react-day-picker';
import { ICalendarRangeProps, ICalendarSingleProps } from './interfaces';

/**
 * Common props shared by all Calendar variants
 */
interface ICalendarBaseProps
  extends Omit<
    React.ComponentProps<typeof DayPicker>,
    'mode' | 'selected' | 'onSelect' | 'defaultMonth' | 'numberOfMonths' | 'fromYear' | 'toYear'
  > {}

/**
 * Union type for all Calendar component props
 */
type ICalendarProps = (ICalendarSingleProps | ICalendarRangeProps) & ICalendarBaseProps;

export default ICalendarProps;
