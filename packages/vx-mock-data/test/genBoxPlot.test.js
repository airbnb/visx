import { genBoxPlot } from '../src';

describe('generators/genBoxPlot', () => {
  test('it should be defined', () => {
    expect(genBoxPlot).toBeDefined();
  });

  test('it should be an array', () => {
    const data = genBoxPlot(2);
    expect(data.length).toBeDefined();
    expect(data.length).toEqual(2);
  });
});
