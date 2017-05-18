import React from 'react';
import { AxisLeft, AxisBottom } from '@vx/axis';
import Scale from '@vx/scale';
import Group from '@vx/group';
import { genDateValue } from '@vx/mock-data';
import { Grid } from '@vx/grid';
import Shape from '@vx/shape';
import { curveBasis } from '@vx/curve';
import { OrangeRed } from '@vx/gradient';
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

export default ({
  width,
  height,
  margin,
}) => {
  // bounds
  const xMax = width - margin.left - margin.right;
  const yMax = height - margin.top - margin.bottom;

  // scales
  const xScale = Scale.scaleTime({
    range: [0, xMax],
    domain: extent(data, x),
  });
  const yScale = Scale.scaleLinear({
    range: [yMax, 0],
    domain: [0, max(data, y)],
    nice: true,
  });

  // scale tick formats
  const yFormat = yScale.tickFormat ? yScale.tickFormat() : identity;
  const xFormat = xScale.tickFormat ? xScale.tickFormat() : identity;

  return (
    <svg width={width} height={height}>
      <OrangeRed id="linear" />
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
        stroke='rgba(142, 32, 95, 0.9)'
        width={xMax}
        height={yMax}
        numTicksRows={numTicksForHeight(height)}
        numTicksColumns={numTicksForWidth(width)}
      />
      <Group top={margin.top} left={margin.left}>
        <Shape.AreaClosed
          data={data}
          xScale={xScale}
          yScale={yScale}
          x={x}
          y={y}
          strokeWidth={2}
          stroke={'transparent'}
          fill={'url(#linear)'}
          fillOpacity='0.9'
          curve={curveBasis}
        />
        <Shape.LinePath
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
        label={'value'}
        stroke={'#1b1a1e'}
        tickTextFill={'#8e205f'}
      />
      <AxisBottom
        top={height - margin.bottom}
        left={margin.left}
        scale={xScale}
        numTicks={numTicksForWidth(width)}
        label={'time'}
        stroke={'#1b1a1e'}
        tickStroke={'#1b1a1e'}
        tickTextFill={'#8e205f'}
      />
    </svg>
  );
}
