import React from 'react';
import Show from '../components/show';
import BarGroupHorizontal from '../components/tiles/bargrouphorizontal';

export default () => {
  return (
    <Show
      events={true}
      margin={{ top: 45, left: 60, right: 20, bottom: 0 }}
      component={BarGroupHorizontal}
      title="Bar Group Horizontal"
    >
      {`import React from 'react';
import { BarGroupHorizontal } from '@vx/shape';
import { Group } from '@vx/group';
import { AxisLeft } from '@vx/axis';
import { cityTemperature } from '@vx/mock-data';
import { scaleBand, scaleLinear, scaleOrdinal } from '@vx/scale';
import { timeParse, timeFormat } from 'd3-time-format';
import { extent, max } from 'd3-array';

const data = cityTemperature.slice(0, 4);
const keys = Object.keys(data[0]).filter(d => d !== 'date');
const parseDate = timeParse('%Y%m%d');
const format = timeFormat('%b %d');
const formatDate = date => format(parseDate(date));

// accessors
const y0 = d => d.date;
const x = d => d.value;

export default ({
  width,
  height,
  events = false,
  margin = {
    top: 20,
    left: 50,
    right: 10,
    bottom: 0
  },
}) => {
  if (width < 10) return null;

  // bounds
  const xMax = width - margin.left - margin.right;
  const yMax = height - 100

  // // scales
  const y0Scale = scaleBand({
    rangeRound: [0, yMax],
    domain: data.map(y0),
    padding: 0.2,
    tickFormat: () => val => formatDate(val)
  });

  const y1Scale = scaleBand({
    rangeRound: [0, y0Scale.bandwidth()],
    domain: keys,
    padding: 0.1
  });

  const xScale = scaleLinear({
    rangeRound: [xMax, 0],
    domain: [
      0,
      max(data, d => {
        return max(keys, key => d[key]);
      })
    ]
  });

  const zScale = scaleOrdinal({
    domain: keys,
    range: ['#aeeef8', '#e5fd3d', '#9caff6']
  });

  return (
    <svg width={width} height={height}>
      <rect x={0} y={0} width={width} height={height} fill='#612efb' rx={14} />
      <Group top={margin.top} left={margin.left}>
        <BarGroupHorizontal
          data={data}
          keys={keys}
          width={xMax}
          y0={y0}
          y0Scale={y0Scale}
          y1Scale={y1Scale}
          xScale={xScale}
          zScale={zScale}
          rx={4}
          onClick={data => event => {
            if (!events) return;
            alert(\`clicked: \${JSON.stringify(data)}\`);
          }}
        />
        <AxisLeft
          scale={y0Scale}
          stroke="#e5fd3d"
          tickStroke="#e5fd3d"
          hideAxisLine
          tickLabelProps={(value, index) => ({
            fill: '#e5fd3d',
            fontSize: 11,
            textAnchor: 'end',
            dy: '0.33em'
          })}
        />
      </Group>
    </svg>
  );
};
`}
    </Show>
  );
};
