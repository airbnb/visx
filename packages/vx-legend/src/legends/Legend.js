import React from 'react';
import Group from '@vx/group';
import labelQuantile from '../labels/quantile';

export default function Legend({
  scale,
  labelFormat = d => d,
  labelDelimiter = '-',
}) {
  const labels = labelQuantile({
    scale,
    labelFormat,
    labelDelimiter
  });
  return (
    <div className='vx-legend'>
      {labels.map((label, i) => {
        return (
          <div key={`${label}-${i}`}>
            {label}
          </div>
        );
      })}
    </div>
  );
}