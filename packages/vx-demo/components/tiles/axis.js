import React from 'react';
import { Grid } from '@vx/grid';
import { Group } from '@vx/group';
import { curveBasis } from '@vx/curve';
import { GradientOrangeRed } from '@vx/gradient';
import { genDateValue } from '@vx/mock-data';
import { AxisLeft, AxisBottom } from '@vx/axis';
import { AreaClosed, LinePath, Line } from '@vx/shape';
import { scaleTime, scaleLinear } from '@vx/scale';
import { extent, max } from 'd3-array';

const data = genDateValue(20);

// accessors
const x = d => d.date;
const y = d => d.value;

// responsive utils for axis ticks
function numTicksForHeight(height) {
  if (height <= 300) return 3;
  if (300 < height && height <= 600) return 5;
  return 10;
}

function numTicksForWidth(width) {
  if (width <= 300) return 2;
  if (300 < width && width <= 400) return 5;
  return 10;
}

export default ({ width, height, margin }) => {
  if (width < 10) return null;

  // bounds
  const xMax = width - margin.left - margin.right;
  const yMax = height - margin.top - margin.bottom;

  // scales
  const xScale = scaleTime({
    range: [0, xMax],
    domain: extent(data, x),
  });
  const yScale = scaleLinear({
    range: [yMax, 0],
    domain: [0, max(data, y)],
    nice: true,
  });

  // scale tick formats
  const yFormat = yScale.tickFormat ? yScale.tickFormat() : identity;
  const xFormat = xScale.tickFormat ? xScale.tickFormat() : identity;

  return (
    <svg width={width} height={height}>
      <GradientOrangeRed
        id="linear"
        vertical={false}
        fromOpacity={0.8}
        toOpacity={0.3}
      />
      <rect
        x={0}
        y={0}
        width={width}
        height={height}
        fill="#f4419f"
        rx={14}
      />
      <Grid
        top={margin.top}
        left={margin.left}
        xScale={xScale}
        yScale={yScale}
        stroke="rgba(142, 32, 95, 0.9)"
        width={xMax}
        height={yMax}
        numTicksRows={numTicksForHeight(height)}
        numTicksColumns={numTicksForWidth(width)}
      />
      <Group top={margin.top} left={margin.left}>
        <AreaClosed
          data={data}
          xScale={xScale}
          yScale={yScale}
          x={x}
          y={y}
          strokeWidth={2}
          stroke={'transparent'}
          fill={'url(#linear)'}
          curve={curveBasis}
        />
        <LinePath
          data={data}
          xScale={xScale}
          yScale={yScale}
          x={x}
          y={y}
          stroke={"url('#linear')"}
          strokeWidth={2}
          curve={curveBasis}
        />
      </Group>
      <AxisLeft
        top={margin.top}
        left={margin.left}
        scale={yScale}
        hideZero
        numTicks={numTicksForHeight(height)}
        label="value"
        labelProps={{
          fill: '#8e205f',
          textAnchor: 'middle',
          fontSize: 12,
          fontFamily: 'Arial',
        }}
        stroke="#1b1a1e"
        tickStroke="#8e205f"
        tickLabelProps={(value, index) => ({
          fill: '#8e205f',
          textAnchor: 'end',
          fontSize: 10,
          fontFamily: 'Arial',
          dx: '-0.25em',
          dy: '0.25em',
        })}
      />
      <AxisBottom
        top={height - margin.bottom}
        left={margin.left}
        scale={xScale}
        numTicks={numTicksForWidth(width)}
        label="time"
      >
        {props => {
          const tickLabelSize = 10;
          const tickRotate = 45;
          const tickColor = '#8e205f';
          const axisCenter =
            (props.axisToPoint.x - props.axisFromPoint.x) / 2;
          return (
            <g className="my-custom-bottom-axis">
              {props.ticks.map((tick, i) => {
                const tickX = tick.to.x;
                const tickY =
                  tick.to.y + tickLabelSize + props.tickLength;
                return (
                  <Group
                    key={`vx-tick-${tick.value}-${i}`}
                    className={'vx-axis-tick'}
                  >
                    <Line
                      from={tick.from}
                      to={tick.to}
                      stroke={tickColor}
                    />
                    <text
                      transform={`translate(${tickX}, ${tickY}) rotate(${tickRotate})`}
                      fontSize={tickLabelSize}
                      textAnchor="middle"
                      fill={tickColor}
                    >
                      {tick.formattedValue}
                    </text>
                  </Group>
                );
              })}
              <text
                textAnchor="middle"
                transform={`translate(${axisCenter}, 50)`}
                fontSize="8"
              >
                {props.label}
              </text>
            </g>
          );
        }}
      </AxisBottom>
    </svg>
  );
};
