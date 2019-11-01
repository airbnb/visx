import React, { useState } from 'react';
import { Group } from '@vx/group';
import { AreaClosed, Line, Bar } from '@vx/shape';
import { AxisLeft, AxisBottom } from '@vx/axis';
import { curveMonotoneX } from '@vx/curve';
import { scaleTime, scaleLinear } from '@vx/scale';
import { appleStock } from '@vx/mock-data';
import { Brush } from '@vx/brush';
import { PatternLines } from '@vx/pattern';

/**
 * Initialize some variables
 */
const stock = appleStock.slice(1200);
const min = (arr, fn) => Math.min(...arr.map(fn));
const max = (arr, fn) => Math.max(...arr.map(fn));
const extent = (arr, fn) => [min(arr, fn), max(arr, fn)];
const axisColor = '#fff';
const axisBottomTickLabelProps = {
  textAnchor: 'middle',
  fontFamily: 'Arial',
  fontSize: 10,
  fill: axisColor,
};
const axisLeftTickLabelProps = {
  dx: '-0.25em',
  dy: '0.25em',
  fill: 'black',
  fontFamily: 'Arial',
  fontSize: 10,
  textAnchor: 'end',
  fill: axisColor,
};

// accessors
const xStock = d => new Date(d.date);
const yStock = d => d.close;

function AreaChart({
  data,
  width,
  height,
  xMax,
  yMax,
  margin,
  xScale,
  yScale,
  axis = false,
  top,
  left,
  children,
}) {
  return (
    <Group left={left || margin.left} top={top || margin.top}>
      <defs>
        <linearGradient id="gradient" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#FFFFFF" stopOpacity={1} />
          <stop offset="100%" stopColor="#FFFFFF" stopOpacity={0.2} />
        </linearGradient>
      </defs>
      {axis && (
        <AxisBottom
          top={yMax}
          scale={xScale}
          numTicks={width > 520 ? 10 : 5}
          stroke={axisColor}
          tickStroke={axisColor}
          tickLabelProps={() => axisBottomTickLabelProps}
        />
      )}
      {axis && (
        <AxisLeft
          scale={yScale}
          numTicks={5}
          stroke={axisColor}
          tickStroke={axisColor}
          tickLabelProps={() => axisLeftTickLabelProps}
        />
      )}
      <AreaClosed
        data={data}
        x={d => xScale(xStock(d))}
        y={d => yScale(yStock(d))}
        yScale={yScale}
        strokeWidth={1}
        stroke="url(#gradient)"
        fill="url(#gradient)"
        curve={curveMonotoneX}
      />
      <Bar x={0} y={0} width={width} height={height} fill="transparent" rx={14} data={stock} />
      {children}
    </Group>
  );
}

function BrushChart({
  width,
  height,
  margin = {
    top: 50,
    left: 50,
    bottom: 0,
    right: 20,
  },
}) {
  const [filteredStock, setFilteredStock] = useState(stock);

  function onBrushChange(domain) {
    if (!domain) return;
    const { x0, x1, y0, y1 } = domain;
    const stockCopy = stock.filter(s => {
      const x = xStock(s).getTime();
      const y = yStock(s);
      return x > x0 && x < x1 && y > y0 && y < y1;
    });
    setFilteredStock(stockCopy);
  }

  const brushMargin = { top: 0, bottom: 20, left: 50, right: 20 };

  // bounds
  const xMax = Math.max(width - margin.left - margin.right, 0);
  const yMax = Math.max(height * 0.6 - margin.top - margin.bottom, 0);
  const xBrushMax = Math.max(width - brushMargin.left - brushMargin.right, 0);
  const yBrushMax = Math.max(120 - brushMargin.top - brushMargin.bottom, 0);

  // scales
  const xScale = scaleTime({
    range: [0, xMax],
    domain: extent(filteredStock, xStock),
  });
  const yScale = scaleLinear({
    range: [yMax, 0],
    domain: [0, max(filteredStock, yStock) + yMax / 3],
    nice: true,
  });
  const xBrushScale = scaleTime({
    range: [0, xBrushMax],
    domain: extent(stock, xStock),
  });
  const yBrushScale = scaleLinear({
    range: [yBrushMax, 0],
    domain: [0, max(stock, yStock) + yBrushMax / 3],
    nice: true,
  });

  return (
    <div>
      <svg width={width} height={height}>
        <rect x={0} y={0} width={width} height={height} fill="#32deaa" rx={14} />
        <AreaChart
          data={filteredStock}
          width={width}
          height={height * 0.6}
          margin={margin}
          axis
          yMax={yMax}
          xMax={xMax}
          xScale={xScale}
          yScale={yScale}
        />
        <AreaChart
          data={stock}
          width={width}
          height={120}
          yMax={yBrushMax}
          xMax={xBrushMax}
          xScale={xBrushScale}
          yScale={yBrushScale}
          margin={brushMargin}
          top={height * 0.6 + 50}
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
            xScale={xBrushScale}
            yScale={yBrushScale}
            width={xBrushMax}
            height={yBrushMax}
            handleSize={4}
            resizeTriggerAreas={['left', 'right']}
            brushDirection="horizontal"
            onChange={onBrushChange}
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
