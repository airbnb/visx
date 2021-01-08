import scaleCanBeZeroed from '../../src/utils/scaleCanBeZeroed';

describe('scaleCanBeZeroed(scaleConfig)', () => {
  it('returns true for zero-able scales', () => {
    expect(scaleCanBeZeroed({ type: 'linear' })).toBe(true);
    expect(scaleCanBeZeroed({ type: 'pow' })).toBe(true);
    expect(scaleCanBeZeroed({ type: 'quantize' })).toBe(true);
    expect(scaleCanBeZeroed({ type: 'sqrt' })).toBe(true);
    expect(scaleCanBeZeroed({ type: 'symlog' })).toBe(true);
  });
  it('returns false for non-zero-able scales', () => {
    expect(scaleCanBeZeroed({ type: 'log' })).toBe(false);
    expect(scaleCanBeZeroed({ type: 'radial' })).toBe(false);
    expect(scaleCanBeZeroed({ type: 'time' })).toBe(false);
    expect(scaleCanBeZeroed({ type: 'utc' })).toBe(false);
    expect(scaleCanBeZeroed({ type: 'quantile' })).toBe(false);
    expect(scaleCanBeZeroed({ type: 'threshold' })).toBe(false);
    expect(scaleCanBeZeroed({ type: 'ordinal' })).toBe(false);
    expect(scaleCanBeZeroed({ type: 'point' })).toBe(false);
    expect(scaleCanBeZeroed({ type: 'band' })).toBe(false);
  });
});
