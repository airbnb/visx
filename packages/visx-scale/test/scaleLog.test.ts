import { scaleLog } from '../src';

describe('scaleLog()', () => {
  it('should be defined', () => {
    expect(scaleLog).toBeDefined();
  });
  it('set domain', () => {
    const domain = [1, 2];
    expect(scaleLog({ domain: [1, 2] }).domain()).toEqual(domain);
  });
  it('set range', () => {
    const range = [1, 2];
    expect(scaleLog({ range: [1, 2] }).range()).toEqual(range);
  });
  it('set base', () => {
    expect(scaleLog({ base: 2 }).base()).toBe(2);
  });
  describe('set clamp', () => {
    it('true', () => {
      const scale = scaleLog({ range: [1, 2], clamp: true });
      expect(scale(100)).toBe(2);
    });
    it('false', () => {
      const scale = scaleLog({ range: [1, 2], clamp: false });
      expect(scale(100)).toBe(3);
    });
  });
  it('set (color) interpolate', () => {
    const scale = scaleLog({
      domain: [1, 100],
      range: ['#ff0000', '#000000'],
      interpolate: 'lab',
    });
    expect(scale(10)).toBe('rgb(122, 27, 11)');
  });
  describe('set nice', () => {
    it('true', () => {
      const scale = scaleLog({ domain: [0.1, 0.91], nice: true });
      expect(scale.domain()).toEqual([0.1, 1]);
    });
    it('false', () => {
      const scale = scaleLog({ domain: [0.1, 0.91], nice: false });
      expect(scale.domain()).toEqual([0.1, 0.91]);
    });
  });
  describe('set round', () => {
    it('true', () => {
      const scale = scaleLog({ domain: [1, 10], range: [1, 10], round: true });
      expect(scale(2.2)).toBe(4);
    });
    it('false', () => {
      const scale = scaleLog({ domain: [1, 10], range: [1, 10], round: false });
      expect(scale(5)?.toFixed(2)).toBe('7.29');
    });
  });
});
