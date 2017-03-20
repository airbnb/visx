import React from 'react';
import { render } from 'react-dom';
import Shape from '@vx/shape';
import Point from '@vx/point';
import Axis from '@vx/axis';
import Scale from '@vx/scale';
import Mock from '@vx/mock-data';
import Group from '@vx/group';
import Curve from '@vx/curve';
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
  });
  const yScale = Scale.scaleLinear({
    range: [yMax, 0],
    domain: [0, max(data1.concat(data2), y)],
    nice: true,
  });

  return (
    <svg width={width} height={height}>
      <Axis.AxisLeft
        top={margin.top}
        left={margin.left}
        scale={yScale}
        hideZero
      />
      <Group
        top={margin.top}
        left={margin.left}
      >
        <Shape.LinePath
          data={data1}
          xScale={xScale}
          yScale={yScale}
          x={x}
          y={y}
          stroke={{ color: '#6A7DD3', width: 2 }}
          points
        />
        <Shape.LinePath
          data={data2}
          xScale={xScale}
          yScale={yScale}
          x={x}
          y={y}
          stroke={{ width: 2, color: '#5A9C57', dasharray: "5,5" }}
          curve={Curve.cardinal}
        />
      </Group>
      <Axis.AxisBottom
        top={height - margin.bottom}
        left={margin.left}
        scale={xScale}
      />
    </svg>
  );
}
