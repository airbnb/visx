import React from 'react';
import Codeblock from './Codeblock';

export default ({}) => {
  return (
    <Codeblock>
      {`// SimpleAreaChart.js
function SimpleAreaChart({
  margin,
  data,
  screenWidth,
  screenHeight,
}) {
  const stock = appleStock;

  const width = screenWidth / 1.5;
  const height = width / 2;

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
      <rect
        width={width}
        height={height}
        stroke="black"
        strokeWidth={1}
        fill={'none'}
      />
      <Group top={margin.top} left={margin.left}>
        <GridRows
          scale={yStockScale}
          width={xMax}
          strokeDasharray="2,2"
          numTicks={numTicksForHeight(height)}
        />
        <Shape.AreaClosed
          data={stock}
          xScale={xStockScale}
          yScale={yStockScale}
          x={xStock}
          y={yStock}
          strokeWidth={2}
          stroke={'url(#linear)'}
          fill={'url(#linear)'}
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

export default withScreenSize(SimpleAreaChart);`}
    </Codeblock>
  );
}
