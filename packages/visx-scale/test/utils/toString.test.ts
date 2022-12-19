import toString from '../../src/utils/toString';

describe('toString(mayBeStringLike)', () => {
  it('converts StringLike to string', () => {
    expect(toString({ toString: () => 'haha' })).toBe('haha');
    expect(toString('x')).toBe('x');
    expect(toString(2)).toBe('2');
    expect(toString(0)).toBe('0');
    expect(toString({ x: 1 })).toBe('[object Object]');
  });
  it('returns the same thing if not', () => {
    expect(toString(undefined)).toBeUndefined();
  });
});
