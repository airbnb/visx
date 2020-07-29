import React from 'react';
import { shallow } from 'enzyme';
import {
  scaleBand,
  scaleLinear,
  scaleLog,
  scaleOrdinal,
  scalePoint,
  scalePower,
  scaleQuantile,
  scaleQuantize,
  scaleSymlog,
  scaleThreshold,
  scaleTime,
  scaleUtc,
  D3Scale,
  StringLike,
  DefaultThresholdInput,
} from '@vx/scale';
import { Axis } from '../src';
import { AxisScaleOutput, AxisScale } from '../src/types';

const axisProps = {
  orientation: 'left' as const,
  label: 'test axis',
};

function setup<Scale extends AxisScale>(scale: Scale) {
  return () => shallow(<Axis {...axisProps} scale={scale} />);
}

describe('Axis scales', () => {
  it('should render with scaleBand', () => {
    expect(
      setup(
        scaleBand({
          range: [10, 0],
          round: true,
          domain: ['a', 'b', 'c'],
        }),
      ),
    ).not.toThrow();
  });

  it('should render with scaleLinear', () => {
    expect(
      setup(
        scaleLinear({
          range: [10, 0],
          round: true,
          domain: [0, 10],
        }),
      ),
    ).not.toThrow();
  });

  it('should render with scaleLog', () => {
    expect(
      setup(
        scaleLog({
          range: [10, 0],
          round: true,
          domain: [1, 10, 100, 1000],
        }),
      ),
    ).not.toThrow();
  });

  it('should render with scaleOrdinal', () => {
    expect(
      setup(
        scaleOrdinal({
          range: [0, 10],
          domain: ['a', 'b', 'c'],
        }),
      ),
    ).not.toThrow();
  });

  it('should render with scalePoint', () => {
    expect(
      setup(
        scalePoint({
          range: [0, 10],
          round: true,
          domain: ['a', 'b', 'c'],
        }),
      ),
    ).not.toThrow();
  });

  it('should render with scalePower', () => {
    expect(
      setup(
        scalePower({
          range: [1, 2, 3, 4, 5],
          domain: [1, 10, 100, 1000, 10000],
        }),
      ),
    ).not.toThrow();
  });

  it('should render with scaleQuantile', () => {
    expect(
      setup(
        scaleQuantile({
          range: [0, 2, 4, 6, 8, 10],
          domain: [1, 10, 100, 1000, 10000],
        }),
      ),
    ).not.toThrow();
  });

  it('should render with scaleQuantize', () => {
    expect(
      setup(
        scaleQuantize({
          range: [1, 10],
          domain: [1, 10],
        }),
      ),
    ).not.toThrow();
  });

  it('should render with scaleSymlog', () => {
    expect(
      setup(
        scaleSymlog({
          range: [1, 10],
          domain: [1, 10],
        }),
      ),
    ).not.toThrow();
  });

  it('should render with scaleThreshold', () => {
    expect(
      setup(
        scaleThreshold({
          range: [1, 10],
          domain: [1, 10],
        }),
      ),
    ).not.toThrow();
  });

  it('should render with scaleTime', () => {
    expect(
      setup(
        scaleTime({
          range: [1, 10],
          domain: [new Date('2020-01-01'), new Date('2020-01-05')],
        }),
      ),
    ).not.toThrow();
  });

  it('should render with scaleUtc', () => {
    expect(
      setup(
        scaleUtc({
          range: [1, 10],
          domain: [new Date('2020-01-01'), new Date('2020-01-05')],
        }),
      ),
    ).not.toThrow();
  });
});
