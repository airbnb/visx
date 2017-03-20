import React from 'react';
import { render } from 'react-dom';
import Shape from '@vx/shape';
import Point from '@vx/point';

export default function Demo() {
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
