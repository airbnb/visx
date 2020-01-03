import React from 'react';
import Show from '../components/show';
import BarGroupHorizontal from '../components/tiles/bargrouphorizontal';

export default () => {
  return (
    <Show
      events
      margin={{ top: 45, left: 60, right: 20, bottom: 0 }}
      component={BarGroupHorizontal}
      title="Bar Group Horizontal"
    >
      {`import React from 'react';
import { BarGroupHorizontal, Bar } from '@vx/shape';
import { Group } from '@vx/group';
import { AxisLeft } from '@vx/axis';
import { cityTemperature } from '@vx/mock-data';
import { scaleBand, scaleLinear, scaleOrdinal } from '@vx/scale';
import { timeParse, timeFormat } from 'd3-time-format';

const parseDate = timeParse('%Y%m%d');
const format = timeFormat('%b %d');
const formatDate = date => format(parseDate(date));
const max = (arr, fn) => Math.max(...arr.map(fn));

const data = cityTemperature.slice(0, 4);
const keys = Object.keys(data[0]).filter(d => d !== 'date');

// accessors
const y0 = d => d.date;
const x = d => d.value;

// scales
const y0Scale = scaleBand({
  domain: data.map(y0),
  padding: 0.2
});
const y1Scale = scaleBand({
  domain: keys,
  padding: 0.1
});
const xScale = scaleLinear({
  domain: [0, max(data, d => max(keys, key => d[key]))]
});
const color = scaleOrdinal({
  domain: keys,
  range: ['#aeeef8', '#e5fd3d', '#9caff6']
});

export default ({
  width,
  height,
  margin = {
    top: 20,
    left: 50,
    right: 10,
    bottom: 0
  }
}) => {
  // bounds
  const xMax = width - margin.left - margin.right;
  const yMax = height - 100;

  // scales
  y0Scale.rangeRound([0, yMax]);
  y1Scale.rangeRound([0, y0Scale.bandwidth()]);
  xScale.rangeRound([0, xMax]);

  return (
    <svg width={width} height={height}>
      <rect x={0} y={0} width={width} height={height} fill="#612efb" rx={14} />
      <Group top={margin.top} left={margin.left}>
        <BarGroupHorizontal
          data={data}
          keys={keys}
          width={xMax}
          y0={y0}
          y0Scale={y0Scale}
          y1Scale={y1Scale}
          xScale={xScale}
          color={color}
        >
          {barGroups => {
            return barGroups.map(barGroup => {
              return (
                <Group
                  key={\`bar-group-horizontal-\${barGroup.index}-\${barGroup.y0}\`}
                  top={barGroup.y0}
                >
                  {barGroup.bars.map(bar => {
                    return (
                      <Bar
                        key={\`\${barGroup.index}-\${bar.index}-\${bar.key}\`}
                        x={bar.x}
                        y={bar.y}
                        width={bar.width}
                        height={bar.height}
                        fill={bar.color}
                        rx={4}
                        onClick={event => {
                          alert(\`\${bar.key} (\${bar.value}) - \${JSON.stringify(bar)}\`);
                        }}
                      />
                    );
                  })}
                </Group>
              );
            });
          }}
        </BarGroupHorizontal>
        <AxisLeft
          scale={y0Scale}
          stroke="#e5fd3d"
          tickStroke="#e5fd3d"
          tickFormat={formatDate}
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
