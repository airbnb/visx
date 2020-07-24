import {
  scaleLinear,
  scaleLog,
  scalePow,
  scaleSqrt,
  scaleSymlog,
  scaleTime,
  scaleUtc,
  scaleQuantile,
  scaleQuantize,
  scaleThreshold,
  scaleOrdinal,
  scalePoint,
  scaleBand,
} from 'd3-scale';
import TimezoneMock from 'timezone-mock';
import inferScaleType from '../../src/utils/inferScaleType';

describe('inferScaleType(scale)', () => {
  it('linear scale', () => {
    expect(inferScaleType(scaleLinear())).toEqual('linear');
  });
  it('log scale', () => {
    expect(inferScaleType(scaleLog())).toEqual('log');
  });
  it('pow scale', () => {
    expect(inferScaleType(scalePow())).toEqual('pow');
  });
  it('sqrt scale', () => {
    expect(inferScaleType(scaleSqrt())).toEqual('sqrt');
  });
  it('symlog scale', () => {
    expect(inferScaleType(scaleSymlog())).toEqual('symlog');
  });
  describe('time scale', () => {
    it('returns time when local time is not UTC', () => {
      TimezoneMock.register('US/Pacific');
      expect(inferScaleType(scaleTime())).toEqual('time');
      TimezoneMock.unregister();
    });
    it('returns utc when local time is UTC', () => {
      TimezoneMock.register('UTC');
      expect(inferScaleType(scaleTime())).toEqual('utc');
      TimezoneMock.unregister();
    });
  });
  it('utc scale', () => {
    expect(inferScaleType(scaleUtc())).toEqual('utc');
  });
  it('quantile scale', () => {
    expect(inferScaleType(scaleQuantile())).toEqual('quantile');
  });
  it('quantize scale', () => {
    expect(inferScaleType(scaleQuantize())).toEqual('quantize');
  });
  it('threshold scale', () => {
    expect(inferScaleType(scaleThreshold())).toEqual('threshold');
  });
  it('ordinal scale', () => {
    expect(inferScaleType(scaleOrdinal<string>())).toEqual('ordinal');
  });
  it('point scale', () => {
    expect(inferScaleType(scalePoint())).toEqual('point');
  });
  it('band scale', () => {
    expect(inferScaleType(scaleBand())).toEqual('band');
  });
});
