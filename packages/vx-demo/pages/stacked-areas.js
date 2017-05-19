import React from 'react';
import Show from '../components/show';
import StackedAreas from '../components/tiles/stacked';

export default () => {
  return (
    <Show component={StackedAreas} title="Stacked Areas" margin={{
      top: 0,
      left: 0,
      right: 0,
      bottom: 10,
    }}>
{`import React from 'react';
import { AreaStack } from '@vx/shape';
import { GradientOrangeRed } from '@vx/gradient';
import { browserUsage } from '@vx/mock-data';
import { scaleTime, scaleLinear } from '@vx/scale';
import { extent, max } from 'd3-array';
import { timeParse } from 'd3-time-format';
import { stack as d3stack } from 'd3-shape';

const data = browserUsage;
const keys = Object.keys(data[0])
  .filter(k => k !== 'date');
const browserNames = [...keys].reverse();
const parseDate = timeParse("%Y %b %d");
const x = d => parseDate(d.date);
const stack = d3stack().keys(keys);

export default ({
  width,
  height,
  margin,
}) => {
  const yMax = height - margin.top - margin.bottom;
  const xMax = width - margin.left - margin.right;

  const xScale = scaleTime({
    range: [0, xMax],
    domain: extent(data, x),
  });
  const yScale = scaleLinear({
    range: [yMax, 0],
  });

  return (
    <svg width={width} height={height}>
      <GradientOrangeRed id="OrangeRed" />
      <rect
        x={0}
        y={0}
        width={width}
        height={height}
        fill="#f38181"
        rx={14}
      />
      <AreaStack
        reverse
        top={margin.top}
        left={margin.left}
        keys={keys}
        data={data}
        x={(d) => xScale(x(d.data))}
        y0={(d) => yScale(d[0] / 100)}
        y1={(d) => yScale(d[1] / 100)}
        strokeWidth={0}
        fill='url(#OrangeRed)'
        fillOpacity='1'
      />
    </svg>
  );
}`}
    </Show>
  );
}
