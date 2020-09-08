import { appleStock } from '../src';

describe('mocks/appleStock', () => {
  test('it should be defined', () => {
    expect(appleStock).toBeDefined();
  });

  test('it should be an array', () => {
    expect(appleStock.length).toBeDefined();
  });

  test('it should return [{ date, close }]', () => {
    const data = appleStock;
    expect(data[0].date).toBeDefined();
    expect(data[0].close).toBeDefined();
  });
});
