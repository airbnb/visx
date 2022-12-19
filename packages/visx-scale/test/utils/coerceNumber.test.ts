import coerceNumber from '../../src/utils/coerceNumber';

describe('coerceNumber(mayBeNumberLike)', () => {
  it('coerces NumberLike to number', () => {
    expect(coerceNumber({ valueOf: () => 1 })).toBe(1);
    expect(coerceNumber(new Date(10))).toBe(10);
  });
  it('returns the same thing if not', () => {
    expect(coerceNumber('x')).toBe('x');
    expect(coerceNumber(2)).toBe(2);
    expect(coerceNumber(0)).toBe(0);
    expect(coerceNumber(null)).toBeNull();
    expect(coerceNumber(undefined)).toBeUndefined();
    expect(coerceNumber({ x: 1 })).toEqual({ x: 1 });
  });
});
