import { genDateValue } from '../src';

describe('generators/genDateValue', () => {
  test('it should be defined', () => {
    expect(genDateValue).toBeDefined();
  });

  test('it should be function', () => {
    expect(typeof genDateValue).toBe('function');
  });

  test('it should return a array of n', () => {
    const n = 3;
    const data = genDateValue(n);
    expect(data).toHaveLength(3);
  });

  test('it should return [{ date, value }]', () => {
    const n = 1;
    const data = genDateValue(n);
    expect(data[0].date.constructor).toEqual(Date);
    expect(typeof data[0].value).toBe('number');
  });
});
