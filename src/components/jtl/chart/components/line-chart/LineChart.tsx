import { CartesianGrid, LabelList, Line, LineChart as RechartsLineChart, XAxis, YAxis } from 'recharts';

import { ChartContainer, ChartLegend, ChartLegendContent, ChartTooltip, ChartTooltipContent } from '../ChartPrimitive';
import ILineChartProps from './ILineChartProps';

const LineChart = <T,>({
  id,
  chartConfig,
  data,
  grid = true,
  xAxisOptions,
  yAxisOptions,
  gridHorizontal,
  gridVertical = false,
  displayFields,
  lineType = 'natural',
  showLegend = false,
  height = 300,
  tooltipContent,
  dot = false,
  activeDot,
  showLabel,
  customLineLabel,
  hideLegendIcon = false,
}: ILineChartProps<T>) => {
  const configFields = Object.keys(chartConfig);
  const fields = displayFields ? configFields.filter(field => displayFields?.includes(field)) : configFields;
  return (
    <ChartContainer
      id={id}
      config={chartConfig}
      className="w-full"
      {...(height && {
        style: { height },
      })}
    >
      <RechartsLineChart
        accessibilityLayer
        {...{
          data,
          margin: {
            top: 24,
            left: 24,
            right: 24,
          },
        }}
      >
        {grid && <CartesianGrid opacity={0.8} stroke="var(--border)" vertical={gridVertical} horizontal={gridHorizontal} />}
        {xAxisOptions && <XAxis tickLine={false} axisLine={false} {...xAxisOptions} />}
        {yAxisOptions && <YAxis tickLine={false} axisLine={false} {...yAxisOptions} />}
        <ChartTooltip cursor={false} content={<ChartTooltipContent hideLabel {...tooltipContent} />} />

        {fields.map(key => (
          <Line key={key} dataKey={key} type={lineType} stroke={`var(--color-${key})`} strokeWidth={2} dot={dot} activeDot={activeDot}>
            {(showLabel || customLineLabel) && (
              <LabelList
                position="top"
                offset={12}
                className="fill-[--foreground]"
                fontSize={12}
                {...(customLineLabel && {
                  dataKey: customLineLabel.dataKey,
                  formatter: (value: keyof typeof chartConfig) => chartConfig[value]?.label,
                })}
              />
            )}
          </Line>
        ))}
        {showLegend && <ChartLegend content={<ChartLegendContent hideIcon={hideLegendIcon} />} />}
      </RechartsLineChart>
    </ChartContainer>
  );
};

LineChart.displayName = 'LineChart';

export default LineChart;
