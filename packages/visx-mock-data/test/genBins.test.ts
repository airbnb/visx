import { genBins, getSeededRandom } from '../src';

describe('generators/genBins', () => {
  it('should be defined', () => {
    expect(genBins).toBeDefined();
  });

  it('should have the shape of [{bin, bins: [{ bin, count }]}]', () => {
    const bins = genBins(1, 2);
    expect(bins[0].bin).toEqual(0);
    expect(bins).toHaveLength(1);
    expect(bins[0].bins).toHaveLength(2);
    expect(bins[0].bins[1].bin).toEqual(150);
  });

  it('should take an optional bin function parameter', () => {
    const bins = genBins(1, 1, (i) => i);
    expect(bins[0].bins[0].bin).toEqual(0);
  });

  it('should take an optional count function parameter', () => {
    const bins = genBins(1, 1, undefined, (i) => i);
    expect(bins[0].bins[0].count).toEqual(0);
  });

  it('should support seeded randomness', () => {
    const seededRandom1 = getSeededRandom(0.5);
    const seededRandom2 = getSeededRandom(0.5);

    expect(
      genBins(
        2,
        2,
        (i) => i,
        (i, number) => 25 * (number - i) * seededRandom1(),
      ),
    ).toEqual(
      genBins(
        2,
        2,
        (i) => i,
        (i, number) => 25 * (number - i) * seededRandom2(),
      ),
    );
  });
});
