import toString from '../../src/utils/toString';

describe('toString(mayBeStringLike)', () => {
  it('converts StringLike to string', () => {
    expect(toString({ toString: () => 'haha' })).toEqual('haha');
    expect(toString('x')).toEqual('x');
    expect(toString(2)).toEqual('2');
    expect(toString(0)).toEqual('0');
    expect(toString({ x: 1 })).toEqual('[object Object]');
  });
  it('returns the same thing if not', () => {
    expect(toString(undefined)).toBeUndefined();
  });
});
