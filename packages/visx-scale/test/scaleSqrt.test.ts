import { scaleSqrt } from '../src';

describe('scaleSqrt()', () => {
  it('should be defined', () => {
    expect(scaleSqrt).toBeDefined();
  });
  it('set domain', () => {
    const domain = [1, 2];
    expect(scaleSqrt({ domain: [1, 2] }).domain()).toEqual(domain);
  });
  it('set range', () => {
    const range = [1, 2];
    expect(scaleSqrt({ range: [1, 2] }).range()).toEqual(range);
  });
  it('exponent is 0.5', () => {
    expect(scaleSqrt({}).exponent()).toEqual(0.5);
  });
  describe('set clamp', () => {
    it('true', () => {
      const scale = scaleSqrt({ clamp: true });
      expect(scale(10)).toEqual(1);
    });
    it('false', () => {
      const scale = scaleSqrt<number>({ clamp: false });
      expect(scale(10)?.toFixed(2)).toEqual('3.16');
    });
  });
  it('set (color) interpolate', () => {
    const scale = scaleSqrt({
      domain: [0, 10],
      range: ['#ff0000', '#000000'],
      interpolate: 'lab',
    });
    expect(scale(5)).toEqual('rgb(73, 23, 9)');
  });
  describe('set nice', () => {
    it('true', () => {
      const scale = scaleSqrt({ domain: [0.1, 0.91], nice: true });
      expect(scale.domain()).toEqual([0.1, 1]);
    });
    it('false', () => {
      const scale = scaleSqrt({ domain: [0.1, 0.91], nice: false });
      expect(scale.domain()).toEqual([0.1, 0.91]);
    });
  });
  describe('set round', () => {
    it('true', () => {
      const scale = scaleSqrt({ domain: [0, 4], range: [0, 2], round: true });
      expect(scale(3)).toEqual(2);
    });
    it('false', () => {
      const scale = scaleSqrt({ domain: [0, 4], range: [0, 2], round: false });
      expect(scale(3)?.toFixed(2)).toEqual('1.73');
    });
  });
  describe('set zero', () => {
    it('true', () => {
      expect(scaleSqrt({ domain: [1, 2], zero: true }).domain()).toEqual([0, 2]);
      expect(scaleSqrt({ domain: [-2, -1], zero: true }).domain()).toEqual([-2, 0]);
      expect(scaleSqrt({ domain: [-2, 3], zero: true }).domain()).toEqual([-2, 3]);
    });
    it('false', () => {
      expect(scaleSqrt({ domain: [1, 2], zero: false }).domain()).toEqual([1, 2]);
      expect(scaleSqrt({ domain: [-2, -1], zero: false }).domain()).toEqual([-2, -1]);
      expect(scaleSqrt({ domain: [-2, 3], zero: false }).domain()).toEqual([-2, 3]);
    });
  });
});
