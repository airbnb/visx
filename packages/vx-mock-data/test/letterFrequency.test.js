import { letterFrequency } from '../src';

describe('mocks/letterFrequency', () => {
  test('it should be defined', () => {
    expect(letterFrequency).toBeDefined();
  });

  test('it should be an array', () => {
    expect(letterFrequency.length).toBeDefined();
  });

  test('it should return [{ letter, frequency }]', () => {
    const data = letterFrequency;
    expect(data[0].letter).toBeDefined();
    expect(data[0].frequency).toBeDefined();
    expect(typeof data[0].letter).toEqual('string');
    expect(typeof data[0].frequency).toEqual('number');
  });
});
