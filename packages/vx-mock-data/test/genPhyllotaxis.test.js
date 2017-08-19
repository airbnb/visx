import { genPhyllotaxis } from '../src';

describe('generators/genPhyllotaxis', () => {
  test('it should be defined', () => {
    expect(genPhyllotaxis).toBeDefined();
  });

  test('it should return a function', () => {
    const pointFn = genPhyllotaxis({ radius: 10, width: 200, height: 200 });
    expect(typeof pointFn).toEqual('function');
  });

  test('it should return a point [x, y] when calling the returned function', () => {
    const pointFn = genPhyllotaxis({ radius: 10, width: 200, height: 200 });
    const point = pointFn(3);
    const expected = [110.53847020514726, 113.74556822162049];
    expect(point.length).toBeDefined();
    expect(point.length).toEqual(2);
    expect(point[0]).toEqual(expected[0]);
    expect(point[1]).toEqual(expected[1]);
  });
});
