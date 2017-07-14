import { scaleThreshold } from '../src';

describe('scaleThreshold', () => {
  test('it should be defined', () => {
    expect(scaleThreshold).toBeDefined();
  });

  test('range param should set scale range', () => {
    const range = [2, 3];
    const scale = scaleThreshold({ range });
    expect(scale.range()).toEqual(range);
  });

  test('domain param should set scale domain', () => {
    const domain = [0, 350];
    const scale = scaleThreshold({ domain });
    expect(scale.domain()).toEqual(domain);
  });
});
