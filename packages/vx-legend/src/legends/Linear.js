import React from 'react';
import Legend from './Legend';
import labelLinear from '../labels/linear';

export default function LegendLinear({
  scale,
  labelFormat = x => x,
  steps,
  ...restProps,
}) {
  const labels = labelLinear({
    scale,
    steps,
    labelFormat,
  });
  return (
    <Legend
      scale={scale}
      labels={labels}
      {...restProps}
    />
  );
}