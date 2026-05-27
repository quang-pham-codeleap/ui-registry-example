import { BarProps } from 'recharts';
import { LabelPosition } from 'recharts/types/component/Label';
import { IBaseChartProps, IChartAxes, IChartGridProps, IChartStackProps } from '../../interfaces';

/**
 * Props for the BarChart component
 * @template T - The type of data items
 */
export default interface IBarChartProps<T> extends Pick<BarProps, 'activeBar'>, IBaseChartProps, IChartAxes, IChartGridProps, IChartStackProps {
  /**
   * The data to be displayed in the chart
   */
  data: T[];
  /**
   * Layout orientation of the chart
   */
  layout?: 'horizontal' | 'vertical';
  /**
   * Index of the active bar
   */
  activeIndex?: number;
  /**
   * Whether to use native rendering
   */
  isNative?: boolean;
  /**
   * Custom label configuration
   */
  customBarLabel?: {
    /**
     * Data key to use for the label
     */
    dataKey: string;
    /**
     * Position of the label relative to the bar
     */
    position: LabelPosition;
  };
  /**
   * Configuration for negative data visualization
   */
  negativeData?: {
    /**
     * Key in data items used to determine which data is negative
     */
    dataKey: keyof T & string;
    /**
     * Key in data items used for the value of negative data
     */
    valueKey: keyof T & string;
  };
}
