import React from 'react';
import { AreaClosed } from '@vx/shape';
import { appleStock } from '@vx/mock-data';
import { curveMonotoneX } from '@vx/curve';
import { LinearGradient } from '@vx/gradient';
import { GridRows, GridColumns } from '@vx/grid';
import { scaleTime, scaleLinear } from '@vx/scale';
import { extent, max } from 'd3-array';

const stock = appleStock.slice(800);

// accessors
const xStock = d => new Date(d.date);
const yStock = d => d.close;

export default ({
  width,
  height,
  margin,
}) => {
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

  return (
    <svg width={width} height={height}>
      <rect
        x={0}
        y={0}
        width={width}
        height={height}
        fill="#32deaa"
        rx={14}
      />
      <LinearGradient
        id={'gradient'}
        from='#ffffff'
        to='rgba(255,255,255,0.2)'
      />
      <GridRows
        scale={yScale}
        width={xMax}
        strokeDasharray='2,2'
        stroke='rgba(255,255,255,0.3)'
      />
      <GridColumns
        scale={xScale}
        height={yMax}
        strokeDasharray='2,2'
        stroke='rgba(255,255,255,0.3)'
      />
      <AreaClosed
        data={stock}
        xScale={xScale}
        yScale={yScale}
        x={xStock}
        y={yStock}
        strokeWidth={1}
        stroke={'url(#gradient)'}
        fill={'url(#gradient)'}
        curve={curveMonotoneX}
      />
    </svg>
  );
}
