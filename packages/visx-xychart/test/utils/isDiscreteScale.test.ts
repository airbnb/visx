import isDiscreteScale from '../../src/utils/isDiscreteScale';

describe('isDiscreteScale', () => {
  it('should be defined', () => {
    expect(isDiscreteScale).toBeDefined();
  });

  it('should return true for discrete scales', () => {
    expect(isDiscreteScale({ type: 'band' })).toBe(true);
    expect(isDiscreteScale({ type: 'point' })).toBe(true);
    expect(isDiscreteScale({ type: 'ordinal' })).toBe(true);
  });

  it('should return false for non-discrete scales', () => {
    expect(isDiscreteScale({ type: 'time' })).toBe(false);
    expect(isDiscreteScale({ type: 'utc' })).toBe(false);
    expect(isDiscreteScale({ type: 'log' })).toBe(false);
    expect(isDiscreteScale({ type: 'linear' })).toBe(false);
  });
});
