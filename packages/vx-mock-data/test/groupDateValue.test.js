import { groupDateValue } from '../src';

describe('mocks/groupDateValue', () => {
  test('it should be defined', () => {
    expect(groupDateValue).toBeDefined();
  });

  test('it should be an array', () => {
    expect(groupDateValue.length).toBeDefined();
  });

  test('it should return [{ key, value, date }]', () => {
    const data = groupDateValue;
    expect(data[0].key).toBeDefined();
    expect(data[0].value).toBeDefined();
    expect(data[0].date).toBeDefined();
  });
});
