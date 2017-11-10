import React from 'react';
import { Group } from '@vx/group';
import { ViolinPlot, BoxPlot } from '@vx/stats';
import { LinearGradient } from '@vx/gradient';
import { scaleBand, scaleLinear } from '@vx/scale';
import { genStats } from '@vx/mock-data';
import { withTooltip, Tooltip } from '@vx/tooltip';
import { extent } from 'd3-array';
import { format } from 'd3-format';
import { PatternLines } from '@vx/pattern';

const data = genStats(5);
const twoDecimalFormat = format('.2f');

// accessors
const x = d => d.boxPlot.x;
const min = d => d.boxPlot.min;
const max = d => d.boxPlot.max;
const median = d => d.boxPlot.median;
const firstQuartile = d => d.boxPlot.firstQuartile;
const thirdQuartile = d => d.boxPlot.thirdQuartile;
const outliers = d => d.boxPlot.outliers;

export default withTooltip(
  ({
    width,
    height,
    events = false,
    tooltipOpen,
    tooltipLeft,
    tooltipTop,
    tooltipData,
    showTooltip,
    hideTooltip
  }) => {
    if (width < 10) return null;

    // bounds
    const xMax = width;
    const yMax = height - 120;

    // scales
    const xScale = scaleBand({
      rangeRound: [0, xMax],
      domain: data.map(x),
      padding: 0.4
    });

    const values = data.reduce(
      (r, { boxPlot:e }) => r.push(e.min, e.max) && r,
      []
    );
    const minYValue = Math.min(...values);
    const maxYValue = Math.max(...values);
    const yDomain = [
      minYValue - 0.1 * Math.abs(minYValue),
      maxYValue + 0.1 * Math.abs(minYValue)
    ];

    const yScale = scaleLinear({
      rangeRound: [yMax, 0],
      domain: [minYValue, maxYValue]
    });

    const boxWidth = xScale.bandwidth();
    const actualyWidth = Math.min(40, boxWidth);

    return (
      <div style={{ position: 'relative' }}>
        <svg width={width} height={height}>
          <LinearGradient id="boxplot" to="#8b6ce7" from="#87f2d4" />
          <rect
            x={0}
            y={0}
            width={width}
            height={height}
            fill={`url(#boxplot)`}
            rx={14}
          />
          <PatternLines
            id='hViolinLines'
            height={3}
            width={3}
            stroke='#ced4da'
            strokeWidth={1}
            fill='rgba(0,0,0,0.3)'
            orientation={['horizontal']}
          />
          <Group top={40}>
            {data.map((d, i) =>
              <g key={i}>
                <ViolinPlot
                  stroke='#dee2e6'
                  binData={d.binData}
                  left={xScale(x(d))}
                  width={actualyWidth}
                  valueScale={yScale}
                  fill="url(#hViolinLines)"
                />
                <BoxPlot
                  data={d}
                  min={min(d)}
                  max={max(d)}
                  left={xScale(x(d))+0.3*actualyWidth}
                  firstQuartile={firstQuartile(d)}
                  thirdQuartile={thirdQuartile(d)}
                  median={median(d)}
                  boxWidth={actualyWidth*0.4}
                  fill="#FFFFFF"
                  fillOpacity={0.3}
                  stroke="#FFFFFF"
                  strokeWidth={2}
                  valueScale={yScale}
                  outliers={outliers(d)}
                  minProps={{
                    onMouseOver: data => event => {
                      showTooltip({
                        tooltipTop: yScale(data.data.boxPlot.min) + 40,
                        tooltipLeft: data.x2 + 5,
                        tooltipData: {
                          min: data.data.boxPlot.min,
                          name: x(d)
                        }
                      });
                    },
                    onMouseLeave: event => event => {
                      hideTooltip();
                    }
                  }}
                  maxProps={{
                    onMouseOver: data => event => {
                      showTooltip({
                        tooltipTop: yScale(data.data.boxPlot.max) + 40,
                        tooltipLeft: data.x2 + 5,
                        tooltipData: {
                          max: data.data.boxPlot.max,
                          name: x(d)
                        }
                      });
                    },
                    onMouseLeave: event => event => {
                      hideTooltip();
                    }
                  }}
                  boxProps={{
                    onMouseOver: data => event => {
                      showTooltip({
                        tooltipTop: yScale(data.data.boxPlot.median) + 40,
                        tooltipLeft: data.x2 + 5,
                        tooltipData: {
                          ...data.data.boxPlot,
                          name: x(d)
                        }
                      });
                    },
                    onMouseLeave: event => event => {
                      hideTooltip();
                    }
                  }}
                  medianProps={{
                    style: {
                      stroke: 'white'
                    },
                    onMouseOver: data => event => {
                      showTooltip({
                        tooltipTop: data.median + 40,
                        tooltipLeft: data.x2 + 5,
                        tooltipData: {
                          median: data.data.boxPlot.median,
                          name: x(d)
                        }
                      });
                    },
                    onMouseLeave: data => event => {
                      hideTooltip();
                    }
                  }}
                />
              </g>
            )}
          </Group>
        </svg>
        {tooltipOpen &&
          <Tooltip
            top={tooltipTop}
            left={tooltipLeft}
            style={{ backgroundColor: '#283238', color: 'white' }}
          >
            <div>
              <strong>
                {tooltipData.name}
              </strong>
            </div>
            <div style={{ marginTop: '5px', fontSize: '12px' }}>
              {tooltipData.max &&
                <div>
                  max: {tooltipData.max}
                </div>}
              {tooltipData.thirdQuartile &&
                <div>
                  third quartile: {tooltipData.thirdQuartile}
                </div>}
              {tooltipData.median &&
                <div>
                  median: {tooltipData.median}
                </div>}
              {tooltipData.firstQuartile &&
                <div>
                  first quartile: {tooltipData.firstQuartile}
                </div>}
              {tooltipData.min &&
                <div>
                  min: {tooltipData.min}
                </div>}
            </div>
          </Tooltip>}
      </div>
    );
  }
);
