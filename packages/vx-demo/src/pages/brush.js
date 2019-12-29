import React from 'react';
import Show from '../components/show';
import BrushChart from '../components/tiles/brush';

export default () => {
  return (
    <Show
      component={BrushChart}
      title="BrushChart"
      margin={{
        top: 50,
        left: 50,
        right: 20,
        bottom: 50,
      }}
    >
      {`import React, { useState } from 'react';
import { Group } from '@vx/group';
import { AreaClosed, Bar } from '@vx/shape';
import { AxisLeft, AxisBottom } from '@vx/axis';
import { curveMonotoneX } from '@vx/curve';
import { scaleTime, scaleLinear } from '@vx/scale';
import { appleStock } from '@vx/mock-data';
import { Brush } from '@vx/brush';
import { PatternLines } from '@vx/pattern';
import { LinearGradient } from '@vx/gradient';

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
  yMax,
  margin,
  xScale,
  yScale,
  hideBottomAxis = false,
  hideLeftAxis = false,
  top,
  left,
  children,
}) {
  return (
    <Group left={left || margin.left} top={top || margin.top}>
      <LinearGradient id="gradient" from="#fff" fromOpacity={1} to="#fff" toOpacity={0.2} />

      {!hideBottomAxis && (
        <AxisBottom
          top={yMax}
          scale={xScale}
          numTicks={width > 520 ? 10 : 5}
          stroke={axisColor}
          tickStroke={axisColor}
          tickLabelProps={() => axisBottomTickLabelProps}
        />
      )}
      {!hideLeftAxis && (
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
      <Bar x={0} y={0} width={width} height={height} fill="transparent" rx={14} />
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
  const chartSeparation = 10;
  const heightTopChart = 0.8 * height;
  const heightBottomChart = height - heightTopChart - chartSeparation;

  // bounds
  const xMax = Math.max(width - margin.left - margin.right, 0);
  const yMax = Math.max(heightTopChart - margin.top - margin.bottom, 0);
  const xBrushMax = Math.max(width - brushMargin.left - brushMargin.right, 0);
  const yBrushMax = Math.max(heightBottomChart - brushMargin.top - brushMargin.bottom, 0);

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
          height={heightTopChart}
          margin={margin}
          yMax={yMax}
          xMax={xMax}
          xScale={xScale}
          yScale={yScale}
        />
        <AreaChart
          hideBottomAxis
          hideLeftAxis
          data={stock}
          width={width}
          height={heightBottomChart}
          yMax={yBrushMax}
          xMax={xBrushMax}
          xScale={xBrushScale}
          yScale={yBrushScale}
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
            xScale={xBrushScale}
            yScale={yBrushScale}
            width={xBrushMax}
            height={yBrushMax}
            handleSize={8}
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
`}
    </Show>
  );
};
