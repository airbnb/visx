import React from 'react';
import Show from '../components/show';
import StackedAreas from '../components/tiles/stacked';

export default () => {
  return (
    <Show
      component={StackedAreas}
      title="Stacked Areas"
      margin={{
        top: 0,
        left: 0,
        right: 0,
        bottom: 10
      }}
    >
      {`import React from 'react';
import { AreaStack } from '@vx/shape';
import { GradientOrangeRed } from '@vx/gradient';
import { browserUsage } from '@vx/mock-data';
import { scaleTime, scaleLinear } from '@vx/scale';
import { timeParse } from 'd3-time-format';

const data = browserUsage;
const keys = Object.keys(data[0]).filter(k => k !== 'date');
const parseDate = timeParse('%Y %b %d');

const x = d => parseDate(d.date);
const y0 = d => d[0] / 100;
const y1 = d => d[1] / 100;

export default ({ width, height, margin }) => {
  // bounds
  const yMax = height - margin.top - margin.bottom;
  const xMax = width - margin.left - margin.right;

  // scales
  const xScale = scaleTime({
    range: [0, xMax],
    domain: [
      Math.min(...data.map(x)),
      Math.max(...data.map(x))
    ]
  });
  const yScale = scaleLinear({
    range: [yMax, 0]
  });

  return (
    <svg width={width} height={height}>
      <GradientOrangeRed id="OrangeRed" />
      <rect x={0} y={0} width={width} height={height} fill="#f38181" rx={14} />
      <AreaStack
        top={margin.top}
        left={margin.left}
        keys={keys}
        data={data}
        x={d => xScale(x(d.data))}
        y0={d => yScale(y0(d))}
        y1={d => yScale(y1(d))}
      >
        {area => {
          const { stacks, path } = area;
          return stacks.map(stack => {
            return (
              <path
                key={\`stack-\${stack.key}\`}
                d={path(stack)}
                stroke="transparent"
                fill="url(#OrangeRed)"
                onClick={event => alert(\`\${stack.key}\`)}
              />
            );
          });
        }}
      </AreaStack>
    </svg>
  );
};
`}
    </Show>
  );
};
