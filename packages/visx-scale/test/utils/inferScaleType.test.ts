import {
  scaleLinear,
  scaleLog,
  scalePow,
  scaleSqrt,
  scaleSymlog,
  scaleRadial,
  scaleTime,
  scaleUtc,
  scaleQuantile,
  scaleQuantize,
  scaleThreshold,
  scaleOrdinal,
  scalePoint,
  scaleBand,
} from '@visx/vendor/d3-scale';
import TimezoneMock from 'timezone-mock';
import inferScaleType from '../../src/utils/inferScaleType';

describe('inferScaleType(scale)', () => {
  it('linear scale', () => {
    expect(inferScaleType(scaleLinear())).toBe('linear');
  });
  it('log scale', () => {
    expect(inferScaleType(scaleLog())).toBe('log');
  });
  it('pow scale', () => {
    expect(inferScaleType(scalePow())).toBe('pow');
  });
  it('sqrt scale', () => {
    expect(inferScaleType(scaleSqrt())).toBe('sqrt');
  });
  it('symlog scale', () => {
    expect(inferScaleType(scaleSymlog())).toBe('symlog');
  });
  it('radial scale', () => {
    expect(inferScaleType(scaleRadial())).toBe('radial');
  });
  describe('time scale', () => {
    it('returns time when local time is not UTC', () => {
      TimezoneMock.register('US/Pacific');
      expect(inferScaleType(scaleTime())).toBe('time');
      TimezoneMock.unregister();
    });
    it('returns utc when local time is UTC', () => {
      TimezoneMock.register('UTC');
      expect(inferScaleType(scaleTime())).toBe('utc');
      TimezoneMock.unregister();
    });
  });
  it('utc scale', () => {
    expect(inferScaleType(scaleUtc())).toBe('utc');
  });
  it('quantile scale', () => {
    expect(inferScaleType(scaleQuantile())).toBe('quantile');
  });
  it('quantize scale', () => {
    expect(inferScaleType(scaleQuantize())).toBe('quantize');
  });
  it('threshold scale', () => {
    expect(inferScaleType(scaleThreshold())).toBe('threshold');
  });
  it('ordinal scale', () => {
    expect(inferScaleType(scaleOrdinal<string>())).toBe('ordinal');
  });
  it('point scale', () => {
    expect(inferScaleType(scalePoint())).toBe('point');
  });
  it('band scale', () => {
    expect(inferScaleType(scaleBand())).toBe('band');
  });
});
