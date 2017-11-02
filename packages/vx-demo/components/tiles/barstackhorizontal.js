import React from 'react';
import { BarStackHorizontal } from '@vx/shape';
import { Group } from '@vx/group';
import { AxisBottom, AxisLeft } from '@vx/axis';
import { cityTemperature } from '@vx/mock-data';
import { scaleBand, scaleLinear, scaleOrdinal } from '@vx/scale';
import { timeParse, timeFormat } from 'd3-time-format';
import { withTooltip, Tooltip } from '@vx/tooltip';
import { LegendOrdinal } from '@vx/legend';
import { extent, max } from 'd3-array';

const data = cityTemperature.slice(0, 12);
const keys = Object.keys(data[0]).filter(d => d !== 'date');
const parseDate = timeParse('%Y%m%d');
const format = timeFormat('%b %d');
const formatDate = date => format(parseDate(date));

const totals = data.reduce((ret, cur) => {
  const t = keys.reduce((dailyTotal, k) => {
    dailyTotal += +cur[k];
    return dailyTotal;
  }, 0);
  ret.push(t);
  return ret;
}, []);

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

    // accessors
    const y = d => d.date;
    const x = d => d.value;

    // bounds
    const xMax = width - margin.left - margin.right;
    const yMax = height - margin.top - margin.bottom;

    // // scales
    const xScale = scaleLinear({
      rangeRound: [0, xMax],
      domain: [0, max(totals)],
      nice: true,
    });
    const yScale = scaleBand({
      rangeRound: [yMax, 0],
      domain: data.map(y),
      padding: 0.2,
      tickFormat: () => val => formatDate(val),
    });
    const zScale = scaleOrdinal({
      domain: keys,
      range: ['#6c5efb', '#c998ff', '#a44afe'],
    });

    let tooltipTimeout;

    return (
      <div style={{ position: 'relative' }}>
        <svg width={width} height={height}>
          <rect
            x={0}
            y={0}
            width={width}
            height={height}
            fill="#eaedff"
            rx={14}
          />
          <Group top={margin.top} left={margin.left}>
            <BarStackHorizontal
              data={data}
              keys={keys}
              height={yMax}
              y={y}
              xScale={xScale}
              yScale={yScale}
              zScale={zScale}
              onClick={data => event => {
                if (!events) return;
                alert(`clicked: ${JSON.stringify(data)}`);
              }}
              onMouseLeave={data => event => {
                tooltipTimeout = setTimeout(() => {
                  hideTooltip();
                }, 300);
              }}
              onMouseMove={data => event => {
                if (tooltipTimeout) clearTimeout(tooltipTimeout);
                showTooltip({
                  tooltipData: data,
                  tooltipTop: margin.top + yScale(y(data.data)),
                  tooltipLeft: margin.left + data.width + 75,
                });
              }}
            />
            <AxisLeft
              hideAxisLine={true}
              hideTicks={true}
              scale={yScale}
              stroke="#a44afe"
              tickStroke="#a44afe"
              tickLabelProps={(value, index) => ({
                fill: '#a44afe',
                fontSize: 11,
                textAnchor: 'end',
                dy: '0.33em',
              })}
            />
            <AxisBottom
              scale={xScale}
              top={yMax}
              stroke="#a44afe"
              tickStroke="#a44afe"
              tickLabelProps={(value, index) => ({
                fill: '#a44afe',
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
          <LegendOrdinal
            scale={zScale}
            direction="row"
            labelMargin="0 15px 0 0"
          />
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
            <div style={{ color: zScale(tooltipData.key) }}>
              <strong>{tooltipData.key}</strong>
            </div>
            <div>{tooltipData.data[tooltipData.key]}℉</div>
            <div>
              <small>{tooltipData.xFormatted}</small>
            </div>
          </Tooltip>
        )}
      </div>
    );
  },
);
