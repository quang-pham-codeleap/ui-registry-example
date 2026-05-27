import { useMemo } from 'react';
import IChartProps from './IChartProps';
import { ChartVariant } from './enums';
import {
  BarChart,
  AreaChart,
  LineChart,
  PieChart,
  IBarChartProps,
  IAreaChartProps,
  ILineChartProps,
  IPieChartProps,
  IRadialChartProps,
  RadialChart,
} from './components';
import { extractProps } from '@/utils';

/**
 * Chart component which wraps various chart types from recharts
 *
 * @param {IChartProps<T, K>} props - The props for the Chart component
 * @returns {React.ReactNode} The rendered Chart component
 *
 * @example
 * ```tsx
 * // Example 1: Basic Bar Chart
 * interface MonthDesktop {
 *   desktop: number;
 *   month: string;
 * }
 *
 * const data: MonthDesktop[] = [
 *   { month: 'January', desktop: 186 },
 *   { month: 'February', desktop: 305 },
 *   { month: 'March', desktop: 237 },
 *   { month: 'April', desktop: 73 },
 *   { month: 'May', desktop: 209 },
 *   { month: 'June', desktop: 214 },
 * ];
 *
 * const DefaultBarChart = () => {
 *   const chartConfig = {
 *     desktop: {
 *       label: 'Desktop',
 *       color: 'var(--chart-1)',
 *     },
 *   };
 *
 *   return (
 *     <Chart
 *       type={ChartVariant.Bar}
 *       chartConfig={chartConfig}
 *       data={data}
 *       height={320}
 *       xAxisOptions={{
 *         dataKey: 'month',
 *         type: 'category',
 *       }}
 *     />
 *   );
 * };
 * ```
 *
 * @example
 * ```tsx
 * // Example 2: Line Chart with Multiple Series
 * interface DeviceData {
 *   month: string;
 *   desktop: number;
 *   mobile: number;
 *   tablet: number;
 * }
 *
 * const data: DeviceData[] = [
 *   { month: 'January', desktop: 186, mobile: 80, tablet: 45 },
 *   { month: 'February', desktop: 305, mobile: 120, tablet: 75 },
 *   { month: 'March', desktop: 237, mobile: 180, tablet: 98 },
 *   { month: 'April', desktop: 73, mobile: 150, tablet: 120 },
 *   { month: 'May', desktop: 209, mobile: 230, tablet: 140 },
 *   { month: 'June', desktop: 214, mobile: 280, tablet: 160 },
 * ];
 *
 * const LineChartMultiple = () => {
 *   const chartConfig = {
 *     desktop: {
 *       label: 'Desktop',
 *       color: 'var(--chart-1)',
 *     },
 *     mobile: {
 *       label: 'Mobile',
 *       color: 'var(--chart-2)',
 *     },
 *     tablet: {
 *       label: 'Tablet',
 *       color: 'var(--chart-3)',
 *     },
 *   };
 *
 *   return (
 *     <Chart
 *       type={ChartVariant.Line}
 *       chartConfig={chartConfig}
 *       data={data}
 *       height={320}
 *       showLegend={true}
 *       xAxisOptions={{
 *         dataKey: 'month',
 *         tickMargin: 8,
 *         tickFormatter: value => value.slice(0, 3),
 *       }}
 *     />
 *   );
 * };
 * ```
 *
 * @example
 * ```tsx
 * // Example 3: Area Chart with Stacked Data
 * interface BrowserData {
 *   date: string;
 *   chrome: number;
 *   firefox: number;
 *   safari: number;
 * }
 *
 * const data: BrowserData[] = [
 *   { date: '2023-01', chrome: 4000, firefox: 2400, safari: 2400 },
 *   { date: '2023-02', chrome: 3000, firefox: 1398, safari: 2210 },
 *   { date: '2023-03', chrome: 2000, firefox: 9800, safari: 2290 },
 *   { date: '2023-04', chrome: 2780, firefox: 3908, safari: 2000 },
 *   { date: '2023-05', chrome: 1890, firefox: 4800, safari: 2181 },
 *   { date: '2023-06', chrome: 2390, firefox: 3800, safari: 2500 },
 * ];
 *
 * const AreaChartStacked = () => {
 *   const chartConfig = {
 *     chrome: {
 *       label: 'Chrome',
 *       color: 'var(--chart-1)',
 *     },
 *     firefox: {
 *       label: 'Firefox',
 *       color: 'var(--chart-2)',
 *     },
 *     safari: {
 *       label: 'Safari',
 *       color: 'var(--chart-3)',
 *     },
 *   };
 *
 *   return (
 *     <Chart
 *       type={ChartVariant.Area}
 *       chartConfig={chartConfig}
 *       data={data}
 *       isStack={true}
 *       height={320}
 *       showLegend={true}
 *       xAxisOptions={{
 *         dataKey: 'date',
 *       }}
 *     />
 *   );
 * };
 * ```
 *
 * @example
 * ```tsx
 * // Example 4: Pie Chart with Browser Distribution
 * interface PieChartData {
 *   browser: string;
 *   visitors: number;
 *   fill: string;
 * }
 *
 * const data: PieChartData[] = [
 *   { browser: 'chrome', visitors: 275, fill: 'var(--color-chrome)' },
 *   { browser: 'safari', visitors: 200, fill: 'var(--color-safari)' },
 *   { browser: 'firefox', visitors: 187, fill: 'var(--color-firefox)' },
 *   { browser: 'edge', visitors: 173, fill: 'var(--color-edge)' },
 *   { browser: 'other', visitors: 90, fill: 'var(--color-other)' },
 * ];
 *
 * const PieChartExample = () => {
 *   const chartConfig = {
 *     visitors: {
 *       label: 'Visitors',
 *     },
 *     chrome: {
 *       label: 'Chrome',
 *       color: 'var(--chart-1)',
 *     },
 *     safari: {
 *       label: 'Safari',
 *       color: 'var(--chart-2)',
 *     },
 *     firefox: {
 *       label: 'Firefox',
 *       color: 'var(--chart-3)',
 *     },
 *     edge: {
 *       label: 'Edge',
 *       color: 'var(--chart-4)',
 *     },
 *     other: {
 *       label: 'Other',
 *       color: 'var(--chart-5)',
 *     },
 *   };
 *
 *   return (
 *     <Chart
 *       type={ChartVariant.Pie}
 *       chartConfig={chartConfig}
 *       dataItems={[{ data: data, dataKey: 'visitors', nameKey: 'browser' }]}
 *       height={320}
 *     />
 *   );
 * };
 * ```
 */
