import { voronoi } from '../src';

describe('voronoi', () => {
  test('it should be defined', () => {
    expect(voronoi).toBeDefined();
  });

  test('x param should set voronoi x', () => {
    const x = () => 123;
    const v = voronoi({ x });
    expect(v.x()).toEqual(x);
  });

  test('y param should set voronoi y', () => {
    const y = () => 123;
    const v = voronoi({ y });
    expect(v.y()).toEqual(y);
  });

  test('width and height params should define extent', () => {
    const width = 17;
    const height = 99;
    const v = voronoi({ width, height });
    const [[x0, y0], [x1, y1]] = v.extent();

    expect(x1).toEqual(width + 1);
    expect(y1).toEqual(height + 1);
  });
});
