import { describe, expect, test } from 'vitest';
import { computeStats } from '../src';

const data = [1, 2, 3, 4, 5, 6, 6, 7, 8, 9, 1];
const edgeCaseData = [10000, 2400, 10000, 10000];

describe('computeStats', () => {
  test('it should be defined', () => {
    expect(computeStats).toBeDefined();
  });

  test('it should have boxPlot and binData', () => {
    const stats = computeStats(data);
    expect(stats.boxPlot).toBeDefined();
    expect(stats.binData).toBeDefined();
  });

  test('it should have boxPlot and binData when first and third quartile are equal', () => {
    const stats = computeStats(edgeCaseData);
    expect(stats.boxPlot).toBeDefined();
    expect(stats.binData).toBeDefined();
  });

  test('min/max should match the dataset when there are no outliers', () => {
    const stats = computeStats(edgeCaseData);
    expect(stats.boxPlot.min).toBe(Math.min(...edgeCaseData));
    expect(stats.boxPlot.max).toBe(Math.max(...edgeCaseData));
  });

  test.each([
    { values: [-100, 1, 2, 3, 4, 5, 6, 7, 8, 9], outliers: [-100] },
    { values: [1, 2, 3, 4, 5, 6, 7, 8, 9, 100], outliers: [100] },
    { values: [-100, 1, 2, 3, 4, 5, 6, 7, 8, 9, 100], outliers: [-100, 100] },
  ])('whiskers end at observed inliers with outliers $outliers', ({ values, outliers }) => {
    const stats = computeStats(values);
    expect(stats.boxPlot.min).toBe(1);
    expect(stats.boxPlot.max).toBe(9);
    expect(stats.boxPlot.outliers).toEqual(outliers);
    expect(stats.binData.reduce((count, bin) => count + bin.count, 0)).toBe(9);
  });

  test('whiskers include observations exactly on the outlier fences', () => {
    const values = [100, 7, 4, 4, 4, 3, 2, 2, 2, -1, -100];
    const original = [...values];
    const stats = computeStats(values);
    expect(stats.boxPlot.min).toBe(-1);
    expect(stats.boxPlot.max).toBe(7);
    expect(stats.boxPlot.outliers).toEqual([-100, 100]);
    expect(values).toEqual(original);
  });

  test('correcting whiskers preserves histogram bins', () => {
    const stats = computeStats([-100, 1, 2, 3, 4, 5, 6, 7, 8, 9]);
    expect(stats.binData).toEqual([
      { value: -5.5, count: 0 },
      { value: -3, count: 0 },
      { value: 2, count: 4 },
      { value: 7, count: 5 },
      { value: 12, count: 0 },
      { value: 14.5, count: 0 },
    ]);
  });
});
