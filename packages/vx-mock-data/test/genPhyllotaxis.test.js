import { genPhyllotaxis } from '../src';

describe('generators/genPhyllotaxis', () => {
  test('it should be defined', () => {
    expect(genPhyllotaxis).toBeDefined();
  });

  test('it should return a function', () => {
    const pointFn = genPhyllotaxis({
      radius: 10,
      width: 200,
      height: 200,
    });
    expect(typeof pointFn).toEqual('function');
  });

  test('it should return a point [x, y] when calling the returned function', () => {
    const pointFn = genPhyllotaxis({
      radius: 10,
      width: 200,
      height: 200,
    });
    const point = pointFn(3).toArray();
    const expected = [110, 113];
    expect(point.length).toBeDefined();
    expect(point.length).toEqual(2);
    expect(Math.floor(point[0])).toEqual(expected[0]);
    expect(Math.floor(point[1])).toEqual(expected[1]);
  });
});
