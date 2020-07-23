import { createScale } from '../src';

describe('createScale()', () => {
  it('linear', () => {
    const scale = createScale({ type: 'linear', domain: [0, 10], range: [2, 4] });
    expect(scale(5)).toEqual(3);
  });
  it('log', () => {
    const scale = createScale<number>({ type: 'log', base: 2, domain: [2, 8], range: [1, 3] });
    expect(scale(4)?.toFixed(2)).toEqual('2.00');
  });
  it('pow', () => {
    const scale = createScale({ type: 'pow', exponent: 2, domain: [1, 3], range: [2, 18] });
    expect(scale(2)).toEqual('2.00');
  });
});
