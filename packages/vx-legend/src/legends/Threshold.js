import React from 'react';
import Legend from './Legend';
import labelThreshold from '../labels/threshold';

export default function LegendThreshold({
  scale,
  labelFormat = x => x,
  labelDelimiter = 'to',
  labelLower = 'Less than ',
  labelUpper = 'More than ',
  ...restProps,
}) {
  const labels = labelThreshold({
    scale,
    labelFormat,
    labelDelimiter,
    labelLower,
    labelUpper,
  });
  return (
    <Legend
      scale={scale}
      labels={labels}
      {...restProps}
    />
  );
}