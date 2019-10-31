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
    const point = pointFn(3);
    const expected = { x: 110, y: 113 };
    expect(Math.floor(point.x)).toEqual(expected.x);
    expect(Math.floor(point.y)).toEqual(expected.y);
  });
});
