import { vi } from 'vitest';
import { scaleLinear } from '../src';

describe('scaleLinear()', () => {
  it('should be defined', () => {
    expect(scaleLinear).toBeDefined();
  });
  it('set domain', () => {
    const domain = [1, 2];
    expect(scaleLinear({ domain: [1, 2] }).domain()).toEqual(domain);
  });
  it('set range', () => {
    const range = [1, 2];
    expect(scaleLinear({ range: [1, 2] }).range()).toEqual(range);
  });
  it('set reverse', () => {
    expect(scaleLinear({ reverse: true }).range()).toEqual([1, 0]);
    expect(scaleLinear({ range: [1, 2], reverse: true }).range()).toEqual([2, 1]);
  });
  describe('set clamp', () => {
    it('true', () => {
      const scale = scaleLinear({ clamp: true });
      expect(scale(10)).toBe(1);
    });
    it('false', () => {
      const scale = scaleLinear({ clamp: false });
      expect(scale(10)).toBe(10);
    });
  });
  describe('set (color) interpolate', () => {
    it('string', () => {
      const scale = scaleLinear({
        domain: [0, 10],
        range: ['#ff0000', '#000000'],
        interpolate: 'lab',
      });
      expect(scale(5)).toBe('rgb(122, 27, 11)');
    });
    it('config object', () => {
      const scale = scaleLinear({
        domain: [0, 10],
        range: ['#ff0000', '#000000'],
        interpolate: {
          type: 'rgb',
        },
      });
      expect(scale(5)).toBe('rgb(128, 0, 0)');
    });
    it('config object with gamma', () => {
      const scale = scaleLinear({
        domain: [0, 10],
        range: ['#ff0000', '#000000'],
        interpolate: {
          type: 'rgb',
          gamma: 0.9,
        },
      });
      expect(scale(5)).toBe('rgb(118, 0, 0)');
    });
  });
  describe('set nice', () => {
    it('true', () => {
      const scale = scaleLinear({ domain: [0.1, 0.91], nice: true });
      expect(scale.domain()).toEqual([0.1, 1]);
    });
    it('false', () => {
      const scale = scaleLinear({ domain: [0.1, 0.91], nice: false });
      expect(scale.domain()).toEqual([0.1, 0.91]);
    });
  });
  describe('set round', () => {
    it('true', () => {
      const scale = scaleLinear({ domain: [0, 10], range: [0, 10], round: true });
      expect(scale(2.2)).toBe(2);
      expect(scale(2.6)).toBe(3);
    });
    it('false', () => {
      const scale = scaleLinear({ domain: [0, 10], range: [0, 10], round: false });
      expect(scale(2.2)).toBe(2.2);
      expect(scale(2.6)).toBe(2.6);
    });
    it('warns if do both interpolate and round', () => {
      const warnSpy = vi.spyOn(console, 'warn').mockImplementation(() => {});
      scaleLinear({
        domain: [0, 10],
        range: [0, 10],
        interpolate: 'hsl',
        round: true,
      });
      expect(warnSpy).toHaveBeenCalledTimes(1);
      warnSpy.mockRestore();
    });
  });
  describe('set zero', () => {
    it('true', () => {
      expect(scaleLinear({ domain: [1, 2], zero: true }).domain()).toEqual([0, 2]);
      expect(scaleLinear({ domain: [-2, -1], zero: true }).domain()).toEqual([-2, 0]);
      expect(scaleLinear({ domain: [1, -2], zero: true }).domain()).toEqual([1, -2]);
      expect(scaleLinear({ domain: [-2, 3], zero: true }).domain()).toEqual([-2, 3]);
    });
    it('false', () => {
      expect(scaleLinear({ domain: [1, 2], zero: false }).domain()).toEqual([1, 2]);
      expect(scaleLinear({ domain: [-2, -1], zero: false }).domain()).toEqual([-2, -1]);
      expect(scaleLinear({ domain: [-2, 3], zero: false }).domain()).toEqual([-2, 3]);
    });
  });
});