const Chart = <T, K extends ChartVariant>({ type, ...props }: IChartProps<T, K>) => {
  const chartContent = useMemo(() => {
    let chartProps;
    switch (type) {
      case ChartVariant.Bar:
        // Extract only the properties that exist in IBarChartProps
        chartProps = extractProps<IBarChartProps<T>, typeof props>(props);
        return <BarChart {...chartProps} />;
      case ChartVariant.Area:
        // Extract only the properties that exist in IBarChartProps
        chartProps = extractProps<IAreaChartProps<T>, typeof props>(props);
        return <AreaChart {...chartProps} />;
      case ChartVariant.Line:
        // Extract only the properties that exist in ILineChartProps
        chartProps = extractProps<ILineChartProps<T>, typeof props>(props);
        return <LineChart {...chartProps} />;
      case ChartVariant.Pie:
        // Extract only the properties that exist in IPieChartProps
        chartProps = extractProps<IPieChartProps<T>, typeof props>(props);
        return <PieChart {...chartProps} />;
      case ChartVariant.Radial:
        // Extract only the properties that exist in IPieChartProps
        chartProps = extractProps<IRadialChartProps<T>, typeof props>(props);
        return <RadialChart {...chartProps} />;
      default:
        return <div>Unsupported chart type</div>;
    }
  }, [type, props]);

  return <>{chartContent}</>;
};

export default Chart;
