import { CurveType } from 'recharts/types/shape/Curve';
import { LineProps } from 'recharts';
import { IBaseChartProps, IChartAxes, IChartGridProps, IChartStackProps } from '../../interfaces';

/**
 * Props for the LineChart component
 * @template T - The type of data items
 */
export default interface ILineChartProps<T>
  extends IBaseChartProps,
    IChartAxes,
    IChartGridProps,
    IChartStackProps,
    Pick<LineProps, 'dot' | 'activeDot'> {
  /**
   * The data to be displayed in the chart
   */
  data: T[];
  /**
   * Type of curve to use for the line chart
   */
  lineType?: CurveType;
  /**
   * Configuration for custom line labels
   */
  customLineLabel?: {
    /**
     * Data key to use for the label
     */
    dataKey: string;
  };
}
