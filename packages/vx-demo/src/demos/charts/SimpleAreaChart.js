import React from 'react';
import Group from '@vx/group';
import Axis from '@vx/axis';
import Mock from '@vx/mock-data';
import Scale from '@vx/scale';

export default function SimpleAreaChart({
  width,
  height,
  margin,
  data,
}) {
  const stock = Mock.appleStock;

  // bounds
  const xMax = width - margin.left - margin.right;
  const yMax = height - margin.top - margin.bottom;

  // accessors
  const xStock = d => new Date(d.date);
  const yStock = d => d.close;

  // scales
  const xStockScale = Scale.scaleTime({
    range: [0, xMax],
    domain: extent(stock, xStock),
  });
  const yStockScale = Scale.scaleLinear({
    range: [yMax, 0],
    domain: [0, max(stock, yStock)],
    nice: true,
  });

  return (
    <svg height={height} width={width}>
      <defs>
        <linearGradient id="linear" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%"   stopColor="rgba(181, 49, 206, 1.000)"/>
          <stop offset="100%" stopColor="rgba(1, 179, 239, 1.000)"/>
        </linearGradient>
      </defs>
      <Group top={margin.top} left={margin.left}>
        {/* <Rows
          scale={yStockScale}
          width={xMax}
          strokeDasharray="2,2"
        />
        <Area
          data={stock}
          xScale={xStockScale}
          yScale={yStockScale}
          x={xStock}
          y={yStock}
          strokeWidth={1}
          stroke={'url(#linear)'}
          fill={'url(#linear)'}
        /> */}
      </Group>
      <Axis.AxisBottom
        top={height - margin.bottom}
        left={margin.left}
        scale={xStockScale}
      />
      <Axis.AxisLeft
        top={margin.top}
        left={margin.left}
        scale={yStockScale}
        hideAxisLine
        hideTicks
        hideZero
      />
    </svg>
  );
}
