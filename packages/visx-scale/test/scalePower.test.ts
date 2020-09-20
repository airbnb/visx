import { scalePower } from '../src';

describe('scalePower()', () => {
  it('should be defined', () => {
    expect(scalePower).toBeDefined();
  });
  it('set domain', () => {
    const domain = [1, 2];
    expect(scalePower({ domain: [1, 2] }).domain()).toEqual(domain);
  });
  it('set range', () => {
    const range = [1, 2];
    expect(scalePower({ range: [1, 2] }).range()).toEqual(range);
  });
  it('set exponent', () => {
    expect(scalePower({ exponent: 3 }).exponent()).toEqual(3);
  });
  describe('set clamp', () => {
    it('true', () => {
      const scale = scalePower({ clamp: true });
      expect(scale(10)).toEqual(1);
    });
    it('false', () => {
      const scale = scalePower({ clamp: false });
      expect(scale(10)).toEqual(10);
    });
  });
  it('set (color) interpolate', () => {
    const scale = scalePower({
      domain: [0, 10],
      range: ['#ff0000', '#000000'],
      interpolate: 'lab',
    });
    expect(scale(5)).toEqual('rgb(122, 27, 11)');
  });
  describe('set nice', () => {
    it('true', () => {
      const scale = scalePower({ domain: [0.1, 0.91], nice: true });
      expect(scale.domain()).toEqual([0.1, 1]);
    });
    it('false', () => {
      const scale = scalePower({ domain: [0.1, 0.91], nice: false });
      expect(scale.domain()).toEqual([0.1, 0.91]);
    });
  });
  describe('set round', () => {
    it('true', () => {
      const scale = scalePower({ domain: [0, 10], range: [0, 10], round: true });
      expect(scale(2.2)).toEqual(2);
      expect(scale(2.6)).toEqual(3);
    });
    it('false', () => {
      const scale = scalePower({ domain: [0, 10], range: [0, 10], round: false });
      expect(scale(2.2)).toEqual(2.2);
      expect(scale(2.6)).toEqual(2.6);
    });
  });
  describe('set zero', () => {
    it('true', () => {
      expect(scalePower({ domain: [1, 2], zero: true }).domain()).toEqual([0, 2]);
      expect(scalePower({ domain: [-2, -1], zero: true }).domain()).toEqual([-2, 0]);
      expect(scalePower({ domain: [-2, 3], zero: true }).domain()).toEqual([-2, 3]);
    });
    it('false', () => {
      expect(scalePower({ domain: [1, 2], zero: false }).domain()).toEqual([1, 2]);
      expect(scalePower({ domain: [-2, -1], zero: false }).domain()).toEqual([-2, -1]);
      expect(scalePower({ domain: [-2, 3], zero: false }).domain()).toEqual([-2, 3]);
    });
  });
});
