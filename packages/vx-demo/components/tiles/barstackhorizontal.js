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

export default withTooltip(
  ({
    width,
    height,
    events = false,
    margin = {
      top: 40,
      left: 0,
    },
    tooltipOpen,
    tooltipLeft,
    tooltipTop,
    tooltipData,
    hideTooltip,
    showTooltip
  }) => {
    if (width < 10) return null;

    const data = cityTemperature.slice(0, 12);
    const keys = Object.keys(data[0]).filter(d => d !== 'date');
    const parseDate = timeParse('%Y%m%d');
    const format = timeFormat('%b %d');
    const formatDate = date => format(parseDate(date));
    
    // accessors
    const y = d => d.date;
    const x = d => d.value;
    
    const totals = data.reduce((ret, cur) => {
      const t = keys.reduce((dailyTotal, k) => {
        dailyTotal += +cur[k];
        return dailyTotal;
      }, 0);
      ret.push(t);
      return ret;
    }, []);

    // bounds
    const xMax = width;
    const yMax = height - margin.top - 100;

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
      tickFormat: () => val => formatDate(val)
    });
    const zScale = scaleOrdinal({
      domain: keys,
      range: ['#6c5efb', '#c998ff', '#a44afe']
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
            fill='#eaedff'
            rx={14}
          />
          <BarStackHorizontal
            top={margin.top}
            left={50 + margin.left}
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
            top={margin.top}
            left={margin.left + 30}
            stroke="#a44afe"
            tickStroke="#a44afe"
            tickLabelProps={(value, index) => ({
              fill: '#a44afe',
              fontSize: 11,
              textAnchor: 'middle',
            })}
          />
          <AxisBottom
            scale={xScale}
            top={yMax + margin.top}
            left={50 + margin.left}
            stroke="#a44afe"
            tickStroke="#a44afe"
            tickLabelProps={(value, index) => ({
              fill: '#a44afe',
              fontSize: 11,
              textAnchor: 'middle',
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
          <LegendOrdinal
            scale={zScale}
            direction="row"
            labelMargin="0 15px 0 0"
          />
        </div>
        {tooltipOpen &&
          <Tooltip
            top={tooltipTop}
            left={tooltipLeft}
            style={{
              minWidth: 60,
              backgroundColor: 'rgba(0,0,0,0.9)',
              color: 'white'
            }}
          >
            <div style={{ color: zScale(tooltipData.key) }}>
              <strong>
                {tooltipData.key}
              </strong>
            </div>
            <div>
              {tooltipData.data[tooltipData.key]}℉
            </div>
            <div>
              <small>
                {tooltipData.xFormatted}
              </small>
            </div>
          </Tooltip>}
      </div>
    );
  }
);