import { PieLabel, PieProps } from 'recharts';

/**
 * Data structure for Pie Chart segments
 * @template T - The type of data items
 */
export default interface IPieChartData<T> extends Pick<PieProps, 'innerRadius' | 'strokeWidth' | 'activeShape' | 'outerRadius'> {
  /**
   * Array of data items to be displayed in the pie chart
   */
  data: T[];
  /**
   * Key in data items used to determine the size of each pie segment
   */
  dataKey: keyof T & string;
  /**
   * Key in data items used for segment names/labels
   */
  nameKey: keyof T & string;
  /**
   * Whether to show separators between pie segments
   */
  separator?: boolean;
  /**
   * Whether to show label lines connecting labels to segments
   */
  labelLine?: boolean;
  /**
   * Custom pie label configuration
   */
  pieLabel?: PieLabel;
  /**
   * Configuration for custom pie segment labels
   */
  customPieLabel?: {
    /**
     * Data key to use for custom labels
     */
    dataKey: string;
  };
  /**
   * Index or indices of active (highlighted) pie segments
   */
  activePieIndex?: number | number[];
  /**
   * Title to display in the center of the pie chart
   */
  centerTitle?: string | number;
  /**
   * Subtitle to display in the center of the pie chart
   */
  centerSub?: string | number;
}
