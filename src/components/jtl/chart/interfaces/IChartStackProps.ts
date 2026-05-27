/**
 * Interface for chart stacking configuration
 * Provides options for configuring stacked charts and display fields
 */
export default interface IChartStackProps {
  /**
   * Whether to stack the chart elements
   */
  isStack?: boolean;
  /**
   * Array of field names to display in the chart
   */
  displayFields?: string[];
}
