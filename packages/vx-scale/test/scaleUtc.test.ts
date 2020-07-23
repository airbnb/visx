import { scaleTime } from '../src';

describe('scaleTime()', () => {
  const domain = [new Date(Date.UTC(2020, 0, 1)), new Date(Date.UTC(2020, 0, 10))];

  it('should be defined', () => {
    expect(scaleTime).toBeDefined();
  });
  it('set domain', () => {
    expect(scaleTime({ domain }).domain()).toEqual(domain);
  });
  it('set range', () => {
    const range = [1, 2];
    expect(scaleTime({ range: [1, 2] }).range()).toEqual(range);
  });
  describe('set clamp', () => {
    it('true', () => {
      const scale = scaleTime({ domain, range: [0, 10], clamp: true });
      expect(scale(new Date(Date.UTC(2019, 11, 31)))).toEqual(0);
    });
    it('false', () => {
      const scale = scaleTime({ domain, range: [0, 10], clamp: false });
      expect(scale(new Date(Date.UTC(2019, 11, 31))).toFixed(2)).toEqual('-1.11');
    });
  });
  it('set (color) interpolate', () => {
    const scale = scaleTime({
      domain,
      range: ['#ff0000', '#000000'],
      interpolate: 'lab',
    });
    expect(scale(new Date(Date.UTC(2020, 0, 5)))).toEqual('rgb(136, 28, 11)');
  });
  describe('set nice', () => {
    const unniceDomain = [new Date(Date.UTC(2020, 0, 1)), new Date(Date.UTC(2020, 0, 9, 20))];
    it('true', () => {
      const scale = scaleTime({
        domain: unniceDomain,
        nice: true,
      });
      expect(scale.domain()).toEqual(domain);
    });
    it('false', () => {
      const scale = scaleTime({ domain: unniceDomain, nice: false });
      expect(scale.domain()).toEqual(unniceDomain);
    });
  });
  describe('set round', () => {
    it('true', () => {
      const scale = scaleTime({
        domain,
        range: [1, 5],
        round: true,
      });
      expect(scale(new Date(Date.UTC(2020, 0, 5)))).toEqual(3);
    });
    it('false', () => {
      const scale = scaleTime({
        domain,
        range: [1, 5],
        round: false,
      });
      expect(scale(new Date(Date.UTC(2020, 0, 5))).toFixed(2)).toEqual('2.78');
    });
  });
});
