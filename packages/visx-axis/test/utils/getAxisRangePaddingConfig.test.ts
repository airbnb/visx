import getAxisRangePaddingConfig, {
  defaultAxisRangePadding,
} from '../../src/utils/getAxisRangePaddingConfig';

describe('getAxisRangePaddingConfig(rangePadding)', () => {
  it('should return default range padding config', () => {
    const actualResult = getAxisRangePaddingConfig();
    const expectedResult = { start: defaultAxisRangePadding, end: defaultAxisRangePadding };
    expect(actualResult).toEqual(expectedResult);
  });

  it('should support range padding as a number', () => {
    const actualResult = getAxisRangePaddingConfig(8);
    const expectedResult = { start: 8, end: 8 };
    expect(actualResult).toEqual(expectedResult);
  });

  it('should support range padding as a config object', () => {
    const testCases = [
      { input: { start: 5 }, expectedResult: { start: 5, end: defaultAxisRangePadding } },
      { input: { end: 10 }, expectedResult: { start: defaultAxisRangePadding, end: 10 } },
      { input: { start: 15, end: 5 }, expectedResult: { start: 15, end: 5 } },
    ];
    testCases.forEach(({ input, expectedResult }) => {
      const actualResult = getAxisRangePaddingConfig(input);
      expect(actualResult).toEqual(expectedResult);
    });
  });
});
