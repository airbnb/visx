import React from 'react';
import Show from '../components/show';
import BoxPlot from '../components/tiles/boxplot';

export default () => {
  return (
    <Show
      events={true}
      margin={{ top: 80 }}
      component={BoxPlot}
      title="BoxPlot With ViolinPlot"
    >
      {`import React from 'react';
import { Group } from '@vx/group';
import { BoxPlot } from '@vx/boxplot';
import { LinearGradient } from '@vx/gradient';
import { scaleBand, scaleLinear } from '@vx/scale';
import { genBoxPlot } from '@vx/mock-data';
import { withTooltip, Tooltip } from '@vx/tooltip';
import { extent } from 'd3-array';
import { format } from 'd3-format';

const data = genBoxPlot(5);
const twoDecimalFormat = format('.2f');

// accessors
const x = d => d.x;
const min = d => d.min;
const max = d => d.max;
const median = d => d.median;
const firstQuartile = d => d.firstQuartile;
const thirdQuartile = d => d.thirdQuartile;

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
      (r, e) => r.push(e.min, e.max) && r,
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
            fill={\`url(#boxplot)\`}
            rx={14}
          />
          <Group top={40}>
            {data.map((d, i) =>
              <BoxPlot
                key={i}
                data={d}
                min={yScale(min(d))}
                max={yScale(max(d))}
                left={xScale(x(d))}
                firstQuartile={yScale(firstQuartile(d))}
                thirdQuartile={yScale(thirdQuartile(d))}
                median={yScale(median(d))}
                boxWidth={actualyWidth}
                fill="#FFFFFF"
                fillOpacity={0.3}
                stroke="#FFFFFF"
                strokeWidth={2}
                minProps={{
                  onMouseOver: data => event => {
                    showTooltip({
                      tooltipTop: yScale(data.data.min) + 40,
                      tooltipLeft: data.x2 + 5,
                      tooltipData: {
                        min: data.data.min,
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
                      tooltipTop: yScale(data.data.max) + 40,
                      tooltipLeft: data.x2 + 5,
                      tooltipData: {
                        max: data.data.max,
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
                      tooltipTop: yScale(data.data.median) + 40,
                      tooltipLeft: data.x2 + 5,
                      tooltipData: {
                        ...data.data,
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
                        median: data.data.median,
                        name: x(d)
                      }
                    });
                  },
                  onMouseLeave: data => event => {
                    hideTooltip();
                  }
                }}
              />
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
`}
    </Show>
  );
};
