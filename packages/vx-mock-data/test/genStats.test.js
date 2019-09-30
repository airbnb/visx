import { genStats } from '../src';

describe('generators/genStats', () => {
  test('it should be defined', () => {
    expect(genStats).toBeDefined();
  });

  test('it should have boxPlot and binData', () => {
    const data = genStats(2);
    expect(data.length).toBeDefined();
    expect(data).toHaveLength(2);
    expect(data[0].boxPlot).toBeDefined();
    expect(data[0].binData).toBeDefined();
  });
});
