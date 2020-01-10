import React from 'react';
import Show from '../components/Show';
import Areas from '../components/tiles/Areas';

export default () => {
  return (
    <Show
      component={Areas}
      title="Areas"
      margin={{
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
      }}
    >
      {`import React from 'react';
import { AreaClosed, Line, Bar } from '@vx/shape';
import appleStock, { AppleStock } from '@vx/mock-data/lib/mocks/appleStock';
import { curveMonotoneX } from '@vx/curve';
import { GridRows, GridColumns } from '@vx/grid';
import { scaleTime, scaleLinear } from '@vx/scale';
import { withTooltip, Tooltip } from '@vx/tooltip';
import { WithTooltipProvidedProps } from '@vx/tooltip/lib/enhancers/withTooltip';
import { localPoint } from '@vx/event';
import { min, max, extent, bisector } from 'd3-array';
import { timeFormat } from 'd3-time-format';
import { ShowProvidedProps } from '../../types';

type TooltipData = AppleStock;

const stock = appleStock.slice(800);

// util
const formatDate = timeFormat("%b %d, '%y");

// accessors
const xStock = (d: AppleStock) => new Date(d.date);
const yStock = (d: AppleStock) => d.close;
const bisectDate = bisector<AppleStock, Date>(d => new Date(d.date)).left;

export default withTooltip<ShowProvidedProps, TooltipData>(
  ({
    width,
    height,
    margin,
    showTooltip,
    hideTooltip,
    tooltipData,
    tooltipTop,
    tooltipLeft,
  }: ShowProvidedProps & WithTooltipProvidedProps<TooltipData>) => {
    if (width < 10) return null;

    // bounds
    const xMax = width - margin.left - margin.right;
    const yMax = height - margin.top - margin.bottom;

    // scales
    const xScale = scaleTime({
      range: [0, xMax],
      domain: extent(stock, xStock),
    });
    const yScale = scaleLinear({
      range: [yMax, 0],
      domain: [0, max(stock, yStock) + yMax / 3],
      nice: true,
    });

    // tooltip handler
    const handleTooltip = (
      event: React.TouchEvent<SVGRectElement> | React.MouseEvent<SVGRectElement>,
    ) => {
      const { x } = localPoint(event);
      const x0 = xScale.invert(x);
      const index = bisectDate(stock, x0, 1);
      const d0 = stock[index - 1];
      const d1 = stock[index];
      let d = d0;
      if (d1 && d1.date) {
        d = x0.valueOf() - xStock(d0).valueOf() > xStock(d1).valueOf() - x0.valueOf() ? d1 : d0;
      }
      showTooltip({
        tooltipData: d,
        tooltipLeft: x,
        tooltipTop: yScale(d.close),
      });
    };

    return (
      <div>
        <svg width={width} height={height}>
          <rect x={0} y={0} width={width} height={height} fill="#32deaa" rx={14} />
          <defs>
            <linearGradient id="gradient" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#FFFFFF" stopOpacity={1} />
              <stop offset="100%" stopColor="#FFFFFF" stopOpacity={0.2} />
            </linearGradient>
          </defs>
          <GridRows<number>
            scale={yScale}
            width={xMax}
            strokeDasharray="2,2"
            stroke="rgba(255,255,255,0.3)"
            pointerEvents="none"
          />
          <GridColumns<Date>
            scale={xScale}
            height={yMax}
            strokeDasharray="2,2"
            stroke="rgba(255,255,255,0.3)"
            pointerEvents="none"
          />
          <AreaClosed<AppleStock>
            data={stock}
            x={d => xScale(xStock(d))}
            y={d => yScale(yStock(d))}
            yScale={yScale}
            strokeWidth={1}
            stroke="url(#gradient)"
            fill="url(#gradient)"
            curve={curveMonotoneX}
          />
          <Bar
            x={0}
            y={0}
            width={width}
            height={height}
            fill="transparent"
            rx={14}
            onTouchStart={handleTooltip}
            onTouchMove={handleTooltip}
            onMouseMove={handleTooltip}
            onMouseLeave={() => hideTooltip()}
          />
          {tooltipData && (
            <g>
              <Line
                from={{ x: tooltipLeft, y: 0 }}
                to={{ x: tooltipLeft, y: yMax }}
                stroke="rgba(92, 119, 235, 1.000)"
                strokeWidth={2}
                pointerEvents="none"
                strokeDasharray="2,2"
              />
              <circle
                cx={tooltipLeft}
                cy={tooltipTop + 1}
                r={4}
                fill="black"
                fillOpacity={0.1}
                stroke="black"
                strokeOpacity={0.1}
                strokeWidth={2}
                pointerEvents="none"
              />
              <circle
                cx={tooltipLeft}
                cy={tooltipTop}
                r={4}
                fill="rgba(92, 119, 235, 1.000)"
                stroke="white"
                strokeWidth={2}
                pointerEvents="none"
              />
            </g>
          )}
        </svg>
        {tooltipData && (
          <div>
            <Tooltip
              top={tooltipTop - 12}
              left={tooltipLeft + 12}
              style={{
                backgroundColor: 'rgba(92, 119, 235, 1.000)',
                color: 'white',
              }}
            >
              {\`$\${yStock(tooltipData)}\`}
            </Tooltip>
            <Tooltip
              top={yMax - 14}
              left={tooltipLeft}
              style={{
                transform: 'translateX(-50%)',
              }}
            >
              {formatDate(xStock(tooltipData))}
            </Tooltip>
          </div>
        )}
      </div>
    );
  },
);
`}
    </Show>
  );
};
