import { IPieChartData } from './interfaces';
import IBaseChartProps from '../../interfaces/IBaseChartProps';

/**
 * Props for the PieChart component
 * @template T - The type of data items
 */
export default interface IPieChartProps<T> extends IBaseChartProps {
  /**
   * Array of pie chart data configurations
   */
  dataItems: IPieChartData<T>[];
}
