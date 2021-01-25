import { genDateValue } from '../src';

describe('generators/genDateValue', () => {
  it('should be defined', () => {
    expect(genDateValue).toBeDefined();
  });

  it('should be function', () => {
    expect(typeof genDateValue).toBe('function');
  });

  it('should return a array of n', () => {
    const n = 3;
    const data = genDateValue(n);
    expect(data).toHaveLength(3);
  });

  it('should return [{ date, value }]', () => {
    const n = 1;
    const data = genDateValue(n);
    expect(data[0].date.constructor).toEqual(Date);
    expect(typeof data[0].value).toBe('number');
  });

  it('should should use a start date and seed if provided', () => {
    const n = 3;
    const seed = 0.5;
    const startDate = new Date('2020-01-01').getUTCMilliseconds();
    expect(genDateValue(n, seed, startDate)).toEqual(genDateValue(n, seed, startDate));
  });
});
