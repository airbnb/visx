import React from 'react';
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
const stock = appleStock.slice(800);
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
        data={stock}
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
  function onBrushChange(domain) {
    console.log(domain);
  }
  function onBrushStart(domain) {
    console.log('start', domain);
  }
  function onBrushEnd(domain) {
    console.log('end', domain);
  }

  const brushMargin = { top: 0, bottom: 20, left: 50, right: 20 };

  // bounds
  const xMax = width - margin.left - margin.right;
  const yMax = height * 0.6 - margin.top - margin.bottom;
  const xBrushMax = width - brushMargin.left - brushMargin.right;
  const yBrushMax = 120 - brushMargin.top - brushMargin.bottom;
  console.log(xBrushMax, yBrushMax);

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
            stroke={'#888'}
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
            onBrushStart={onBrushStart}
            onBrushEnd={onBrushEnd}
            onChange={onBrushChange}
            selectedBoxStyle={{
              fill: 'url(#brush_pattern)',
              stroke: '#000',
            }}
          />
        </AreaChart>
      </svg>
    </div>
  );
}

export default BrushChart;
