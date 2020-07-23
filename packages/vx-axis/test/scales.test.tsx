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
} from '@vx/scale';
import { Axis } from '../src';
import { GenericScale } from '../src/types';

const axisProps = {
  orientation: 'left' as const,
  label: 'test axis',
};

function setup<ScaleInput>(scale: GenericScale<ScaleInput>) {
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
        }) as GenericScale<string>,
      ),
    ).not.toThrow();
  });

  it('should render with scaleLinear', () => {
    expect(
      setup(
        scaleLinear<number>({
          range: [10, 0],
          round: true,
          domain: [0, 10],
        }) as GenericScale<number>,
      ),
    ).not.toThrow();
  });

  it('should render with scaleLog', () => {
    expect(
      setup(
        scaleLog<number>({
          range: [10, 0],
          round: true,
          domain: [1, 10, 100, 1000],
        }) as GenericScale<number>,
      ),
    ).not.toThrow();
  });

  it('should render with scaleOrdinal', () => {
    expect(
      setup(
        scaleOrdinal({
          range: [0, 10],
          domain: ['a', 'b', 'c'],
        }) as GenericScale<string>,
      ),
    ).not.toThrow();
  });

  it('should render with scalePoint', () => {
    expect(
      setup(
        scalePoint<string>({
          range: [0, 10],
          round: true,
          domain: ['a', 'b', 'c'],
        }) as GenericScale<string>,
      ),
    ).not.toThrow();
  });

  it('should render with scalePower', () => {
    expect(
      setup(
        scalePower<number>({
          range: [1, 2, 3, 4, 5],
          domain: [1, 10, 100, 1000, 10000],
        }) as GenericScale<number>,
      ),
    ).not.toThrow();
  });

  it('should render with scaleQuantile', () => {
    expect(
      setup(
        scaleQuantile<number>({
          range: [0, 2, 4, 6, 8, 10],
          domain: [1, 10, 100, 1000, 10000],
        }) as GenericScale<number>,
      ),
    ).not.toThrow();
  });

  it('should render with scaleQuantize', () => {
    expect(
      setup(
        scaleQuantize<number>({
          range: [1, 10],
          domain: [1, 10],
        }) as GenericScale<number>,
      ),
    ).not.toThrow();
  });

  it('should render with scaleSymlog', () => {
    expect(
      setup(
        scaleSymlog({
          range: [1, 10],
          domain: [1, 10],
        }) as GenericScale<number>,
      ),
    ).not.toThrow();
  });

  it('should render with scaleThreshold', () => {
    expect(
      setup(
        scaleThreshold({
          range: [1, 10],
          domain: [1, 10],
        }) as GenericScale<number>,
      ),
    ).not.toThrow();
  });

  it('should render with scaleTime', () => {
    expect(
      setup(
        scaleTime<number>({
          range: [1, 10],
          domain: [new Date('2020-01-01'), new Date('2020-01-05')],
        }) as GenericScale<Date>,
      ),
    ).not.toThrow();
  });

  it('should render with scaleUtc', () => {
    expect(
      setup(
        scaleUtc<number>({
          range: [1, 10],
          domain: [new Date('2020-01-01'), new Date('2020-01-05')],
        }) as GenericScale<Date>,
      ),
    ).not.toThrow();
  });
});
