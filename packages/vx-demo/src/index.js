import React from 'react';
import { render } from 'react-dom';
import Shape from '@vx/shape';
import Point from '@vx/point';
import Axis from '@vx/axis';

console.log(Axis)

export default function Demo() {
  const width = 800;
  const height = 400;
  const margin = {
    top: 20,
    bottom: 30,
    left: 50,
    right: 50,
  };

  const xMax = width - margin.left - margin.right;
  const yMax = height - margin.top - margin.bottom;
  return (
    <svg width={500} height={300}>
      <Shape.Line
        from={new Point({ x: 0, y: 0 })}
        to={new Point({ x: 200, y: 200 })}
        stroke={{
          color: 'steelblue',
          width: 2,
          dasharray: '5,5',
        }}
      />
    </svg>
  );
}
