import React from 'react';
import { Group } from '@vx/group';
import { GridRows } from '@vx/grid';
import { AreaClosed } from '@vx/shape';
import { GradientOrangeRed } from '@vx/gradient';
import { appleStock } from '@vx/mock-data';
import { AxisLeft, AxisBottom } from '@vx/axis';
import { scaleTime, scaleLinear } from '@vx/scale';
import { extent, max } from 'd3-array';

function numTicksForHeight(height) {
  if (height <= 300) return 3;
  if (300 < height && height <= 600) return 5;
  return 10;
}

function numTicksForWidth(width) {
  if (width <= 300) return 2;
  if (300 < width && width <= 400) return 5;
  return 10;
}

export default ({
  margin,
  data,
  width,
  height,
}) => {
  const stock = appleStock;

  // bounds
  const xMax = width - margin.left - margin.right;
  const yMax = height - margin.top - margin.bottom;

  // accessors
  const xStock = d => new Date(d.date);
  const yStock = d => d.close;

  // scales
  const xStockScale = scaleTime({
    range: [0, xMax],
    domain: extent(stock, xStock),
  });
  const yStockScale = scaleLinear({
    range: [yMax, 0],
    domain: [0, max(stock, yStock)],
    nice: true,
  });

  return (
    <svg height={height} width={width}>
      <GradientOrangeRed id="gradient" />
      <Group top={margin.top} left={margin.left}>
        <GridRows
          scale={yStockScale}
          width={xMax}
          strokeDasharray="2,2"
          numTicks={numTicksForHeight(height)}
        />
        <AreaClosed
          data={stock}
          xScale={xStockScale}
          yScale={yStockScale}
          x={xStock}
          y={yStock}
          strokeWidth={2}
          stroke={'url(#gradient)'}
          fill={'url(#gradient)'}
        />
      </Group>
      <AxisBottom
        top={height - margin.bottom}
        left={margin.left}
        scale={xStockScale}
        numTicks={numTicksForWidth(width)}
        label={'date'}
      />
      <AxisLeft
        top={margin.top}
        left={margin.left}
        scale={yStockScale}
        numTicks={numTicksForHeight(height)}
        label={'close price ($)'}
        hideAxisLine
        hideTicks
        hideZero
      />
    </svg>
  );
}
