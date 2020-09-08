import { scaleQuantize } from '../src';

describe('scaleQuantize', () => {
  it('should be defined', () => {
    expect(scaleQuantize).toBeDefined();
  });
  it('set domain', () => {
    const domain = [1, 2];
    expect(scaleQuantize({ domain: [1, 2] }).domain()).toEqual(domain);
  });
  it('set range', () => {
    const range = [1, 2];
    expect(scaleQuantize({ range: [1, 2] }).range()).toEqual(range);
  });
  describe('set nice', () => {
    it('true', () => {
      const scale = scaleQuantize({ domain: [0.1, 0.91], nice: true });
      expect(scale.domain()).toEqual([0.1, 1]);
    });
    it('false', () => {
      const scale = scaleQuantize({ domain: [0.1, 0.91], nice: false });
      expect(scale.domain()).toEqual([0.1, 0.91]);
    });
  });
  describe('set zero', () => {
    it('true', () => {
      expect(scaleQuantize({ domain: [1, 2], zero: true }).domain()).toEqual([0, 2]);
      expect(scaleQuantize({ domain: [-2, -1], zero: true }).domain()).toEqual([-2, 0]);
      expect(scaleQuantize({ domain: [-2, 3], zero: true }).domain()).toEqual([-2, 3]);
    });
    it('false', () => {
      expect(scaleQuantize({ domain: [1, 2], zero: false }).domain()).toEqual([1, 2]);
      expect(scaleQuantize({ domain: [-2, -1], zero: false }).domain()).toEqual([-2, -1]);
      expect(scaleQuantize({ domain: [-2, 3], zero: false }).domain()).toEqual([-2, 3]);
    });
  });
});
