import React from 'react';
import { BarStackHorizontal } from '@vx/shape';
import { Group } from '@vx/group';
import { AxisBottom, AxisLeft } from '@vx/axis';
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
const y = d => d.date;

// scales
const xScale = scaleLinear({
  domain: [0, Math.max(...totals)],
  nice: true,
});
const yScale = scaleBand({
  domain: data.map(y),
  padding: 0.2,
});
const color = scaleOrdinal({
  domain: keys,
  range: [purple1, purple2, purple3],
});

let tooltipTimeout;

export default withTooltip(
  ({
    width,
    height,
    events = false,
    margin = {
      top: 40,
      left: 50,
      right: 40,
      bottom: 100,
    },
    tooltipOpen,
    tooltipLeft,
    tooltipTop,
    tooltipData,
    hideTooltip,
    showTooltip,
  }) => {
    if (width < 10) return null;

    // bounds
    const xMax = width - margin.left - margin.right;
    const yMax = height - margin.top - margin.bottom;

    xScale.rangeRound([0, xMax]);
    yScale.rangeRound([yMax, 0]);

    return (
      <div style={{ position: 'relative' }}>
        <svg width={width} height={height}>
          <rect width={width} height={height} fill={bg} rx={14} />
          <Group top={margin.top} left={margin.left}>
            <BarStackHorizontal
              data={data}
              keys={keys}
              height={yMax}
              y={y}
              xScale={xScale}
              yScale={yScale}
              color={color}
            >
              {barStacks => {
                return barStacks.map(barStack => {
                  return barStack.bars.map(bar => {
                    return (
                      <rect
                        key={`barstack-horizontal-${barStack.index}-${bar.index}`}
                        x={bar.x}
                        y={bar.y}
                        width={bar.width}
                        height={bar.height}
                        fill={bar.color}
                        onClick={() => {
                          if (!events) return;
                          alert(`clicked: ${JSON.stringify(bar)}`);
                        }}
                        onMouseLeave={() => {
                          tooltipTimeout = setTimeout(() => {
                            hideTooltip();
                          }, 300);
                        }}
                        onMouseMove={() => {
                          if (tooltipTimeout) clearTimeout(tooltipTimeout);
                          const top = bar.y + margin.top;
                          const left = bar.x + bar.width + margin.left;
                          showTooltip({
                            tooltipData: bar,
                            tooltipTop: top,
                            tooltipLeft: left,
                          });
                        }}
                      />
                    );
                  });
                });
              }}
            </BarStackHorizontal>
            <AxisLeft
              hideAxisLine
              hideTicks
              scale={yScale}
              tickFormat={formatDate}
              stroke={purple3}
              tickStroke={purple3}
              tickLabelProps={() => ({
                fill: purple3,
                fontSize: 11,
                textAnchor: 'end',
                dy: '0.33em',
              })}
            />
            <AxisBottom
              top={yMax}
              scale={xScale}
              stroke={purple3}
              tickStroke={purple3}
              tickLabelProps={() => ({
                fill: purple3,
                fontSize: 11,
                textAnchor: 'middle',
              })}
            />
          </Group>
        </svg>
        <div
          style={{
            position: 'absolute',
            top: margin.top / 2 - 10,
            width: '100%',
            display: 'flex',
            justifyContent: 'center',
            fontSize: '14px',
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
              color: 'white',
            }}
          >
            <div style={{ color: color(tooltipData.key) }}>
              <strong>{tooltipData.key}</strong>
            </div>
            <div>{tooltipData.bar.data[tooltipData.key]}℉</div>
            <div>
              <small>{formatDate(y(tooltipData.bar.data))}</small>
            </div>
          </Tooltip>
        )}
      </div>
    );
  },
);
