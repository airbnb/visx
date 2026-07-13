import computeStats from '../src/util/computeStats';

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

  test('it should not throw when IQR is zero', () => {
    expect(() => computeStats([-1, 0, 0, 0, 0, 0, 1])).not.toThrow();
    expect(() => computeStats([5, 5, 5, 5])).not.toThrow();
  });

  test('it should not throw for a single-value sample', () => {
    const stats = computeStats([0]);
    expect(stats.boxPlot).toEqual({
      min: 0,
      firstQuartile: 0,
      median: 0,
      thirdQuartile: 0,
      max: 0,
      outliers: [],
    });
    expect(stats.binData.length).toBeGreaterThan(0);
  });

  test('degenerate IQR samples still return usable binData', () => {
    const stats = computeStats([5, 5, 5, 5]);
    expect(stats.boxPlot.min).toBe(5);
    expect(stats.boxPlot.max).toBe(5);
    expect(stats.binData.some((bin) => bin.count > 0)).toBe(true);
  });
});
