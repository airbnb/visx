import { genStats, getSeededRandom } from '../src';

describe('generators/genStats', () => {
  it('should be defined', () => {
    expect(genStats).toBeDefined();
  });

  it('should have boxPlot and binData', () => {
    const data = genStats(2);
    expect(data.length).toBeDefined();
    expect(data).toHaveLength(2);
    expect(data[0].boxPlot).toBeDefined();
    expect(data[0].binData).toBeDefined();
  });

  it('should support seeded randomness', () => {
    const data1 = genStats(1, getSeededRandom(0.5), getSeededRandom(0.75));
    const data2 = genStats(1, getSeededRandom(0.5), getSeededRandom(0.75));
    expect(data1).toMatchObject(data2);
  });
});
