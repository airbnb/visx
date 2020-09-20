import { genBins } from '../src';

describe('generators/genBins', () => {
  test('it should be defined', () => {
    expect(genBins).toBeDefined();
  });

  test('it should have the shape of [{bin, bins: [{ bin, count }]}]', () => {
    const bins = genBins(1, 2);
    expect(bins[0].bin).toEqual(0);
    expect(bins).toHaveLength(1);
    expect(bins[0].bins).toHaveLength(2);
    expect(bins[0].bins[1].bin).toEqual(150);
  });

  test('it should take an optional bin function parameter', () => {
    const bins = genBins(1, 1, i => i);
    expect(bins[0].bins[0].bin).toEqual(0);
  });

  test('it should take an optional count function parameter', () => {
    const bins = genBins(1, 1, undefined, i => i);
    expect(bins[0].bins[0].count).toEqual(0);
  });
});
