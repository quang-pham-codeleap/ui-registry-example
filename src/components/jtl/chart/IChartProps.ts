import { IAreaChartProps, IBarChartProps, ILineChartProps, IPieChartProps, IRadialChartProps } from './components';
import { ChartVariant } from './enums';

/**
 * Props interface for the Chart component, which conditionally extends the appropriate chart type props
 * based on the specified chart type.
 *
 * @template T - The type of data items to be displayed in the chart
 * @template K - The chart type, which must be one of the values from the ChartVariant enum
 */
type IChartProps<T, K extends ChartVariant> = K extends ChartVariant.Area
  ? {
      /**
       * ChartVariant.Area for an area chart
       */
      type: ChartVariant.Area;
    } & IAreaChartProps<T>
  : K extends ChartVariant.Bar
    ? {
        /**
         * ChartVariant.Bar for a bar chart
         */
        type: ChartVariant.Bar;
      } & IBarChartProps<T>
    : K extends ChartVariant.Line
      ? {
          /**
           * ChartVariant.Line for a line chart
           */
          type: ChartVariant.Line;
        } & ILineChartProps<T>
      : K extends ChartVariant.Pie
        ? {
            /**
             * ChartVariant.Pie for a pie chart
             */
            type: ChartVariant.Pie;
          } & IPieChartProps<T>
        : K extends ChartVariant.Radial
          ? {
              /**
               * ChartVariant.Radial for a radial chart
               */
              type: ChartVariant.Radial;
            } & IRadialChartProps<T>
          : never;

export default IChartProps;
