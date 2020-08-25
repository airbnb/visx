import React, { useState, useMemo, useCallback } from 'react';
import moment from 'moment';
import { scaleTime, scaleLinear } from '@vx/scale';
import appleStock, { AppleStock } from '@vx/mock-data/lib/mocks/appleStock';
import { Brush } from '@vx/brush';
import { Bounds } from '@vx/brush/lib/types';
import { PatternLines } from '@vx/pattern';
import { LinearGradient } from '@vx/gradient';
import { max, extent } from 'd3-array';

import AreaChart from './AreaChart';

// Initialize some variables
const stock = appleStock.slice(1000);
const brushMargin = { top: 10, bottom: 15, left: 50, right: 20 };
const chartSeparation = 30;
const PATTERN_ID = 'brush_pattern';
const GRADIENT_ID = 'brush_gradient';
export const accentColor = '#f6acc8';
export const background = '#584153';
export const background2 = '#af8baf';
const selectedBrushStyle = {
  fill: `url(#${PATTERN_ID})`,
  stroke: 'white',
};

// accessors
const getDate = (d: AppleStock) => new Date(d.date);
const getStockValue = (d: AppleStock) => d.close;

export type BrushProps = {
  width: number;
  height: number;
  margin?: { top: number; right: number; bottom: number; left: number };
  compact?: boolean;
};

function BrushChart({
  compact = false,
  width,
  height,
  margin = {
    top: 20,
    left: 50,
    bottom: 20,
    right: 20,
  },
}: BrushProps) {
  const [snapBrushToNearestMonth, setSnapBrushToNearestMonth] = useState(false);
  const [filteredStock, setFilteredStock] = useState(stock.slice(50, 100));

  const innerHeight = height - margin.top - margin.bottom;
  const topChartBottomMargin = compact ? chartSeparation / 2 : chartSeparation + 10;
  const topChartHeight = 0.8 * innerHeight - topChartBottomMargin;
  const bottomChartHeight = innerHeight - topChartHeight - chartSeparation;

  // bounds
  const xMax = Math.max(width - margin.left - margin.right, 0);
  const yMax = Math.max(topChartHeight, 0);
  const xBrushMax = Math.max(width - brushMargin.left - brushMargin.right, 0);
  const yBrushMax = Math.max(bottomChartHeight - brushMargin.top - brushMargin.bottom, 0);

  // scales
  const dateScale = useMemo(
    () =>
      scaleTime({
        range: [0, xMax],
        domain: extent(filteredStock, getDate) as [Date, Date],
      }),
    [xMax, filteredStock],
  );
  const stockScale = useMemo(
    () =>
      scaleLinear({
        range: [yMax, 0],
        domain: [0, max(filteredStock, getStockValue) || 0],
        nice: true,
      }),
    [yMax, filteredStock],
  );
  const fullDateRangeScale = useMemo(
    () =>
      scaleTime({
        range: [0, xBrushMax],
        domain: extent(stock, getDate) as [Date, Date],
      }),
    [xBrushMax],
  );
  const fullStockScale = useMemo(
    () =>
      scaleLinear({
        range: [yBrushMax, 0],
        domain: [0, max(stock, getStockValue) || 0],
        nice: true,
      }),
    [yBrushMax],
  );

  const [initialBrushPosition, setInitialBrushPosition] = useState({
    start: { x: fullDateRangeScale(getDate(filteredStock[0] ?? {})) },
    end: { x: fullDateRangeScale(getDate(filteredStock[filteredStock.length - 1] ?? {})) },
  });

  const onBrushChange = useCallback((bounds: Bounds | null) => {
    if (!bounds) return;

    const { x0, x1 } = bounds;
    const nextFilteredStock = stock.filter(s => {
      const x = getDate(s).getTime();
      // for a vertical brush you would use y0 and y1 from `bounds`
      return x > x0 && x < x1;
    });

    setFilteredStock(nextFilteredStock);
  }, []);

  // snap to nearest month on brush end, if relevant
  const onBrushEnd = useCallback(
    (bounds: Bounds | null, forceUpdate?: boolean) => {
      console.log('onBrushEnd', bounds);
      if (!bounds || (!snapBrushToNearestMonth && !forceUpdate)) return;

      const [minDate, maxDate] = fullDateRangeScale.domain().map(d => d.getTime());
      const start = moment(bounds.x0);
      const end = moment(bounds.x1);

      // round to start or end of month depending on which is closer
      start[start.date() <= 15 ? 'startOf' : 'endOf']('month');
      end[end.date() <= 15 ? 'startOf' : 'endOf']('month');

      const x0 = Math.max(start.valueOf(), minDate);
      const x1 = Math.min(end.valueOf(), maxDate);

      const nextFilteredStock = stock.filter(s => {
        const x = getDate(s).getTime();
        return x >= x0 && x <= x1;
      });

      setFilteredStock(nextFilteredStock);

      setInitialBrushPosition({
        start: { x: fullDateRangeScale(getDate(nextFilteredStock[0])) },
        end: { x: fullDateRangeScale(getDate(nextFilteredStock[nextFilteredStock.length - 1])) },
      });
    },
    [snapBrushToNearestMonth, fullDateRangeScale],
  );

  return (
    <div>
      <svg width={width} height={height}>
        <LinearGradient id={GRADIENT_ID} from={background} to={background2} rotate={45} />
        <rect x={0} y={0} width={width} height={height} fill={`url(#${GRADIENT_ID})`} rx={14} />
        <AreaChart
          hideBottomAxis={compact}
          data={filteredStock}
          width={width}
          margin={{ ...margin, bottom: topChartBottomMargin }}
          yMax={yMax}
          xScale={dateScale}
          yScale={stockScale}
          gradientColor={background2}
        />
        <AreaChart
          hideBottomAxis={!snapBrushToNearestMonth}
          hideLeftAxis
          data={stock}
          width={width}
          yMax={yBrushMax}
          xScale={fullDateRangeScale}
          yScale={fullStockScale}
          margin={brushMargin}
          top={topChartHeight + topChartBottomMargin + margin.top}
          gradientColor={background2}
        >
          <PatternLines
            id={PATTERN_ID}
            height={8}
            width={8}
            stroke={accentColor}
            strokeWidth={1}
            orientation={['diagonal']}
          />
          <Brush
            xScale={fullDateRangeScale}
            yScale={fullStockScale}
            width={xBrushMax}
            height={yBrushMax}
            margin={brushMargin}
            handleSize={8}
            resizeTriggerAreas={['left', 'right']}
            brushDirection="horizontal"
            initialBrushPosition={initialBrushPosition}
            onChange={onBrushChange}
            onBrushEnd={onBrushEnd}
            onClick={() => setFilteredStock(stock)}
            selectedBoxStyle={selectedBrushStyle}
          />
        </AreaChart>
      </svg>
      {!compact && (
        <div>
          <label style={{ fontSize: 12 }}>
            <input
              type="checkbox"
              checked={snapBrushToNearestMonth}
              onChange={() => {
                const nextSnapBrush = !snapBrushToNearestMonth;
                setSnapBrushToNearestMonth(nextSnapBrush);
                if (nextSnapBrush) {
                  onBrushEnd(
                    {
                      y0: 0,
                      y1: 0,
                      x0: getDate(filteredStock[0]).getTime(),
                      x1: getDate(filteredStock[filteredStock.length - 1]).getTime(),
                    },
                    true,
                  );
                }
              }}
            />
            &nbsp;Snap brush to nearest month
          </label>
        </div>
      )}
    </div>
  );
}

export default BrushChart;
