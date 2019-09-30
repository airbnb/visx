import { cityTemperature } from '../src';

describe('mocks/cityTemperature', () => {
  test('it should be defined', () => {
    expect(cityTemperature).toBeDefined();
  });

  test('it should be an array', () => {
    expect(cityTemperature.length).toBeDefined();
  });

  test('it should return [{ date, city names }]', () => {
    const data = cityTemperature;
    expect(data[0].date).toBeDefined();
    expect(data[0]['New York']).toBeDefined();
    expect(data[0]['San Francisco']).toBeDefined();
    expect(data[0].Austin).toBeDefined();
    expect(typeof data[0]['New York']).toEqual('string');
  });
});
