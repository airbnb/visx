import React from 'react';
import Show from '../components/Show';
import Lines from '../components/tiles/Lines';

export default () => {
  return (
    <Show component={Lines} title="Lines">
      {`import React from 'react';
import { Group } from '@vx/group';
import { LinePath } from '@vx/shape';
import { curveMonotoneX } from '@vx/curve';
import generateDateValue, { DateValue } from '@vx/mock-data/lib/generators/genDateValue';
import { scaleTime, scaleLinear } from '@vx/scale';
import { extent, max } from 'd3-array';
import { ShowProvidedProps } from '../../types';

const series = new Array(12).fill(null).map(_ => generateDateValue(25));
const allData = series.reduce((rec, d) => rec.concat(d), []);

// accessors
const getX = (d: DateValue) => d.date;
const getY = (d: DateValue) => d.value;

export default ({ width, height }: ShowProvidedProps) => {
  // bounds
  const xMax = width;
  const yMax = height / 8;

  // scales
  const xScale = scaleTime({
    range: [0, xMax],
    domain: extent(allData, getX),
  });
  const yScale = scaleLinear({
    range: [yMax, 0],
    domain: [0, max(allData, getY)],
  });

  return (
    <svg width={width} height={height}>
      <rect x={0} y={0} width={width} height={height} fill="#242424" rx={14} />
      {xMax > 8 &&
        series.map((lineData, i) => (
          <Group key={\`lines-\${i}\`} top={(i * yMax) / 2}>
            <LinePath<DateValue>
              data={lineData}
              x={d => xScale(getX(d))}
              y={d => yScale(getY(d))}
              stroke="#ffffff"
              strokeWidth={1}
              curve={i % 2 === 0 ? curveMonotoneX : undefined}
            />
          </Group>
        ))}
    </svg>
  );
};`}
    </Show>
  );
};
