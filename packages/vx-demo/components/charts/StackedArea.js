import React from 'react';
import Mock from '@vx/mock-data';
import Scale from '@vx/scale';
import { extent, max } from 'd3-array';

export default ({
  margin,
  width,
  height,
}) => {
  const data = Mock.browserUsage;

  const x = Scale.scaleTime({
    range: [0, width],
    domain: d3.extent(data, d => d.date),
  });

  return (

  );
}
