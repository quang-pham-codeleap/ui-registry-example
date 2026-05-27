import { CategoricalChartProps } from 'recharts/types/chart/generateCategoricalChart';
import { IBaseChartProps, IChartStackProps } from '../../interfaces';
import { PolarGridProps, RadialBarProps } from 'recharts';

/**
 * Props for the LineChart component
 * @template T - The type of data items
 */
export default interface IRadialChartProps<T> extends IBaseChartProps, IChartStackProps, CategoricalChartProps {
  /**
   * The data to be displayed in the chart
   */
  data: T[];

  /**
   * Custom radial label
   */
  customRadialLabel?: {
    /**
     * Data key to use for custom labels
     */
    dataKey: string;
  };

  /**
   * Props for the polar grid
   */
  polarGridProps?: PolarGridProps;

  /**
   * Props for the radial bar
   */
  radialBarProps?: Omit<RadialBarProps, 'dataKey' | 'fill' | 'stackId' | 'ref'>;

  /**
   * Title to display in the center of the pie chart
   */
  centerTitle?: string | number;

  /**
   * Subtitle to display in the center of the pie chart
   */
  centerSub?: string | number;
}
