import { createScale } from '@visx/scale';
import { getDomainFromExtent, scaleInvert } from '../src/utils';

describe('getDomainFromExtent()', () => {
  test('it should return { start, end } if scale.invert', () => {
    const scale = createScale({ domain: [0, 10], range: [2, 4] });
    const start = 0;
    const end = 1;
    const tolerentDelta = 0.5;
    const result = getDomainFromExtent(scale, start, end, tolerentDelta);
    expect(result.start).toBeDefined();
    expect(result.end).toBeDefined();
    expect(result.start).toEqual(scale.invert(start - tolerentDelta));
    expect(result.end).toEqual(scale.invert(end + tolerentDelta));
  });

  test('it should handle start > end', () => {
    const scale = createScale({ domain: [0, 10], range: [2, 4] });
    const start = 1;
    const end = 0;
    const tolerentDelta = 0.5;
    const result = getDomainFromExtent(scale, start, end, tolerentDelta);
    expect(result.start).toEqual(scale.invert(end - tolerentDelta));
    expect(result.end).toEqual(scale.invert(start + tolerentDelta));
  });

  test('it should return { values } for band scales', () => {
    const scale = createScale({
      type: 'band',
      domain: ['a', 'b', 'c'],
      range: [1.1, 3.5],
      round: false,
    });
    const domain = scale.domain();
    const start = 0;
    const end = 1;
    const tolerentDelta = 0.5;
    const result = getDomainFromExtent(scale, start, end, tolerentDelta);
    expect(result.values).toBeDefined();
    expect(result.values).toEqual([domain[0]]);
  });
});

describe('scaleInvert()', () => {
  test('it should return scale.invert(value) if scale.invert', () => {
    const scale = createScale({ domain: [0, 10], range: [2, 4] });
    const value = 3;
    const result = scaleInvert(scale, value);
    expect(result).toEqual(scale.invert(value));
  });

  test('it should return the index of domain item for scales without invert (like band)', () => {
    const scale = createScale({
      type: 'band',
      domain: ['a', 'b', 'c'],
      range: [1.1, 3.5],
      round: false,
    });
    const value = 3;
    const result = scaleInvert(scale, value);
    expect(result).toEqual(2);
  });

  test('it should handle band scales where end < start', () => {
    const scale = createScale({
      type: 'band',
      domain: ['a', 'b', 'c'],
      range: [20, 1],
      round: false,
    });
    const value = 3;
    const result = scaleInvert(scale, value);
    expect(result).toEqual(2);
  });
});
