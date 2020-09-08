import { scaleQuantile } from '../src';

describe('scaleQuantile', () => {
  it('should be defined', () => {
    expect(scaleQuantile).toBeDefined();
  });
  it('set domain', () => {
    const domain = [0, 350];
    const scale = scaleQuantile({ domain });
    expect(scale.domain()).toEqual(domain);
  });
  it('set range', () => {
    const range = [2, 3];
    const scale = scaleQuantile({ range });
    expect(scale.range()).toEqual(range);
  });
});
