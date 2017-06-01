import React from 'react';
import Show from '../components/show';
import BarStack from '../components/tiles/barstack';

export default () => {
  return (
    <Show
      events
      margin={{top: 80}}
      component={BarStack}
      title="Bar Stack"
    >
{`import React from 'react';
import { BarStack } from '@vx/shape';
import { Group } from '@vx/group';
import { AxisBottom } from '@vx/axis';
import { cityTemperature } from '@vx/mock-data';
import { scaleBand, scaleLinear, scaleOrdinal } from '@vx/scale';
import { timeParse, timeFormat } from 'd3-time-format';
import { extent, max } from 'd3-array';

const data = cityTemperature.slice(0, 12);
const keys = Object.keys(data[0]).filter(d => d !== 'date');
const parseDate = timeParse("%Y%m%d");
const format = timeFormat("%b %d");
const formatDate = (date) => format(parseDate(date));

// accessors
const x = d => d.date;
const y = d => d.value;

const totals = data.reduce((ret, cur) => {
  const t = keys.reduce((dailyTotal, k) => {
    dailyTotal += +cur[k]
    return dailyTotal;
  }, 0)
  ret.push(t)
  return ret;
}, [])

export default ({
  width,
  height,
  margin = {
    top: 40
  }
}) => {
  if (width < 10) return null;

  // bounds
  const xMax = width;
  const yMax = height - margin.top - 100;

  // // scales
  const xScale = scaleBand({
    rangeRound: [0, xMax],
    domain: data.map(x),
    padding: 0.2,
    tickFormat: () => (val) => formatDate(val)
  });
  const yScale = scaleLinear({
    rangeRound: [yMax, 0],
    nice: true,
    domain: [0, max(totals)],
  });
  const zScale = scaleOrdinal({
    domain: keys,
    range: ['#6c5efb', '#c998ff', '#a44afe']
  })

  return (
    <svg width={width} height={height}>
      <rect
        x={0}
        y={0}
        width={width}
        height={height}
        fill='#eaedff'
        rx={14}
      />
      <BarStack
        top={margin.top}
        data={data}
        keys={keys}
        height={yMax}
        x={x}
        xScale={xScale}
        yScale={yScale}
        zScale={zScale}
        onClick={data => event => {
          alert(\`clicked: \${JSON.stringify(data)}\`)
        }}
      />
      <AxisBottom
        scale={xScale}
        top={yMax + margin.top}
        stroke='#a44afe'
        tickStroke='#a44afe'
        tickLabelComponent={(
          <text
            fill='#a44afe'
            fontSize={11}
            textAnchor="middle"
          />
        )}
      />
    </svg>
  );
}`}
    </Show>
  );
}
