import React from 'react';
import Show from '../components/show';
import Axis from '../components/tiles/axis';

export default () => {
  return (
    <Show component={Axis} title="Axis" margin={{
      top: 20,
      left: 60,
      right: 40,
      bottom: 60,
    }}>
{`import React from 'react';
import Axis from '@vx/axis';
import Scale from '@vx/scale';
import Group from '@vx/group';
import Mock from '@vx/mock-data';
import Grid from '@vx/grid';
import Shape from '@vx/shape';
import Curve from '@vx/curve';
import Gradient from '@vx/gradient';
import { extent, max } from 'd3-array';

const data = Mock.genDateValue(20);

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
      <Gradient.OrangeRed
        id="linear"
      />
      <Grid.Grid
        top={margin.top}
        left={margin.left}
        xScale={xScale}
        yScale={yScale}
        stroke='#8a265f'
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
          stroke='transparent'
          fill="url('#linear')"
          fillOpacity='0.9'
          curve={Curve.basis}
        />
        <Shape.LinePath
          data={data}
          xScale={xScale}
          yScale={yScale}
          x={x}
          y={y}
          stroke="url('#linear')"
          strokeWidth={2}
          curve={Curve.basis}
        />
      </Group>
      <Axis.AxisLeft
        top={margin.top}
        left={margin.left}
        scale={yScale}
        hideZero
        numTicks={numTicksForHeight(height)}
        label='value'
        stroke='#1b1a1e'
        tickTextFill='#8e205f'
      />
      <Axis.AxisBottom
        top={height - margin.bottom}
        left={margin.left}
        scale={xScale}
        numTicks={numTicksForWidth(width)}
        label={'time'}
        stroke='#1b1a1e'
        tickStroke='#1b1a1e'
        tickTextFill='#8e205f'
      />
    </svg>
  );
}`}
    </Show>
  );
}
