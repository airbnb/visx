import React from 'react';
import Mock from '@vx/mock-data';
import { curveMonotoneX, curveBasis } from '@vx/curve';
import Scale from '@vx/scale';
import Shape from '@vx/shape';
import { Dot } from '@vx/glyph';
import Group from '@vx/group';
import { extent, max, min } from 'd3-array';

const data = Mock.genDateValue(15);

// accessors
const x = d => d.date;
const y = d => d.value;

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
  });

  return (
    <svg width={width} height={height}>
      <rect
        x={0}
        y={0}
        width={width}
        height={height}
        fill="#00f2ff"
        rx={14}
      />
      <Group top={margin.top}>
        <Shape.LinePath
          data={data}
          xScale={xScale}
          yScale={yScale}
          x={x}
          y={y}
          stroke={'rgba(126, 31, 220, 1.000)'}
          strokeWidth={2}
          strokeDasharray='2,2'
          curve={curveBasis}
        />
        <Shape.LinePath
          data={data}
          xScale={xScale}
          yScale={yScale}
          x={x}
          y={y}
          stroke={'rgba(126, 31, 220, 1.000)'}
          strokeWidth={3}
          curve={curveMonotoneX}
          glyph={(d,i) => {
            return (
              <g key={`line-point-${i}`}>
                <Dot
                  cx={xScale(x(d))}
                  cy={yScale(y(d))}
                  r={6}
                  fill='#fff'
                  stroke='rgba(0, 242, 255, 1.000)'
                  strokeWidth={10}
                />
                <Dot
                  cx={xScale(x(d))}
                  cy={yScale(y(d))}
                  r={6}
                  fill='rgba(0, 242, 255, 1.000)'
                  stroke={'rgba(126, 31, 220, 1.000)'}
                  strokeWidth={3}
                />
                <Dot
                  cx={xScale(x(d))}
                  cy={yScale(y(d))}
                  r={4}
                  fill='#ffffff'
                />
              </g>
            );
          }}
        />
      </Group>
    </svg>
  );
}
