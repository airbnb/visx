import { computeStats } from '../src';

const data = [1, 2, 3, 4, 5, 6, 6, 7, 8, 9, 1];

describe('computeStats', () => {
  test('it should be defined', () => {
    expect(computeStats).toBeDefined();
  });

  test('it should have boxPlot and binData', () => {
    const stats = computeStats(data);
    expect(stats.boxPlot).toBeDefined();
    expect(stats.binData).toBeDefined();
  });
});
