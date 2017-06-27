import React from 'react';
import Legend from './Legend';
import labelQuantile from '../labels/quantile';

export default function LegendQuantile({
  scale,
  labelFormat = x => x,
  labelDelimiter = '-',
  ...restProps,
}) {
  const labels = labelQuantile({
    scale,
    labelFormat,
    labelDelimiter
  });
  return (
    <Legend
      scale={scale}
      labels={labels}
      {...restProps}
    />
  );
}