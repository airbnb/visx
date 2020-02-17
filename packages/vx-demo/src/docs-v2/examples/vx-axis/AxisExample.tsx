import React from 'react';
import { Grid } from '@vx/grid';
import { Group } from '@vx/group';
import { curveBasis } from '@vx/curve';
import { GradientOrangeRed } from '@vx/gradient';
import genDateValue, { DateValue } from '@vx/mock-data/lib/generators/genDateValue';
import { AxisLeft, AxisRight, AxisBottom } from '@vx/axis';
import { Area, LinePath, Line } from '@vx/shape';
import { scaleTime, scaleLinear } from '@vx/scale';
import { extent } from 'd3-array';

const data = genDateValue(20);
const pinkDark = '#8e205f';
const pinkLight = '#f4419f';
const orange = 'orange';

// accessors
const x = (d: DateValue) => d.date;
const y = (d: DateValue) => d.value;

// responsive utils for axis ticks
const numTicksForHeight = (height: number) => {
  if (height <= 300) return 3;
  if (height > 300 && height <= 600) return 5;
  return 10;
};

const numTicksForWidth = (width: number) => {
  if (width <= 300) return 2;
  if (width > 300 && width <= 400) return 5;
  return 10;
};

export default function AxisExample({
  width,
  height,
  margin = { top: 0, right: 0, bottom: 0, left: 0 },
}: {
  width: number;
  height: number;
  margin?: { top: number; right: number; bottom: number; left: number };
}) {
  if (width < 10) return null;

  // bounds
  const xMax = width - margin.left - margin.right;
  const yMax = height - margin.top - margin.bottom;

  // scales
  const xScale = scaleTime<number>({
    range: [0, xMax],
    domain: extent(data, x) as [Date, Date],
  });
  const yScale = scaleLinear<number>({
    range: [yMax, 0],
    domain: [0, Math.max(...data.map(y))],
    nice: true,
  });

  return (
    <svg width={width} height={height}>
      <GradientOrangeRed id="axis_gradient" vertical={false} fromOpacity={0.8} toOpacity={0.3} />
      <GradientOrangeRed
        id="axis_grid_gradient"
        vertical={false}
        fromOpacity={0.1}
        toOpacity={1}
        gradientUnits="userSpaceOnUse" // need for gradients on straight lines
      />
      <rect x={0} y={0} width={width} height={height} fill={pinkLight} rx={14} />
      <Group top={margin.top} left={margin.left}>
        <Area<DateValue>
          data={data}
          x={d => xScale(x(d))}
          y0={yMax}
          y1={d => yScale(y(d))}
          strokeWidth={2}
          stroke="transparent"
          fill="url('#axis_gradient')"
          curve={curveBasis}
        />
        <LinePath<DateValue>
          data={data}
          x={d => xScale(x(d))}
          y={d => yScale(y(d))}
          stroke={"url('#axis_gradient')"}
          strokeWidth={2}
          curve={curveBasis}
        />
      </Group>
      <Grid<Date, number>
        top={margin.top}
        left={margin.left}
        xScale={xScale}
        yScale={yScale}
        stroke="url('#axis_grid_gradient')"
        width={xMax}
        height={yMax}
        numTicksRows={numTicksForHeight(height)}
        numTicksColumns={numTicksForWidth(width)}
      />
      <Group left={margin.left}>
        <AxisLeft<number>
          top={margin.top}
          left={0}
          scale={yScale}
          hideZero
          numTicks={numTicksForHeight(height)}
          label="Axis Left Label – Custom Position"
          labelProps={{
            fill: pinkDark,
            textAnchor: 'end',
            fontSize: 12,
            fontFamily: 'Arial',
            dx: 20,
            dy: 0,
            x: 0,
            y: 0,
          }}
          stroke={pinkDark}
          tickStroke={orange}
          tickLabelProps={() => ({
            fill: pinkDark,
            textAnchor: 'end',
            fontSize: 10,
            fontFamily: 'Arial',
            dx: '-0.25em',
            dy: '0.25em',
          })}
          tickComponent={({ formattedValue, ...tickProps }) => (
            <text {...tickProps}>{formattedValue}</text>
          )}
        />
        <AxisRight<number>
          top={margin.top}
          left={xMax}
          scale={yScale}
          hideZero
          numTicks={numTicksForHeight(height)}
          label="Axis Right Label"
          labelProps={{
            fill: pinkDark,
            textAnchor: 'middle',
            fontSize: 12,
            fontFamily: 'Arial',
          }}
          stroke={pinkDark}
          tickStroke={orange}
          tickLabelProps={() => ({
            fill: pinkDark,
            textAnchor: 'start',
            fontSize: 10,
            fontFamily: 'Arial',
            dx: '0.25em',
            dy: '0.25em',
          })}
        />
        <AxisBottom<Date>
          top={height - margin.bottom}
          left={0}
          scale={xScale}
          numTicks={numTicksForWidth(width)}
          label="Time"
        >
          {axis => {
            const tickLabelSize = 10;
            const tickRotate = 45;
            const tickColor = pinkDark;
            const axisCenter = (axis.axisToPoint.x - axis.axisFromPoint.x) / 2;
            return (
              <g className="my-custom-bottom-axis">
                <Line from={axis.axisFromPoint} to={axis.axisToPoint} stroke={tickColor} />
                {axis.ticks.map((tick, i) => {
                  const tickX = tick.to.x;
                  const tickY = tick.to.y + tickLabelSize + axis.tickLength;
                  return (
                    <Group key={`vx-tick-${tick.value}-${i}`} className="vx-axis-tick">
                      <Line from={tick.from} to={tick.to} stroke={orange} />
                      <text
                        transform={`translate(${tickX}, ${tickY}) rotate(${tickRotate})`}
                        fontSize={tickLabelSize}
                        textAnchor="middle"
                        fill={pinkDark}
                      >
                        {tick.formattedValue}
                      </text>
                    </Group>
                  );
                })}
                <text
                  textAnchor="start"
                  transform={`translate(${axisCenter}, 50)`}
                  fontSize="11"
                  fill={tickColor}
                >
                  {axis.label}
                </text>
              </g>
            );
          }}
        </AxisBottom>
      </Group>
    </svg>
  );
}
