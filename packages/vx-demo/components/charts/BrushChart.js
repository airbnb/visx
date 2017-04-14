import React from 'react';
import Mock from '@vx/mock-data';
import Scale from '@vx/scale';
import Group from '@vx/group';
import Axis from '@vx/axis';
import colors from '../util/sillyColorScale';

const points = Mock.genRandomNormalPoints();

export default ({
  width,
  height,
  margin,
}) => {

  const xMax = width - margin.left - margin.right;
  const yMax = height - margin.top - margin.bottom;
  const k = height / width;
  const x0 = [-4.5, 4.5];
  const y0 = x0.map(x => x * k);

  const x = d => d[0];
  const y = d => d[1];
  const z = d => d[2];

  const xScale = Scale.scaleLinear({
    domain: x0,
    range: [0, xMax],
  });
  const yScale = Scale.scaleLinear({
    domain: y0,
    range: [yMax, 0],
  });

  return (
    <svg width={width} height={height}>
      <Axis.AxisBottom
        scale={xScale}
        top={yMax + margin.top}
        left={margin.left}
        label={''}
        stroke={'#1b1a1e'}
        tickTextFill={'#1b1a1e'}
      />
      <Axis.AxisLeft
        scale={yScale}
        top={margin.top}
        left={margin.left}
        label={''}
        stroke={'#1b1a1e'}
        tickTextFill={'#1b1a1e'}
      />
      <Group top={margin.top} left={margin.left}>
        {points.map((point) => {
          return (
            <circle
              key={`${x(point)}-${y(point)}-${z(point)}`}
              fill={colors(z(point))}
              cx={xScale(x(point))}
              cy={yScale(y(point))}
              r={3}
            />
          );
        })}
      </Group>
    </svg>
  );
}
