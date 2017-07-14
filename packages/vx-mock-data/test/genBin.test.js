import { genBin } from '../src';

describe('generators/genBin', () => {
  test('it should be defined', () => {
    expect(genBin).toBeDefined();
  });

  test('it should have shape [{ bin, count }]', () => {
    const bin = genBin(1);
    expect(bin.length).toEqual(1);
    expect(bin[0].bin).toBeDefined();
    expect(bin[0].count).toBeDefined();
  });

  test('it should take optional bin function', () => {
    const bin = genBin(1, (i, n) => i);
    expect(bin[0].bin).toEqual(0);
  });

  test('it should take an optional count function', () => {
    const bin = genBin(1, undefined, (i, n) => i);
    expect(bin[0].count).toEqual(0);
    expect(bin[0].bin).toEqual(0);
  });
});
