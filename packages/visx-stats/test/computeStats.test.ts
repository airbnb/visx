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
});
