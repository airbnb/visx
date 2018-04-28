import { Point } from '../src';

describe('Point', () => {
  test('Point should be defined', () => {
    expect(Point).toBeDefined();
  });

  test('constructor defaults to 0,0', () => {
    const p = new Point({});
    expect(p.x).toBe(0);
    expect(p.y).toBe(0);
  });

  test('constructor sets x,y', () => {
    const p = new Point({ x: 3, y: 4 });
    expect(p.x).toBe(3);
    expect(p.y).toBe(4);
  });

  test('value()', () => {
    const c = { x: 3, y: 4 };
    const p = new Point(c);
    expect(p.value()).toEqual(c);
  });

  test('toArray()', () => {
    const c = { x: 3, y: 4 };
    const p = new Point(c);
    expect(p.toArray()).toEqual([c.x, c.y]);
  });
});
