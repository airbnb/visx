import React from 'react';
import Mock from '@vx/mock-data';
import Curve from '@vx/curve';
import Scale from '@vx/scale';
import Group from '@vx/group';
import Shape from '@vx/shape';
import { extent, max } from 'd3-array';

function genLines(num) {
  return new Array(num).fill(1).map(() => {
    return Mock.genDateValue(25);
  })
}

const series = genLines(12);
const data = series.reduce((rec, d) => {
  return rec.concat(d)
}, []);

// accessors
const x = d => d.date;
const y = d => d.value;

export default ({
  width,
  height,
}) => {
  // bounds
  const xMax = width;
  const yMax = height / 8;

  // scales
  const xScale = Scale.scaleTime({
    range: [0, xMax],
    domain: extent(data, x),
  });
  const yScale = Scale.scaleLinear({
    range: [yMax, 0],
    domain: [0, max(data, y)],
  });

  return (
    <svg width={width} height={height}>
      <rect
        x={0}
        y={0}
        width={width}
        height={height}
        fill="#242424"
        rx={14}
      />
      {xMax > 8 && series.map((d, i) => {
        return (
          <Group key={`lines-${i}`} top={i * yMax/2}>
            <Shape.LinePath
              data={d}
              xScale={xScale}
              yScale={yScale}
              x={x}
              y={y}
              stroke={"#ffffff"}
              strokeWidth={1}
              curve={i % 2 == 0 ? Curve.monotoneX : undefined}
            />
          </Group>
        );
      })}
    </svg>
  );
}
