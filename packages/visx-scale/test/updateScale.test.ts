import TimezoneMock from 'timezone-mock';
import {
  updateScale,
  scaleLinear,
  scaleLog,
  scalePower,
  scaleSqrt,
  scaleSymlog,
  scaleTime,
  scaleUtc,
  scaleQuantile,
  scaleOrdinal,
  scalePoint,
  scaleBand,
  scaleQuantize,
  scaleThreshold,
} from '../src';

describe('updateScale', () => {
  it('should be defined', () => {
    expect(updateScale).toBeDefined();
  });
  it('should return a new copy of the scale', () => {
    const scale = scaleLinear();
    const nextScale = updateScale(scale);
    expect(scale).not.toBe(nextScale);
  });
  it('linear', () => {
    const scale = updateScale(scaleLinear(), { domain: [0, 10], range: [2, 4] });
    expect(scale(5)).toBe(3);
  });
  it('log', () => {
    const scale = updateScale(scaleLog(), {
      base: 2,
      domain: [2, 8],
      range: [1, 3],
    });
    expect(scale(4)?.toFixed(2)).toBe('2.00');
  });
  it('pow', () => {
    const scale = updateScale(scalePower(), { exponent: 2, domain: [1, 3], range: [2, 18] });
    expect(scale(2)).toBe(8);
  });
  it('sqrt', () => {
    const scale = updateScale(scaleSqrt(), { domain: [1, 9], range: [1, 3] });
    expect(scale(4)).toBe(2);
  });
  it('symlog', () => {
    const scale = updateScale(scaleSymlog(), { domain: [1, 9], range: [1, 3], constant: 2 });
    expect(scale(4)?.toFixed(2)).toBe('2.07');
  });
  it('time', () => {
    TimezoneMock.register('US/Pacific');
    const scale = updateScale(scaleTime(), {
      domain: [new Date(2020, 0, 1), new Date(2020, 0, 10)],
      range: [1, 10],
    });
    expect(scale(new Date(2020, 0, 4))).toBe(4);
    TimezoneMock.unregister();
  });
  it('utc', () => {
    const scale = updateScale(scaleUtc(), {
      domain: [new Date(Date.UTC(2020, 0, 1)), new Date(Date.UTC(2020, 0, 10))],
      range: [1, 10],
    });
    expect(scale(new Date(Date.UTC(2020, 0, 4)))).toBe(4);
  });
  it('quantile', () => {
    const scale = updateScale(scaleQuantile(), { domain: [1, 3, 5, 7], range: [0, 10] });
    expect(scale(2)).toBe(0);
  });
  it('quantize', () => {
    const scale = updateScale(scaleQuantize(), { domain: [1, 10], range: ['red', 'green'] });
    expect(scale(2)).toBe('red');
    expect(scale(6)).toBe('green');
  });
  it('threshold', () => {
    const scale = updateScale(scaleThreshold(), {
      domain: [0, 1] as number[],
      range: ['red', 'white', 'green'],
    });
    expect(scale(-1)).toBe('red');
    expect(scale(0)).toBe('white');
    expect(scale(0.5)).toBe('white');
    expect(scale(1)).toBe('green');
    expect(scale(1000)).toBe('green');
  });
  it('ordinal', () => {
    const scale = updateScale<string | undefined, 'pig' | 'cat'>(
      scaleOrdinal<'pig' | 'cat', string | undefined>(),
      {
        domain: ['pig', 'cat'],
        range: ['red', 'green'],
      },
    );
    expect(scale('pig')).toBe('red');
    expect(scale('cat')).toBe('green');
  });
  it('point', () => {
    const scale = updateScale(scalePoint(), {
      domain: ['a', 'b', 'c'],
      range: [1.1, 3.5],
      round: true,
    });
    expect(scale('a')).toBe(1);
    expect(scale('b')).toBe(2);
    expect(scale('c')).toBe(3);
  });
  it('band', () => {
    const scale = updateScale(scaleBand(), {
      domain: ['a', 'b', 'c'],
      range: [1.1, 3.5],
      round: false,
    });
    expect(scale('a')).toBe(1.1);
    expect(scale('b')).toBe(1.9);
    expect(scale('c')).toBe(2.7);
  });
  it('invalid type', () => {
    // @ts-expect-error
    expect(updateScale(scaleLinear(), { type: 'invalid' })).toBeDefined();
  });
});
