import { scaleQuantize } from '../src';

describe('scaleQuantize', () => {
  test('it should be defined', () => {
    expect(scaleQuantize).toBeDefined();
  });

  test('range param should set scale range', () => {
    const range = [2, 3];
    const scale = scaleQuantize({ range });
    expect(scale.range()).toEqual(range);
  });

  test('domain param should set scale domain', () => {
    const domain = [0, 350] as [number, number];
    const scale = scaleQuantize({ domain });
    expect(scale.domain()).toEqual(domain);
  });
});
