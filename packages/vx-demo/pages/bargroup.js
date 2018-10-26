import React from 'react';
import Show from '../components/show';
import BarGroup from '../components/tiles/bargroup';

export default () => {
  return (
    <Show events={true} margin={{ top: 80 }} component={BarGroup} title="Bar Group">
      {`import React from 'react';
import { Group } from '@vx/group';
import { BarGroup } from '@vx/shape';
import { AxisBottom } from '@vx/axis';
import { cityTemperature } from '@vx/mock-data';
import { scaleBand, scaleLinear, scaleOrdinal } from '@vx/scale';
import { timeParse, timeFormat } from 'd3-time-format';

const blue = '#aeeef8';
const green = '#e5fd3d';
const purple = '#9caff6';
const bg = '#612efb';

const data = cityTemperature.slice(0, 8);
const keys = Object.keys(data[0]).filter(d => d !== 'date');

const parseDate = timeParse('%Y%m%d');
const format = timeFormat('%b %d');
const formatDate = date => format(parseDate(date));

// accessors
const x0 = d => d.date;

// scales
const x0Scale = scaleBand({
  domain: data.map(x0),
  padding: 0.2
});
const x1Scale = scaleBand({
  domain: keys,
  padding: 0.1
});
const yScale = scaleLinear({
  domain: [0, Math.max(...data.map(d => Math.max(...keys.map(key => d[key]))))]
});
const color = scaleOrdinal({
  domain: keys,
  range: [blue, green, purple]
});

export default ({
  width,
  height,
  margin = {
    top: 40
  }
}) => {
  // bounds
  const xMax = width;
  const yMax = height - margin.top - 100;

  x0Scale.rangeRound([0, xMax]);
  x1Scale.rangeRound([0, x0Scale.bandwidth()]);
  yScale.range([yMax, 0]);

  return (
    <svg width={width} height={height}>
      <rect x={0} y={0} width={width} height={height} fill={bg} rx={14} />
      <Group top={margin.top}>
        <BarGroup
          data={data}
          keys={keys}
          height={yMax}
          x0={x0}
          x0Scale={x0Scale}
          x1Scale={x1Scale}
          yScale={yScale}
          color={color}
        >
          {({ barGroups }) => {
            return barGroups.map(barGroup => {
              return (
                <Group key={\`bar-group-\${barGroup.index}-\${barGroup.x0}\`} left={barGroup.x0}>
                  {barGroup.bars.map(bar => {
                    return (
                      <rect
                        key={\`bar-group-bar-\${barGroup.index}-\${bar.index}-\${bar.value}-\${bar.key}\`}
                        x={bar.x}
                        y={bar.y}
                        width={bar.width}
                        height={bar.height}
                        fill={bar.color}
                        rx={4}
                        onClick={event => {
                          const { key, value } = bar;
                          alert(JSON.stringify({ key, value }));
                        }}
                      />
                    );
                  })}
                </Group>
              );
            });
          }}
        </BarGroup>
      </Group>
      <AxisBottom
        top={yMax + margin.top}
        tickFormat={formatDate}
        scale={x0Scale}
        stroke={green}
        tickStroke={green}
        hideAxisLine={true}
        tickLabelProps={(value, index) => ({
          fill: green,
          fontSize: 11,
          textAnchor: 'middle'
        })}
      />
    </svg>
  );
};
`}
    </Show>
  );
};
