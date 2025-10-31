import { createScale } from '../src';

describe('createScale()', () => {
  it('linear', () => {
    const scale = createScale({ type: 'linear', domain: [0, 10], range: [2, 4] });
    expect(scale(5)).toBe(3);
  });
  it('fallbacks to linear if type is not defined', () => {
    const scale = createScale({ domain: [0, 10], range: [2, 4] });
    expect(scale(5)).toBe(3);
  });
  it('log', () => {
    const scale = createScale({
      type: 'log',
      base: 2,
      domain: [2, 8],
      range: [1, 3],
    });
    expect(scale(4)?.toFixed(2)).toBe('2.00');
  });
  it('pow', () => {
    const scale = createScale({ type: 'pow', exponent: 2, domain: [1, 3], range: [2, 18] });
    expect(scale(2)).toBe(8);
  });
  it('sqrt', () => {
    const scale = createScale({ type: 'sqrt', domain: [1, 9], range: [1, 3] });
    expect(scale(4)).toBe(2);
  });
  it('symlog', () => {
    const scale = createScale({ type: 'symlog', domain: [1, 9], range: [1, 3], constant: 2 });
    expect(scale(4)?.toFixed(2)).toBe('2.07');
  });
  it('time', () => {
    const scale = createScale({
      type: 'time',
      domain: [new Date(2020, 0, 1), new Date(2020, 0, 10)],
      range: [1, 10],
    });
    expect(scale(new Date(2020, 0, 4))).toBe(4);
  });
  it('utc', () => {
    const scale = createScale({
      type: 'utc',
      domain: [new Date(Date.UTC(2020, 0, 1)), new Date(Date.UTC(2020, 0, 10))],
      range: [1, 10],
    });
    expect(scale(new Date(Date.UTC(2020, 0, 4)))).toBe(4);
  });
  it('quantile', () => {
    const scale = createScale({ type: 'quantile', domain: [1, 3, 5, 7], range: [0, 10] });
    expect(scale(2)).toBe(0);
  });
  it('quantize', () => {
    const scale = createScale({ type: 'quantize', domain: [1, 10], range: ['red', 'green'] });
    expect(scale(2)).toBe('red');
    expect(scale(6)).toBe('green');
  });
  it('threshold', () => {
    const scale = createScale({
      type: 'threshold',
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
    const scale = createScale({ type: 'ordinal', domain: ['pig', 'cat'], range: ['red', 'green'] });
    expect(scale('pig')).toBe('red');
    expect(scale('cat')).toBe('green');
  });
  it('point', () => {
    const scale = createScale({
      type: 'point',
      domain: ['a', 'b', 'c'],
      range: [1.1, 3.5],
      round: true,
    });
    expect(scale('a')).toBe(1);
    expect(scale('b')).toBe(2);
    expect(scale('c')).toBe(3);
  });
  it('band', () => {
    const scale = createScale({
      type: 'band',
      domain: ['a', 'b', 'c'],
      range: [1.1, 3.5],
      round: false,
    });
    expect(scale('a')).toBe(1.1);
    expect(scale('b')).toBe(1.9);
    expect(scale('c')).toBe(2.7);
  });
  it('radial', () => {
    const scale = createScale({
      type: 'radial',
      domain: [0, 100],
      range: [0, Math.PI],
    });
    expect(scale(50)).toBeCloseTo(Math.PI / Math.sqrt(2));
  });
  it('invalid type', () => {
    // @ts-expect-error
    expect(createScale({ type: 'invalid' })).toBeDefined();
  });
});
