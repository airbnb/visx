import React from 'react';
import { render } from 'react-dom';
import { Line } from '@vx/shape';

function Demo() {
  return (
    <svg width={500} height={300}>
      <Line
        from={new Point({ x: 0, y: 0 })}
        to={new Point({ x: 200, y: 200 })}
        stroke = {{
          color: '#000',
          width: 1,
          dasharray: '',
        }}
      />
    </svg>
  );
}
