import { genBin, getSeededRandom } from '../src';

describe('generators/genBin', () => {
  it('should be defined', () => {
    expect(genBin).toBeDefined();
  });

  it('should have shape [{ bin, count }]', () => {
    const bin = genBin(1);
    expect(bin).toHaveLength(1);
    expect(bin[0].bin).toBeDefined();
    expect(bin[0].count).toBeDefined();
  });

  it('should take optional bin function', () => {
    const bin = genBin(1, (i) => i);
    expect(bin[0].bin).toEqual(0);
  });

  it('should take an optional count function', () => {
    const bin = genBin(1, undefined, (i) => i);
    expect(bin[0].count).toEqual(0);
    expect(bin[0].bin).toEqual(0);
  });

  it('should support seeded randomness', () => {
    const n = 3;
    const seededRandom1 = getSeededRandom(0.5);
    const seededRandom2 = getSeededRandom(0.5);

    expect(
      genBin(
        n,
        (i) => i,
        (i, number) => 25 * (number - i) * seededRandom1(),
      ),
    ).toEqual(
      genBin(
        n,
        (i) => i,
        (i, number) => 25 * (number - i) * seededRandom2(),
      ),
    );
  });
});
