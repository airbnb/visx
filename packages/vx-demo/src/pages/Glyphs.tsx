import React from 'react';
import Show from '../components/Show';
import Glyphs from '../components/tiles/Glyphs';

export default () => {
  return (
    <Show
      component={Glyphs}
      title="Glyphs"
      margin={{
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
      }}
    >
      {`import React from 'react';
import { Group } from '@vx/group';
import { GlyphDot } from '@vx/glyph';
import { LinePath } from '@vx/shape';
import genDateValue, { DateValue } from '@vx/mock-data/lib/generators/genDateValue';
import { scaleTime, scaleLinear } from '@vx/scale';
import { curveMonotoneX, curveBasis } from '@vx/curve';
import { ShowProvidedProps } from '../../types';

const data: DateValue[] = genDateValue(15);

// accessors
const date = (d: DateValue) => d.date.valueOf();
const value = (d: DateValue) => d.value;

// scales
const xScale = scaleTime<number>({
  domain: [Math.min(...data.map(date)), Math.max(...data.map(date))],
});
const yScale = scaleLinear<number>({
  domain: [0, Math.max(...data.map(value))],
});

// positions
const x = (d: DateValue) => xScale(date(d));
const y = (d: DateValue) => yScale(value(d));

// colors
const primary = '#8921e0';
const secondary = '#00f2ff';
const contrast = '#ffffff';

export default ({ width, height, margin }: ShowProvidedProps) => {
  if (width < 10) return null;

  // bounds
  const xMax = width - margin.left - margin.right;
  const yMax = height - margin.top - margin.bottom;

  // update scale range to match bounds
  xScale.range([0, xMax]);
  yScale.range([yMax, 0]);

  return (
    <svg width={width} height={height}>
      <rect x={0} y={0} width={width} height={height} fill={secondary} rx={14} />
      <Group top={margin.top}>
        <LinePath
          data={data}
          x={x}
          y={y}
          stroke={primary}
          strokeWidth={2}
          strokeDasharray="2,2"
          curve={curveBasis}
        />
        <LinePath data={data} x={x} y={y} stroke={primary} strokeWidth={3} curve={curveMonotoneX} />
        {data.map((d, i) => {
          const cx = x(d);
          const cy = y(d);
          return (
            <g key={\`line-point-\${i}\`}>
              <GlyphDot cx={cx} cy={cy} r={6} fill={contrast} stroke={secondary} strokeWidth={10} />
              <GlyphDot cx={cx} cy={cy} r={6} fill={secondary} stroke={primary} strokeWidth={3} />
              <GlyphDot cx={cx} cy={cy} r={4} fill={contrast} />
            </g>
          );
        })}
      </Group>
    </svg>
  );
};

`}
    </Show>
  );
};
