import React from 'react';
import Legend from './Legend';
import labelOrdinal from '../labels/ordinal';

export default function LegendOrdinal({
  scale,
  labelFormat = x => x,
  ...restProps,
}) {
  const labels = labelOrdinal({
    scale,
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