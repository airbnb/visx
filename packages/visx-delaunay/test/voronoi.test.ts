import { voronoi } from '../src';

const x = () => 123;
const y = () => 123;

describe('voronoi', () => {
  test('it should be defined', () => {
    expect(voronoi).toBeDefined();
  });

  test('width and height params should define extent', () => {
    const width = 17;
    const height = 99;
    const v = voronoi({ width, height, x, y });
    expect(v.xmin).toBe(-1);
    expect(v.ymin).toBe(-1);
    expect(v.xmax).toEqual(width + 1);
    expect(v.ymax).toEqual(height + 1);
  });

  test('100 random points should give 100 cell polygons', () => {
    const data = new Array(100).fill(null).map(() => ({
      x: Math.random(),
      y: Math.random(),
    }));
    const v = voronoi({ data, x: (d) => d.x, y: (d) => d.y });
    expect(Array.from(v.cellPolygons())).toHaveLength(100);
  });
});
