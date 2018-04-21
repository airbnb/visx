import React from 'react';
import ClipPath from './ClipPath';

export default ({ id, cx, cy, r, ...restProps }) => (
  <ClipPath id={id}>
    <circle cx={cx} cy={cy} r={r} {...restProps} />
  </ClipPath>
);
