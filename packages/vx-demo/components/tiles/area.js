import React from 'react';
import Shape from '@vx/shape';
import Mock from '@vx/mock-data';
import Scale from '@vx/scale';
import { curveMonotoneX } from '@vx/curve';
import { LinearGradient } from '@vx/gradient';
import Grid from '@vx/grid';
import { extent, max } from 'd3-array';

const stock = Mock.appleStock.slice(800);

// accessors
const xStock = d => new Date(d.date);
const yStock = d => d.close;

export default ({
  width,
  height,
  margin,
}) => {

  // bounds
  const xMax = width - margin.left - margin.right;
  const yMax = height - margin.top - margin.bottom;

  // scales
  const xScale = Scale.scaleTime({
    range: [0, xMax],
    domain: extent(stock, xStock),
  });
  const yScale = Scale.scaleLinear({
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
      <Grid.Rows
        scale={yScale}
        width={xMax}
        strokeDasharray='2,2'
        stroke='rgba(255,255,255,0.3)'
      />
      <Grid.Columns
        scale={xScale}
        height={yMax}
        strokeDasharray='2,2'
        stroke='rgba(255,255,255,0.3)'
      />
      <Shape.AreaClosed
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
