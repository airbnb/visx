import coerceNumber from '../../src/utils/coerceNumber';

describe('coerceNumber(mayBeNumberLike)', () => {
  it('coerces NumberLike to number', () => {
    expect(coerceNumber({ valueOf: () => 1 })).toEqual(1);
    expect(coerceNumber(new Date(10))).toEqual(10);
  });
  it('returns the same thing if not', () => {
    expect(coerceNumber('x')).toEqual('x');
    expect(coerceNumber(2)).toEqual(2);
    expect(coerceNumber(0)).toEqual(0);
    expect(coerceNumber(null)).toBeNull();
    expect(coerceNumber(undefined)).toBeUndefined();
    expect(coerceNumber({ x: 1 })).toEqual({ x: 1 });
  });
});
