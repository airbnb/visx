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
} from '@visx/scale';
import { Axis } from '../src';

const axisProps = {
  orientation: 'left' as const,
  label: 'test axis',
};

describe('Axis scales', () => {
  it('should render with scaleBand', () => {
    expect(() =>
      shallow(
        <Axis
          {...axisProps}
          scale={scaleBand({
            range: [10, 0],
            round: true,
            domain: ['a', 'b', 'c'],
          })}
        />,
      ),
    ).not.toThrow();
  });

  it('should render with scaleLinear', () => {
    expect(() =>
      shallow(
        <Axis
          {...axisProps}
          scale={scaleLinear({
            range: [10, 0],
            round: true,
            domain: [0, 10],
          })}
        />,
      ),
    ).not.toThrow();
  });

  it('should render with scaleLog', () => {
    expect(() =>
      shallow(
        <Axis
          {...axisProps}
          scale={scaleLog({
            range: [10, 0],
            round: true,
            domain: [1, 10, 100, 1000],
          })}
        />,
      ),
    ).not.toThrow();
  });

  it('should render with scaleOrdinal', () => {
    expect(() =>
      shallow(
        <Axis
          {...axisProps}
          scale={scaleOrdinal({
            range: [0, 10],
            domain: ['a', 'b', 'c'],
          })}
        />,
      ),
    ).not.toThrow();
  });

  it('should render with scalePoint', () => {
    expect(() =>
      shallow(
        <Axis
          {...axisProps}
          scale={scalePoint({
            range: [0, 10],
            round: true,
            domain: ['a', 'b', 'c'],
          })}
        />,
      ),
    ).not.toThrow();
  });

  it('should render with scalePower', () => {
    expect(() =>
      shallow(
        <Axis
          {...axisProps}
          scale={scalePower({
            range: [1, 2, 3, 4, 5],
            domain: [1, 10, 100, 1000, 10000],
          })}
        />,
      ),
    ).not.toThrow();
  });

  it('should render with scaleQuantile', () => {
    expect(() =>
      shallow(
        <Axis
          {...axisProps}
          scale={scaleQuantile({
            range: [0, 2, 4, 6, 8, 10],
            domain: [1, 10, 100, 1000, 10000],
          })}
        />,
      ),
    ).not.toThrow();
  });

  it('should render with scaleQuantize', () => {
    expect(() =>
      shallow(
        <Axis
          {...axisProps}
          scale={scaleQuantize({
            range: [1, 10],
            domain: [1, 10],
          })}
        />,
      ),
    ).not.toThrow();
  });

  it('should render with scaleSymlog', () => {
    expect(() =>
      shallow(
        <Axis
          {...axisProps}
          scale={scaleSymlog({
            range: [1, 10],
            domain: [1, 10],
          })}
        />,
      ),
    ).not.toThrow();
  });

  it('should render with scaleThreshold', () => {
    expect(() =>
      shallow(
        <Axis
          {...axisProps}
          scale={scaleThreshold({
            range: [1, 10],
            domain: [1, 10],
          })}
        />,
      ),
    ).not.toThrow();
  });

  it('should render with scaleTime', () => {
    expect(() =>
      shallow(
        <Axis
          {...axisProps}
          scale={scaleTime({
            range: [1, 10],
            domain: [new Date('2020-01-01'), new Date('2020-01-05')],
          })}
        />,
      ),
    ).not.toThrow();
  });

  it('should render with scaleUtc', () => {
    expect(() =>
      shallow(
        <Axis
          {...axisProps}
          scale={scaleUtc({
            range: [1, 10],
            domain: [new Date('2020-01-01'), new Date('2020-01-05')],
          })}
        />,
      ),
    ).not.toThrow();
  });
});
