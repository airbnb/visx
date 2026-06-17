import {
  getPaddedDomain,
  getPositiveDomain,
  getResponsiveWidth,
  getZeroBaselineDomain,
  isFiniteNumber,
} from '../src';

describe('chart helpers', () => {
  it('filters finite numbers', () => {
    expect([1, Number.NaN, Infinity, 2].filter(isFiniteNumber)).toEqual([1, 2]);
  });

  it('computes zero-baseline domains', () => {
    expect(getZeroBaselineDomain([4, 8])).toEqual([0, 8]);
    expect(getZeroBaselineDomain([-4, 8])).toEqual([-4, 8]);
    expect(getZeroBaselineDomain([5, Number.NaN])).toEqual([0, 5]);
    expect(getZeroBaselineDomain([])).toEqual([0, 1]);
    expect(getZeroBaselineDomain([0])).toEqual([-1, 1]);
  });

  it('computes positive domains', () => {
    expect(getPositiveDomain([4, 8])).toEqual([0, 8]);
    expect(getPositiveDomain([-4, 0])).toEqual([0, 1]);
    expect(getPositiveDomain([])).toEqual([0, 1]);
  });

  it('computes padded domains', () => {
    expect(getPaddedDomain([10, 20])).toEqual([9.2, 20.8]);
    expect(getPaddedDomain([10, 20], 0.1)).toEqual([9, 21]);
    expect(getPaddedDomain([10])).toEqual([9, 11]);
    expect(getPaddedDomain([])).toEqual([0, 1]);
  });

  it('falls back to the configured width until measurement is available', () => {
    expect(getResponsiveWidth(0, 640)).toBe(640);
    expect(getResponsiveWidth(Number.NaN, 640)).toBe(640);
    expect(getResponsiveWidth(320, 640)).toBe(320);
  });
});
