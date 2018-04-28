import { scaleQuantile } from '../src';

describe('scaleQuantile', () => {
  test('it should be defined', () => {
    expect(scaleQuantile).toBeDefined();
  });

  test('range param should set scale range', () => {
    const range = [2, 3];
    const scale = scaleQuantile({ range });
    expect(scale.range()).toEqual(range);
  });

  test('domain param should set scale domain', () => {
    const domain = [0, 350];
    const scale = scaleQuantile({ domain });
    expect(scale.domain()).toEqual(domain);
  });
});
