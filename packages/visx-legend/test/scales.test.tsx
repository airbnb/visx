import React from 'react';
import { shallow } from 'enzyme';
import { scaleBand, scaleLinear, scaleOrdinal, scaleThreshold, scaleQuantile } from '@visx/scale';

import {
  Legend,
  LegendLinear,
  LegendOrdinal,
  LegendSize,
  LegendThreshold,
  LegendQuantile,
} from '../src';

describe('Legend scales', () => {
  it('should render with scaleLinear', () => {
    const linearScale = scaleLinear<number>({
      domain: [0, 10],
      range: [1, 5, 10, 15, 20],
    });

    expect(() => shallow(<LegendLinear scale={linearScale} />)).not.toThrow();
    expect(() => shallow(<LegendSize scale={linearScale} />)).not.toThrow();
    expect(() => shallow(<Legend scale={linearScale} />)).not.toThrow();
  });

  it('should render with scaleOrdinal', () => {
    const ordinalScale = scaleOrdinal<string, string>({
      domain: ['a', 'b', 'c', 'd'],
      range: ['#66d981', '#71f5ef', '#4899f1', '#7d81f6'],
    });

    expect(() => shallow(<LegendOrdinal scale={ordinalScale} />)).not.toThrow();
    expect(() => shallow(<Legend scale={ordinalScale} />)).not.toThrow();
  });

  it('should render with scaleBand', () => {
    const bandScale = scaleBand<string>({
      domain: ['a', 'b', 'c', 'd'],
      range: [1, 10],
    });

    expect(() => shallow(<Legend scale={bandScale} />)).not.toThrow();
  });

  it('should render with scaleThreshold', () => {
    const thresholdScale = scaleThreshold<number, string>({
      domain: [0.01, 0.02, 0.04, 0.06, 0.08, 0.1],
      range: ['#f2f0f7', '#dadaeb', '#bcbddc', '#9e9ac8', '#756bb1', '#54278f'],
    });

    expect(() => shallow(<LegendThreshold scale={thresholdScale} />)).not.toThrow();
    expect(() => shallow(<Legend scale={thresholdScale} />)).not.toThrow();
  });

  it('should render with scaleQuantile', () => {
    const quantileScale = scaleQuantile<string>({
      domain: [0.01, 0.02, 0.04, 0.06, 0.08, 0.1],
      range: ['#f2f0f7', '#dadaeb', '#bcbddc', '#9e9ac8', '#756bb1', '#54278f'],
    });

    expect(() => shallow(<LegendQuantile scale={quantileScale} />)).not.toThrow();
    expect(() => shallow(<Legend scale={quantileScale} />)).not.toThrow();
  });
});
