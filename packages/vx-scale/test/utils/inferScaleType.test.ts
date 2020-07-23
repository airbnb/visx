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
import inferScaleType from '../../src/utils/inferScaleType';
import { isLocalTimeInUtc } from '../../src/utils/isUtcScale';

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
  it('time scale', () => {
    expect(inferScaleType(scaleTime())).toEqual(isLocalTimeInUtc() ? 'utc' : 'time');
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
