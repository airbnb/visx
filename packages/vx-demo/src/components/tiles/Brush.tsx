import React, { useState } from 'react';
import { Group } from '@vx/group';
import { AreaClosed } from '@vx/shape';
import { ScaleType } from '@vx/shape/lib/types';
import { AxisLeft, AxisBottom } from '@vx/axis';
import { curveMonotoneX } from '@vx/curve';
import { scaleTime, scaleLinear } from '@vx/scale';
import appleStock, { AppleStock } from '@vx/mock-data/lib/mocks/appleStock';
import { Brush } from '@vx/brush';
import { Bounds } from '@vx/brush/lib/types';
import { PatternLines } from '@vx/pattern';
import { LinearGradient } from '@vx/gradient';
import { max, extent } from 'd3-array';
import { ShowProvidedProps, MarginShape } from '../../types';

/**
 * Initialize some variables
 */
const stock = appleStock.slice(1000);
const axisColor = '#fff';
const axisBottomTickLabelProps = {
  textAnchor: 'middle' as const,
  fontFamily: 'Arial',
  fontSize: 10,
  fill: axisColor,
};
const axisLeftTickLabelProps = {
  dx: '-0.25em',
  dy: '0.25em',
  fontFamily: 'Arial',
  fontSize: 10,
  textAnchor: 'end' as const,
  fill: axisColor,
};

// accessors
const getDate = (d: AppleStock) => new Date(d.date);
const getStockValue = (d: AppleStock) => d.close;

function AreaChart({
  data,
  width,
  yMax,
  margin,
  xScale,
  yScale,
  hideBottomAxis = false,
  hideLeftAxis = false,
  top,
  left,
  children,
}: {
  data: AppleStock[];
  xScale: ScaleType;
  yScale: ScaleType;
  width: number;
  yMax: number;
  margin: MarginShape;
  hideBottomAxis?: boolean;
  hideLeftAxis?: boolean;
  top?: number;
  left?: number;
  children?: React.ReactNode;
}) {
  return (
    <Group left={left || margin.left} top={top || margin.top}>
      <LinearGradient id="gradient" from="#fff" fromOpacity={1} to="#fff" toOpacity={0.2} />

      {!hideBottomAxis && (
        <AxisBottom<Date>
          top={yMax}
          scale={xScale}
          numTicks={width > 520 ? 10 : 5}
          stroke={axisColor}
          tickStroke={axisColor}
          tickLabelProps={() => axisBottomTickLabelProps}
        />
      )}
      {!hideLeftAxis && (
        <AxisLeft<number>
          scale={yScale}
          numTicks={5}
          stroke={axisColor}
          tickStroke={axisColor}
          tickLabelProps={() => axisLeftTickLabelProps}
        />
      )}
      <AreaClosed<AppleStock>
        data={data}
        x={d => xScale(getDate(d)) || 0}
        y={d => yScale(getStockValue(d)) || 0}
        yScale={yScale}
        strokeWidth={1}
        stroke="url(#gradient)"
        fill="url(#gradient)"
        curve={curveMonotoneX}
      />
      {children}
    </Group>
  );
}

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
}: ShowProvidedProps & { compact?: boolean }) {
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

  const brushMargin = { top: 0, bottom: 20, left: 50, right: 20 };
  const chartSeparation = 10;
  const heightTopChart = 0.8 * height;
  const heightBottomChart = height - heightTopChart - chartSeparation;

  // bounds
  const xMax = Math.max(width - margin.left - margin.right, 0);
  const yMax = Math.max(heightTopChart - margin.top - margin.bottom, 0);
  const xBrushMax = Math.max(width - brushMargin.left - brushMargin.right, 0);
  const yBrushMax = Math.max(heightBottomChart - brushMargin.top - brushMargin.bottom, 0);

  // scales
  const dateScale = scaleTime<number>({
    range: [0, xMax],
    domain: extent(filteredStock, getDate) as [Date, Date],
  });
  const stockScale = scaleLinear<number>({
    range: [yMax, 0],
    domain: [0, (max(filteredStock, getStockValue) || 0) + yMax / 3],
    nice: true,
  });
  const brushDateScale = scaleTime<number>({
    range: [0, xBrushMax],
    domain: extent(stock, getDate) as [Date, Date],
  });
  const brushStockScale = scaleLinear({
    range: [yBrushMax, 0],
    domain: [0, (max(stock, getStockValue) || 0) + yBrushMax / 3],
    nice: true,
  });

  const initialBrushPosition = {
    start: { x: brushDateScale(getDate(stock[50])) },
    end: { x: brushDateScale(getDate(stock[100])) },
  };

  return (
    <div>
      <svg width={width} height={height}>
        <LinearGradient
          id="brush_gradient"
          from="#b9257a"
          fromOpacity={0.8}
          to="#7c1d6f"
          toOpacity={0.8}
        />
        <rect x={0} y={0} width={width} height={height} fill="url(#brush_gradient)" rx={14} />
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
            id="brush_pattern"
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
            resizeTriggerAreas={['left', 'right', 'bottomRight']}
            brushDirection="horizontal"
            initialBrushPosition={initialBrushPosition}
            onChange={onBrushChange}
            onClick={() => setFilteredStock(stock)}
            selectedBoxStyle={{
              fill: 'url(#brush_pattern)',
              stroke: 'white',
            }}
          />
        </AreaChart>
      </svg>
    </div>
  );
}

export default BrushChart;
