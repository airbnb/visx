import React from 'react';
import Show from '../components/show';
import Glyphs from '../components/tiles/multiline';

export default () => {
  return (
    <Show component={Glyphs} title="Glyphs" margin={{
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
    }}>
{`import React from 'react';
import { Group } from '@vx/group';
import { GlyphDot } from '@vx/glyph';
import { LinePath } from '@vx/shape';
import { genDateValue } from '@vx/mock-data';
import { scaleTime, scaleLinear } from '@vx/scale';
import { curveBasis, curveMonotoneX } from '@vx/curve';
import { extent, max, min } from 'd3-array';

const data = genDateValue(15);

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
  const xScale = scaleTime({
    range: [0, xMax],
    domain: extent(data, x),
  });
  const yScale = scaleLinear({
    range: [yMax, 0],
    domain: [0, max(data, y)],
    nice: true,
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
        <LinePath
          data={data}
          xScale={xScale}
          yScale={yScale}
          x={x}
          y={y}
          stroke='#7e20dc'
          strokeWidth={2}
          strokeDasharray='2,2'
          curve={curveBasis}
        />
        <LinePath
          data={data}
          xScale={xScale}
          yScale={yScale}
          x={x}
          y={y}
          stroke='#7e20dc'
          strokeWidth={3}
          curve={curveMonotoneX}
          glyph={(d,i) => {
            return (
              <g key={\`line-point-\${i}\`}>
                <GlyphDot
                  cx={xScale(x(d))}
                  cy={yScale(y(d))}
                  r={6}
                  fill='#fff'
                  stroke='#01f2ff'
                  strokeWidth={10}
                />
                <GlyphDot
                  cx={xScale(x(d))}
                  cy={yScale(y(d))}
                  r={6}
                  fill='#01f2ff'
                  stroke='#7e20dc'
                  strokeWidth={3}
                />
                <GlyphDot
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
`}
    </Show>
  );
}
