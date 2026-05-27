import { Label, LabelList, PolarGrid, PolarRadiusAxis, RadialBar, RadialBarChart } from 'recharts';

import { ChartContainer, ChartTooltip, ChartTooltipContent } from '../ChartPrimitive';
import IRadialChartProps from './IRadialChartProps';
import { getCenterSubY } from '../../utils';

const RadialChart = <T,>({
  id,
  chartConfig,
  data,
  displayFields,
  height = 300,
  tooltipContent,
  innerRadius,
  outerRadius,
  startAngle,
  endAngle,
  customRadialLabel,
  polarGridProps,
  radialBarProps,
  centerTitle,
  centerSub,
  isStack,
  hideLegendIcon,
  reverseStackOrder,
}: IRadialChartProps<T>) => {
  const configFields = Object.keys(chartConfig);
  const fields = displayFields ? configFields.filter(field => displayFields?.includes(field)) : configFields;
  return (
    <ChartContainer
      id={id}
      config={chartConfig}
      className="mx-auto aspect-square"
      {...(height && {
        style: { height },
      })}
    >
      <RadialBarChart
        {...{
          data,
          startAngle,
          endAngle,
          innerRadius,
          outerRadius,
          reverseStackOrder,
        }}
      >
        {!hideLegendIcon && <ChartTooltip cursor={false} content={<ChartTooltipContent hideLabel {...tooltipContent} />} />}
        {polarGridProps && <PolarGrid gridType="circle" {...polarGridProps} />}
        {fields.map(key => (
          <RadialBar
            key={key}
            {...{
              dataKey: key,
              fill: `var(--color-${key})`,
              ...(isStack && { stackId: 'a' }),
              ...(!polarGridProps && { background: { fill: 'var(--muted)' } }),
              ...radialBarProps,
            }}
          >
            {customRadialLabel && (
              <LabelList
                position="insideStart"
                dataKey={customRadialLabel.dataKey}
                className="fill-white capitalize mix-blend-luminosity"
                fontSize={11}
                formatter={(value: keyof typeof chartConfig) => {
                  return chartConfig[value]?.label;
                }}
              />
            )}
          </RadialBar>
        ))}
        {(centerTitle || centerSub) && (
          <PolarRadiusAxis tick={false} tickLine={false} axisLine={false}>
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
          </PolarRadiusAxis>
        )}
      </RadialBarChart>
    </ChartContainer>
  );
};

RadialChart.displayName = 'RadialChart';

export default RadialChart;
