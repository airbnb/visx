import React from 'react';
import { render } from 'react-dom';
import Shape from '@vx/shape';
import Point from '@vx/point';
import Axis from '@vx/axis';
import Scale from '@vx/scale';
import Mock from '@vx/mock-data';
import { max, extent } from 'd3-array';

const data1 = Mock.genDateValue(20);
const data2 = Mock.genDateValue(20);

export default function Demo() {
  const width = 800;
  const height = 400;
  const margin = {
    top: 20,
    bottom: 30,
    left: 50,
    right: 50,
  };

  // bounds
  const xMax = width - margin.left - margin.right;
  const yMax = height - margin.top - margin.bottom;

  // accessors
  const x = d => d.date;
  const y = d => d.value;

  // scales
  const xScale = Scale.scaleTime({
    range: [0, xMax],
    domain: extent(data1.concat(data2), x),
    nice: true,
  });
  const yScale = Scale.scaleLinear({
    range: [yMax, 0],
    domain: [0, max(data1.concat(data2), y)],
    nice: true,
  });

  return (
    <svg width={width} height={height}>
      <Shape.Line
        from={new Point({ x: 0, y: 0 })}
        to={new Point({ x: 200, y: 200 })}
        stroke={{
          color: 'steelblue',
          width: 2,
          dasharray: '5,5',
        }}
      />
      <Axis.AxisLeft
        top={margin.top}
        left={margin.left}
        scale={yScale}
      />
    </svg>
  );
}
