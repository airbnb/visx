import React from 'react';
import ClipPath from './ClipPath';

export default ({ id, x = 0, y = 0, width = 1, height = 1, ...restProps }) => (
  <ClipPath id={id}>
    <rect x={x} y={y} width={width} height={height} {...restProps} />
  </ClipPath>
);
