import React from 'react';
import { BarSeries } from '../../src';
import combineBarStackData from '../../src/utils/combineBarStackData';

const accessors = {
  xAccessor: (d: { x: number }) => d.x,
  yAccessor: (d: { y: number }) => d.y,
};

const series1 = {
  dataKey: 'bar1',
  data: [
    { x: 10, y: 5 },
    { x: 7, y: -5 },
  ],
  ...accessors,
};

const series2 = {
  dataKey: 'bar2',
  data: [
    { x: 10, y: 5 },
    { x: 7, y: 20 },
  ],
  ...accessors,
};

const seriesChildren = [
  <BarSeries key={series1.dataKey} {...series1} />,
  <BarSeries key={series2.dataKey} {...series2} />,
];

describe('combineBarStackData', () => {
  it('should be defined', () => {
    expect(combineBarStackData).toBeDefined();
  });

  it('should combine data by x stack value when horizontal=false', () => {
    expect(combineBarStackData(seriesChildren)).toEqual([
      { stack: 10, bar1: 5, bar2: 5, positiveSum: 10, negativeSum: 0 },
      { stack: 7, bar1: -5, bar2: 20, positiveSum: 20, negativeSum: -5 },
    ]);
  });
  it('should combine data by y stack value when horizontal=true', () => {
    expect(combineBarStackData(seriesChildren, true)).toEqual([
      { stack: 5, bar1: 10, bar2: 10, positiveSum: 20, negativeSum: 0 },
      { stack: -5, bar1: 7, positiveSum: 7, negativeSum: 0 },
      { stack: 20, bar2: 7, positiveSum: 7, negativeSum: 0 },
    ]);
  });
});
