import { scaleSqrt } from '../src';

describe('scaleSqrt', () => {
  test('it should be defined', () => {
    expect(scaleSqrt).toBeDefined();
  });

  test('exponent param should be 0.5', () => {
    const scale = scaleSqrt({});
    expect(scale.exponent()).toEqual(0.5);
  });

  test('range param should set scale range', () => {
    const range = [2, 3];
    const scale = scaleSqrt({ range });
    expect(scale.range()).toEqual(range);
  });

  test('domain param should set scasle domain', () => {
    const domain = [0, 350];
    const scale = scaleSqrt({ domain });
    expect(scale.domain()).toEqual(domain);
  });
});
