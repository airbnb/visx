import React from 'react';
import { Group } from '@vx/group';
import { ViolinPlot, BoxPlot } from '@vx/stats';
import { LinearGradient } from '@vx/gradient';
import { scaleBand, scaleLinear } from '@vx/scale';
import { genStats } from '@vx/mock-data';
import { withTooltip, Tooltip } from '@vx/tooltip';
import { PatternLines } from '@vx/pattern';

const data = genStats(5);

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
    tooltipOpen,
    tooltipLeft,
    tooltipTop,
    tooltipData,
    showTooltip,
    hideTooltip,
  }) => {
    if (width < 10) return null;

    // bounds
    const xMax = width;
    const yMax = height - 120;

    // scales
    const xScale = scaleBand({
      rangeRound: [0, xMax],
      domain: data.map(x),
      padding: 0.4,
    });

    const values = data.reduce((r, { boxPlot: e }) => r.push(e.min, e.max) && r, []);
    const minYValue = Math.min(...values);
    const maxYValue = Math.max(...values);

    const yScale = scaleLinear({
      rangeRound: [yMax, 0],
      domain: [minYValue, maxYValue],
    });

    const boxWidth = xScale.bandwidth();
    const constrainedWidth = Math.min(40, boxWidth);

    return (
      <div style={{ position: 'relative' }}>
        <svg width={width} height={height}>
          <LinearGradient id="statsplots" to="#8b6ce7" from="#87f2d4" />
          <rect x={0} y={0} width={width} height={height} fill="url(#statsplots)" rx={14} />
          <PatternLines
            id="hViolinLines"
            height={3}
            width={3}
            stroke="#ced4da"
            strokeWidth={1}
            fill="rgba(0,0,0,0.3)"
            orientation={['horizontal']}
          />
          <Group top={40}>
            {data.map((d, i) => (
              <g key={i}>
                <ViolinPlot
                  data={d.binData}
                  stroke="#dee2e6"
                  left={xScale(x(d))}
                  width={constrainedWidth}
                  valueScale={yScale}
                  fill="url(#hViolinLines)"
                />
                <BoxPlot
                  data={d.binData}
                  min={min(d)}
                  max={max(d)}
                  left={xScale(x(d)) + 0.3 * constrainedWidth}
                  firstQuartile={firstQuartile(d)}
                  thirdQuartile={thirdQuartile(d)}
                  median={median(d)}
                  boxWidth={constrainedWidth * 0.4}
                  fill="#FFFFFF"
                  fillOpacity={0.3}
                  stroke="#FFFFFF"
                  strokeWidth={2}
                  valueScale={yScale}
                  outliers={outliers(d)}
                  minProps={{
                    onMouseOver: () => {
                      showTooltip({
                        tooltipTop: yScale(min(d)) + 40,
                        tooltipLeft: xScale(x(d)) + constrainedWidth + 5,
                        tooltipData: {
                          min: min(d),
                          name: x(d),
                        },
                      });
                    },
                    onMouseLeave: () => {
                      hideTooltip();
                    },
                  }}
                  maxProps={{
                    onMouseOver: () => {
                      showTooltip({
                        tooltipTop: yScale(max(d)) + 40,
                        tooltipLeft: xScale(x(d)) + constrainedWidth + 5,
                        tooltipData: {
                          max: max(d),
                          name: x(d),
                        },
                      });
                    },
                    onMouseLeave: () => {
                      hideTooltip();
                    },
                  }}
                  boxProps={{
                    onMouseOver: () => {
                      showTooltip({
                        tooltipTop: yScale(median(d)) + 40,
                        tooltipLeft: xScale(x(d)) + constrainedWidth + 5,
                        tooltipData: {
                          ...d.boxPlot,
                          name: x(d),
                        },
                      });
                    },
                    onMouseLeave: () => {
                      hideTooltip();
                    },
                  }}
                  medianProps={{
                    style: {
                      stroke: 'white',
                    },
                    onMouseOver: () => {
                      showTooltip({
                        tooltipTop: yScale(median(d)) + 40,
                        tooltipLeft: xScale(x(d)) + constrainedWidth + 5,
                        tooltipData: {
                          median: median(d),
                          name: x(d),
                        },
                      });
                    },
                    onMouseLeave: () => {
                      hideTooltip();
                    },
                  }}
                />
              </g>
            ))}
          </Group>
        </svg>
        {tooltipOpen && (
          <Tooltip
            top={tooltipTop}
            left={tooltipLeft}
            style={{ backgroundColor: '#283238', color: 'white' }}
          >
            <div>
              <strong>{tooltipData.name}</strong>
            </div>
            <div style={{ marginTop: '5px', fontSize: '12px' }}>
              {tooltipData.max && <div>max: {tooltipData.max}</div>}
              {tooltipData.thirdQuartile && <div>third quartile: {tooltipData.thirdQuartile}</div>}
              {tooltipData.median && <div>median: {tooltipData.median}</div>}
              {tooltipData.firstQuartile && <div>first quartile: {tooltipData.firstQuartile}</div>}
              {tooltipData.min && <div>min: {tooltipData.min}</div>}
            </div>
          </Tooltip>
        )}
      </div>
    );
  },
);
