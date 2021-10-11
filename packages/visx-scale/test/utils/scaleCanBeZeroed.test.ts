import scaleCanBeZeroed from '../../src/utils/scaleCanBeZeroed';

describe('scaleCanBeZeroed(scaleConfig)', () => {
  it('returns true for zero-able scales', () => {
    const zeroAble = ['linear', 'pow', 'quantize', 'sqrt', 'symlog'] as const;
    expect.assertions(zeroAble.length);
    zeroAble.forEach((type) => expect(scaleCanBeZeroed({ type })).toBe(true));
  });
  it('returns false for non-zero-able scales', () => {
    const notZeroAble = [
      'log',
      'radial',
      'time',
      'utc',
      'quantile',
      'threshold',
      'ordinal',
      'point',
      'band',
    ] as const;
    expect.assertions(notZeroAble.length);
    notZeroAble.forEach((type) => expect(scaleCanBeZeroed({ type })).toBe(false));
  });
});
