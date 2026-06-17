// @vitest-environment node

import React from 'react';
import { renderToString } from 'react-dom/server';
import { getPositiveDomain, getResponsiveWidth, useChartDimensions } from '../src';

function ChartProbe() {
  const { innerWidth, innerHeight } = useChartDimensions({
    width: 100,
    height: 50,
    margin: { left: 10, right: 10 },
  });

  return <svg data-inner={`${innerWidth}x${innerHeight}`} />;
}

describe('@visx/chart SSR', () => {
  it('renders without touching browser globals', () => {
    expect(renderToString(<ChartProbe />)).toContain('80x50');
    expect(getPositiveDomain([1, 2])).toEqual([0, 2]);
    expect(getResponsiveWidth(0, 100)).toBe(100);
  });
});
