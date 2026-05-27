import { Bar, BarChart as RechartsBarChart, CartesianGrid, XAxis, YAxis, LabelList, Cell } from 'recharts';

import { ChartContainer, ChartLegend, ChartLegendContent, ChartTooltip, ChartTooltipContent } from '../ChartPrimitive';
import IBarChartProps from './IBarChartProps';
import { useCallback } from 'react';

const BarChart = <T,>({
  id,
  chartConfig,
  data,
  layout = 'horizontal',
  xAxisOptions,
  yAxisOptions,
  showLabel = false,
  customBarLabel,
  showLegend = false,
  isStack = false,
  activeIndex,
  isNative = true,
  negativeData,
  grid = true,
  activeBar,
  tooltipContent,
  height = 300,
  gridHorizontal,
  gridVertical = false,
  displayFields,
  hideLegendIcon = false,
}: IBarChartProps<T>) => {
  const configFields = Object.keys(chartConfig);
  const fields = displayFields ? configFields.filter(field => displayFields?.includes(field)) : configFields;
  const labelPosition = layout === 'vertical' ? 'right' : 'top';

  const getRadius = useCallback(
    (length: number, index: number) => {
      let radius: number | [number, number, number, number] = 5;

      if (isStack) {
        if (index === 0) {
          radius = layout === 'vertical' ? [4, 0, 0, 4] : [0, 0, 4, 4];
        } else if (index === length - 1) {
          radius = layout === 'vertical' ? [0, 4, 4, 0] : [4, 4, 0, 0];
        } else {
          radius = [0, 0, 0, 0];
        }
      }

      return radius;
    },
    [isStack, layout],
  );

  return (
    <ChartContainer
      id={id}
      config={chartConfig}
      className="w-full"
      {...(height && {
        style: { height },
      })}
    >
      <RechartsBarChart
        accessibilityLayer
        {...{
          data,
          layout,
          margin: {
            top: 40,
            right: 40,
            bottom: 40,
            left: layout === 'vertical' ? 0 : 40,
          },
        }}
      >
        {grid && <CartesianGrid opacity={0.8} stroke="var(--border)" vertical={gridVertical} horizontal={gridHorizontal} />}
        {xAxisOptions && <XAxis tickLine={false} axisLine={false} {...xAxisOptions} />}
        {yAxisOptions && <YAxis tickLine={false} axisLine={false} {...yAxisOptions} />}
        <ChartTooltip cursor={false} content={<ChartTooltipContent hideLabel {...tooltipContent} />} />
        {showLegend && <ChartLegend content={<ChartLegendContent hideIcon={hideLegendIcon} />} />}
        {isNative &&
          fields.map((key, index) => {
            const radius = getRadius(fields.length, index);
            return (
              <Bar
                key={key}
                dataKey={key}
                {...{
                  layout,
                  fill: `var(--color-${key})`,
                  radius,
                  activeBar,
                  ...(isStack && { stackId: 'a' }),
                  ...(!!activeIndex && { activeIndex: activeIndex }),
                }}
              >
                {showLabel && <LabelList position={labelPosition} offset={12} className="fill-[--foreground]" fontSize={12} />}
                {customBarLabel && (
                  <LabelList
                    dataKey={customBarLabel.dataKey}
                    position={customBarLabel.position}
                    offset={8}
                    className="fill-[var(--background)]"
                    fontSize={12}
                  />
                )}
              </Bar>
            );
          })}
        {!isNative && negativeData ? (
          <Bar dataKey={negativeData.dataKey} layout={layout}>
            <LabelList position={labelPosition} dataKey={negativeData.valueKey} fillOpacity={1} />
            {data.map(item => (
              <Cell key={negativeData.valueKey} fill={Number(item[negativeData.dataKey]) > 0 ? 'var(--chart-1)' : 'var(--chart-2)'} />
            ))}
          </Bar>
        ) : null}
      </RechartsBarChart>
    </ChartContainer>
  );
};

BarChart.displayName = 'BarChart';

export default BarChart;
