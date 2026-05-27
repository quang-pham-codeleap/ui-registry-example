import { CurveType } from 'recharts/types/shape/Curve';
import { StackOffsetType } from 'recharts/types/util/types';
import { IBaseChartProps, IChartAxes, IChartGridProps, IChartStackProps } from '../../interfaces';

/**
 * Props for the AreaChart component
 * @template T - The type of data items
 */
export default interface IAreaChartProps<T> extends Omit<IBaseChartProps, 'showLabel'>, IChartAxes, IChartGridProps, IChartStackProps {
  /**
   * The data to be displayed in the chart
   */
  data: T[];
  /**
   * Type of curve to use for the area chart
   */
  areaType?: CurveType;
  /**
   * Type of stack offset to use when stacking multiple areas
   */
  stackOffset?: StackOffsetType;
  /**
   * Whether to use gradient fill for the areas
   */
  useGradient?: boolean;
}
