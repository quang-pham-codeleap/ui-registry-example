/**
 * Interface for chart grid configuration
 * Provides options for configuring grid lines in charts
 */
export default interface IChartGridProps {
  /**
   * Whether to show the grid
   */
  grid?: boolean;
  /**
   * Whether to show horizontal grid lines
   */
  gridHorizontal?: boolean;
  /**
   * Whether to show vertical grid lines
   */
  gridVertical?: boolean;
}
