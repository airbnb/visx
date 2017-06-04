import React from 'react';
import { Arc } from '@vx/shape';

export default () => {
  const data = [1, 1, 2, 3, 5, 8, 13];
  return (
    <svg width={200} height={150}>
      <Arc
        top={150 / 2}
        left={200 / 2}
        data={data}
        innerRadius={20}
        outerRadius={200 / 4}
        startAngle={0}
        endAngle={Math.PI * 2}
        fill="none"
        fillOpacity={(d) => 1 / d}
        stroke="black"
        strokeWidth={5}
      />
    </svg>
  );
}