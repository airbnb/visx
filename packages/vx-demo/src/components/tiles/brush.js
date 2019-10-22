import React from 'react';
import { Group } from '@vx/group';
import { GridRows, GridColumns } from '@vx/grid';
import { AreaClosed, Line, Bar } from '@vx/shape';
import { AxisLeft, AxisBottom } from '@vx/axis';
import { curveMonotoneX } from '@vx/curve';
import { scaleTime, scaleLinear } from '@vx/scale';
import { appleStock } from '@vx/mock-data';

const stock = appleStock.slice(800);
const min = (arr, fn) => Math.min(...arr.map(fn));
const max = (arr, fn) => Math.max(...arr.map(fn));
const extent = (arr, fn) => [min(arr, fn), max(arr, fn)];

// accessors
const xStock = d => new Date(d.date);
const yStock = d => d.close;

function BrushChart({ width, height, margin = { top: 0, left: 50, bottom: 80, right: 20 } }) {
  console.log(width, height, margin);
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

  return (
    <div>
      <svg width={width} height={height}>
        <rect x={0} y={0} width={width} height={height} fill="#32deaa" rx={14} />
        <Group left={margin.left} top={margin.top}>
          <defs>
            <linearGradient id="gradient" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#FFFFFF" stopOpacity={1} />
              <stop offset="100%" stopColor="#FFFFFF" stopOpacity={0.2} />
            </linearGradient>
          </defs>
          <GridRows
            lineStyle={{ pointerEvents: 'none' }}
            scale={yScale}
            width={xMax}
            strokeDasharray="2,2"
            stroke="rgba(255,255,255,0.3)"
          />
          <GridColumns
            lineStyle={{ pointerEvents: 'none' }}
            scale={xScale}
            height={yMax}
            strokeDasharray="2,2"
            stroke="rgba(255,255,255,0.3)"
          />
          <AxisBottom top={yMax} scale={xScale} numTicks={width > 520 ? 10 : 5} />
          <AxisLeft scale={yScale} />
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
        </Group>
      </svg>
    </div>
  );
}

export default BrushChart;
