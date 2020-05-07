import React, { useState, useMemo } from 'react';
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
const brushMargin = { top: 0, bottom: 20, left: 50, right: 20 };
const chartSeparation = 24;
const PATTERN_ID = 'brush_pattern';
const GRADIENT_ID = 'brush_gradient';
const selectedBrushStyle = {
  fill: `url(#${PATTERN_ID})`,
  stroke: 'white',
};

// accessors
const getDate = (d: AppleStock) => new Date(d.date);
const getStockValue = (d: AppleStock) => d.close;

type Props = {
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
    top: 50,
    left: 50,
    bottom: 0,
    right: 20,
  },
}: Props) {
  const [filteredStock, setFilteredStock] = useState(stock);

  const onBrushChange = (domain: Bounds | null) => {
    if (!domain) return;
    const { x0, x1, y0, y1 } = domain;
    const stockCopy = stock.filter(s => {
      const x = getDate(s).getTime();
      const y = getStockValue(s);
      return x > x0 && x < x1 && y > y0 && y < y1;
    });
    setFilteredStock(stockCopy);
  };

  const heightTopChart = 0.8 * height;
  const heightBottomChart = height - heightTopChart - chartSeparation;

  // bounds
  const xMax = Math.max(width - margin.left - margin.right, 0);
  const yMax = Math.max(heightTopChart - margin.top - margin.bottom, 0);
  const xBrushMax = Math.max(width - brushMargin.left - brushMargin.right, 0);
  const yBrushMax = Math.max(heightBottomChart - brushMargin.top - brushMargin.bottom, 0);

  // scales
  const dateScale = useMemo(
    () =>
      scaleTime<number>({
        range: [0, xMax],
        domain: extent(filteredStock, getDate) as [Date, Date],
      }),
    [xMax, filteredStock],
  );
  const stockScale = useMemo(
    () =>
      scaleLinear<number>({
        range: [yMax, 0],
        domain: [0, (max(filteredStock, getStockValue) || 0) + yMax / 3],
        nice: true,
      }),
    [yMax, filteredStock],
  );
  const brushDateScale = useMemo(
    () =>
      scaleTime<number>({
        range: [0, xBrushMax],
        domain: extent(stock, getDate) as [Date, Date],
      }),
    [xBrushMax],
  );
  const brushStockScale = useMemo(
    () =>
      scaleLinear({
        range: [yBrushMax, 0],
        domain: [0, (max(stock, getStockValue) || 0) + yBrushMax / 3],
        nice: true,
      }),
    [yBrushMax],
  );

  const initialBrushPosition = useMemo(
    () => ({
      start: { x: brushDateScale(getDate(stock[50])) },
      end: { x: brushDateScale(getDate(stock[100])) },
    }),
    [brushDateScale],
  );

  return (
    <div>
      <svg width={width} height={height}>
        <LinearGradient
          id={GRADIENT_ID}
          from="#b9257a"
          fromOpacity={0.8}
          to="#7c1d6f"
          toOpacity={0.8}
        />
        <rect x={0} y={0} width={width} height={height} fill={`url(#${GRADIENT_ID})`} rx={14} />
        <AreaChart
          hideBottomAxis={compact}
          data={filteredStock}
          width={width}
          margin={margin}
          yMax={yMax}
          xScale={dateScale}
          yScale={stockScale}
        />
        <AreaChart
          hideBottomAxis
          hideLeftAxis
          data={stock}
          width={width}
          yMax={yBrushMax}
          xScale={brushDateScale}
          yScale={brushStockScale}
          margin={brushMargin}
          top={heightTopChart + chartSeparation}
        >
          <PatternLines
            id={PATTERN_ID}
            height={8}
            width={8}
            stroke={'white'}
            strokeWidth={1}
            orientation={['diagonal']}
          />
          <Brush
            xScale={brushDateScale}
            yScale={brushStockScale}
            width={xBrushMax}
            height={yBrushMax}
            margin={brushMargin}
            handleSize={8}
            resizeTriggerAreas={['left', 'right']}
            brushDirection="horizontal"
            initialBrushPosition={initialBrushPosition}
            onChange={onBrushChange}
            onClick={() => setFilteredStock(stock)}
            selectedBoxStyle={selectedBrushStyle}
          />
        </AreaChart>
      </svg>
    </div>
  );
}

export default BrushChart;
