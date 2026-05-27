import { Area, AreaChart as RechartsAreaChart, CartesianGrid, XAxis, YAxis } from 'recharts';
import { ChartContainer, ChartLegend, ChartLegendContent, ChartTooltip, ChartTooltipContent } from '../ChartPrimitive';
import IAreaChartProps from './IAreaChartProps';

const AreaChart = <T,>({
  id,
  chartConfig,
  data,
  grid = true,
  areaType = 'natural',
  xAxisOptions,
  yAxisOptions,
  gridHorizontal,
  gridVertical = false,
  isStack = false,
  stackOffset,
  showLegend = false,
  height = 300,
  tooltipContent,
  useGradient = false,
  hideLegendIcon = false,
}: IAreaChartProps<T>) => {
  const fields = Object.keys(chartConfig);
  return (
    <ChartContainer
      id={id}
      config={chartConfig}
      className="w-full"
      {...(height && {
        style: { height },
      })}
    >
      <RechartsAreaChart
        accessibilityLayer
        {...{
          data,
          margin: {
            left: 12,
            right: 12,
          },
          ...(stackOffset && { stackOffset }),
        }}
      >
        {grid && <CartesianGrid opacity={0.8} stroke="var(--border)" vertical={gridVertical} horizontal={gridHorizontal} />}
        {xAxisOptions && <XAxis tickLine={false} axisLine={false} {...xAxisOptions} />}
        {yAxisOptions && <YAxis tickLine={false} axisLine={false} {...yAxisOptions} />}
        <ChartTooltip cursor={false} content={<ChartTooltipContent hideLabel {...tooltipContent} />} />
        {useGradient && (
          <defs>
            {fields.map(key => (
              <linearGradient key={key} id={`fill-${key}`} x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor={`var(--color-${key})`} stopOpacity={0.8} />
                <stop offset="95%" stopColor={`var(--color-${key})`} stopOpacity={0.1} />
              </linearGradient>
            ))}
          </defs>
        )}
        {fields.map(key => (
          <Area
            key={key}
            fill={`var(--color-${key})`}
            fillOpacity={0.4}
            stroke={`var(--color-${key})`}
            {...{
              dataKey: key,
              type: areaType,
              ...(isStack && { stackId: 'a' }),
              ...(useGradient && { fill: `url(#fill-${key})` }),
            }}
          />
        ))}
        {showLegend && <ChartLegend content={<ChartLegendContent hideIcon={hideLegendIcon} />} />}
      </RechartsAreaChart>
    </ChartContainer>
  );
};

AreaChart.displayName = 'AreaChart';

export default AreaChart;
