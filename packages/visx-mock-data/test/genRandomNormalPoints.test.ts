import { genRandomNormalPoints } from '../src';

describe('generators/genRandomNormalPoints', () => {
  it('should be defined', () => {
    expect(genRandomNormalPoints).toBeDefined();
  });

  it('should be function', () => {
    expect(typeof genRandomNormalPoints).toBe('function');
  });

  it('should default to 3x300 points', () => {
    const data = genRandomNormalPoints();
    expect(data).toHaveLength(900);
  });

  it('should return 3 * n', () => {
    const n = 3;
    const data = genRandomNormalPoints(n);
    expect(data).toHaveLength(9);
  });

  it('should return points with x, y, index', () => {
    const n = 3;
    const data = genRandomNormalPoints(n);
    expect(data[0]).toHaveLength(3);
    expect(data[0][0]).toBeDefined();
    expect(data[0][1]).toBeDefined();
    expect(data[0][2]).toBeDefined();
    expect(data[0][2]).toEqual(0);
    expect(data[3][2]).toEqual(1);
    expect(data[6][2]).toEqual(2);
  });

  it('should support seeded randomness', () => {
    const n = 3;
    const data1 = genRandomNormalPoints(n, 0.5);
    const data2 = genRandomNormalPoints(n, 0.5);
    expect(data1).toMatchObject(data2);
  });
});
