import React from 'react';
import Show from '../components/show';
import BarStack from '../components/tiles/barstack';

export default () => {
  return (
    <Show events margin={{ top: 80 }} component={BarStack} title="Bar Stack">
      {`import React from 'react';
import { BarStack } from '@vx/shape';
import { Group } from '@vx/group';
import { Grid } from '@vx/grid';
import { AxisBottom } from '@vx/axis';
import { cityTemperature } from '@vx/mock-data';
import { scaleBand, scaleLinear, scaleOrdinal } from '@vx/scale';
import { timeParse, timeFormat } from 'd3-time-format';
import { withTooltip, Tooltip } from '@vx/tooltip';
import { LegendOrdinal } from '@vx/legend';

const purple1 = '#6c5efb';
const purple2 = '#c998ff';
const purple3 = '#a44afe';
const bg = '#eaedff';

const data = cityTemperature.slice(0, 12);
const keys = Object.keys(data[0]).filter(d => d !== 'date');

const totals = data.reduce((ret, cur) => {
  const t = keys.reduce((dailyTotal, k) => {
    dailyTotal += +cur[k];
    return dailyTotal;
  }, 0);
  ret.push(t);
  return ret;
}, []);

const parseDate = timeParse('%Y%m%d');
const format = timeFormat('%b %d');
const formatDate = date => format(parseDate(date));

// accessors
const x = d => d.date;

// scales
const xScale = scaleBand({
  domain: data.map(x),
  padding: 0.2
});
const yScale = scaleLinear({
  domain: [0, Math.max(...totals)],
  nice: true
});
const color = scaleOrdinal({
  domain: keys,
  range: [purple1, purple2, purple3]
});

let tooltipTimeout;

export default withTooltip(
  ({
    width,
    height,
    margin = {
      top: 40
    },
    tooltipOpen,
    tooltipLeft,
    tooltipTop,
    tooltipData,
    hideTooltip,
    showTooltip
  }) => {
    // bounds
    const xMax = width;
    const yMax = height - margin.top - 100;

    xScale.rangeRound([0, xMax]);
    yScale.range([yMax, 0]);

    return (
      <div style={{ position: 'relative' }}>
        <svg width={width} height={height}>
          <rect x={0} y={0} width={width} height={height} fill={bg} rx={14} />
          <Grid
            top={margin.top}
            left={margin.left}
            xScale={xScale}
            yScale={yScale}
            width={xMax}
            height={yMax}
            stroke={'black'}
            strokeOpacity={0.1}
            xOffset={xScale.bandwidth() / 2}
          />
          <Group top={margin.top}>
            <BarStack data={data} keys={keys} x={x} xScale={xScale} yScale={yScale} color={color}>
              {barStacks => {
                return barStacks.map(barStack => {
                  return barStack.bars.map(bar => {
                    return (
                      <rect
                        key={\`bar-stack-\${barStack.index}-\${bar.index}\`}
                        x={bar.x}
                        y={bar.y}
                        height={bar.height}
                        width={bar.width}
                        fill={bar.color}
                        onClick={event => {
                          alert(\`clicked: \${JSON.stringify(bar)}\`);
                        }}
                        onMouseLeave={event => {
                          tooltipTimeout = setTimeout(() => {
                            hideTooltip();
                          }, 300);
                        }}
                        onMouseMove={event => {
                          if (tooltipTimeout) clearTimeout(tooltipTimeout);
                          const top = event.clientY - margin.top - bar.height;
                          const offset = xScale.paddingInner() * xScale.step() / 2;
                          const left = bar.x + bar.width + offset;
                          showTooltip({
                            tooltipData: bar,
                            tooltipTop: top,
                            tooltipLeft: left
                          });
                        }}
                      />
                    );
                  });
                });
              }}
            </BarStack>
          </Group>
          <AxisBottom
            top={yMax + margin.top}
            scale={xScale}
            tickFormat={formatDate}
            stroke={purple3}
            tickStroke={purple3}
            tickLabelProps={(value, index) => ({
              fill: purple3,
              fontSize: 11,
              textAnchor: 'middle'
            })}
          />
        </svg>
        <div
          style={{
            position: 'absolute',
            top: margin.top / 2 - 10,
            width: '100%',
            display: 'flex',
            justifyContent: 'center',
            fontSize: '14px'
          }}
        >
          <LegendOrdinal scale={color} direction="row" labelMargin="0 15px 0 0" />
        </div>
        {tooltipOpen && (
          <Tooltip
            top={tooltipTop}
            left={tooltipLeft}
            style={{
              minWidth: 60,
              backgroundColor: 'rgba(0,0,0,0.9)',
              color: 'white'
            }}
          >
            <div style={{ color: color(tooltipData.key) }}>
              <strong>{tooltipData.key}</strong>
            </div>
            <div>{tooltipData.bar.data[tooltipData.key]}℉</div>
            <div>
              <small>{formatDate(x(tooltipData.bar.data))}</small>
            </div>
          </Tooltip>
        )}
      </div>
    );
  }
);
`}
    </Show>
  );
};
