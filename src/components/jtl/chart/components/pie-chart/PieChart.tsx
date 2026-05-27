import { useMemo } from 'react';
import { PieChart as RechartsPieChart, Pie, LabelList, Label } from 'recharts';
import { ChartContainer, ChartLegend, ChartLegendContent, ChartTooltip, ChartTooltipContent } from '../ChartPrimitive';
import IPieChartProps from './IPieChartProps';
import getCenterSubY from '../../utils/getCenterSubY';

const PieChart = <T,>({
  id,
  chartConfig,
  dataItems,
  showLegend = false,
  height = 300,
  tooltipContent,
  showLabel,
  hideLegendIcon = false,
}: IPieChartProps<T>) => {
  const renderLabel = useMemo(
    () =>
      ({ cx, cy, x, y, textAnchor, dominantBaseline, value }: { [key: string]: never }) => {
        return (
          <text cx={cx} cy={cy} x={x} y={y} textAnchor={textAnchor} dominantBaseline={dominantBaseline} fill="var(--foreground)">
            {value}
          </text>
        );
      },
    [],
  );

  return (
    <ChartContainer
      id={id}
      config={chartConfig}
      className="mx-auto aspect-square [&_.recharts-text]:fill-background"
      {...(height && {
        style: { height },
      })}
    >
      <RechartsPieChart
        accessibilityLayer
        width={height}
        height={height}
        margin={{
          left: 12,
          right: 12,
        }}
      >
        <ChartTooltip cursor={false} content={<ChartTooltipContent hideLabel {...tooltipContent} />} />
        {dataItems.map(dataItem => {
          const {
            data,
            dataKey,
            nameKey,
            separator = true,
            labelLine = true,
            pieLabel,
            customPieLabel,
            innerRadius,
            outerRadius,
            strokeWidth,
            activeShape,
            activePieIndex: activeIndex,
            centerTitle,
            centerSub,
          } = dataItem;
          return (
            <Pie
              key={`${dataKey}-${nameKey}`}
              {...{
                data,
                dataKey,
                nameKey,
                labelLine,
                label: showLabel ? renderLabel : false,
                innerRadius,
                outerRadius,
                strokeWidth,
                activeShape,
                activeIndex,
                ...(!separator && { stroke: '0' }),
                ...(pieLabel && { label: pieLabel }),
              }}
            >
              {customPieLabel && (
                <LabelList
                  dataKey={customPieLabel.dataKey}
                  className="fill-[var(--background)]"
                  stroke="none"
                  fontSize={12}
                  formatter={(value: keyof typeof chartConfig) => {
                    return chartConfig[value]?.label;
                  }}
                />
              )}
              {(centerTitle || centerSub) && (
                <Label
                  content={({ viewBox }) => {
                    if (viewBox && 'cx' in viewBox && 'cy' in viewBox) {
                      return (
                        <text x={viewBox.cx} y={viewBox.cy} textAnchor="middle" dominantBaseline="middle">
                          {centerTitle && (
                            <tspan
                              x={viewBox.cx}
                              y={viewBox.cy}
                              className="fill-[var(--foreground)] text-[length:var(--typography-base-sizes-3x-large-font-size)] font-bold"
                            >
                              {centerTitle}
                            </tspan>
                          )}
                          {centerSub && (
                            <tspan
                              x={viewBox.cx}
                              y={getCenterSubY(viewBox.cy)}
                              className="fill-[var(--muted-foreground)] text-[length:var(--typography-base-sizes-extra-small-font-size)] font-normal leading-[var(--typography-base-sizes-extra-small-line-height)]"
                            >
                              {centerSub}
                            </tspan>
                          )}
                        </text>
                      );
                    }
                  }}
                />
              )}
            </Pie>
          );
        })}
        {showLegend &&
          dataItems.map(dataItem => (
            <ChartLegend
              key={`${dataItem.dataKey}-${dataItem.nameKey}`}
              content={<ChartLegendContent nameKey={dataItem.nameKey} hideIcon={hideLegendIcon} />}
              className="-translate-y-2 flex-wrap gap-2 [&>*]:basis-1/4 [&>*]:justify-center"
            />
          ))}
      </RechartsPieChart>
    </ChartContainer>
  );
};

PieChart.displayName = 'PieChart';

export default PieChart;
