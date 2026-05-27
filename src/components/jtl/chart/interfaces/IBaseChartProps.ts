import { ChartConfig, IChartTooltipContentProps } from '../components/ChartPrimitive';

/**
 * Base interface for all chart components
 * Contains common properties shared across different chart types
 */
export default interface IBaseChartProps {
  /**
   * Unique identifier for the chart
   */
  id?: string;
  /**
   * Configuration object that defines the visual representation and behavior of chart data series.
   *
   * @example
   * ```tsx
   * const chartConfig = {
   *   // Each key represents a data series ID
   *   series1: {
   *     label: 'Series 1',       // Display name for the legend
   *     icon: MyCustomIcon,      // Optional icon component for the legend
   *     color: '#FF0000',        // Single color for all themes
   *     // OR
   *     theme: {                // Theme-specific colors
   *       light: '#FF0000',     // Color for light theme
   *       dark: '#FF6666'       // Color for dark theme
   *     }
   *   },
   *   // ... additional series
   * };
   * ```
   *
   * @note Either `color` or `theme` must be provided for each series, but not both.
   * Use `color` for a single color across all themes, or `theme` to specify different colors per theme.
   */
  chartConfig: ChartConfig;
  /**
   * Height of the chart in pixels
   */
  height?: number;
  /**
   * Whether to show the legend
   */
  showLegend?: boolean;
  /**
   * Whether to show labels on chart elements
   */
  showLabel?: boolean;
  /**
   * Configuration for tooltip content
   */
  tooltipContent?: IChartTooltipContentProps;
  /**
   * Whether to hide the icon in the legend
   */
  hideLegendIcon?: boolean;
}
