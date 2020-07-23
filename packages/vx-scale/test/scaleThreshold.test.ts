import { scaleThreshold } from '../src';

describe('scaleThreshold', () => {
  it('should be defined', () => {
    expect(scaleThreshold).toBeDefined();
  });
  it('set domain', () => {
    const domain = [0, 350];
    const scale = scaleThreshold({ domain });
    expect(scale.domain()).toEqual(domain);
  });
  it('set range', () => {
    const range = [2, 3];
    const scale = scaleThreshold({ range });
    expect(scale.range()).toEqual(range);
  });
});
