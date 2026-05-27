import { XAxisProps, YAxisProps } from 'recharts';

/**
 * Interface for chart axis configuration
 * Provides options for configuring X and Y axes in charts
 */
export default interface IChartAxes {
  /**
   * Options for X axis configuration
   */
  xAxisOptions?: XAxisProps;
  /**
   * Options for Y axis configuration
   */
  yAxisOptions?: YAxisProps;
}
