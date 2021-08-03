import { voronoi } from '../src';

const x = () => 123;
const y = () => 123;

describe('voronoi', () => {
  test('it should be defined', () => {
    expect(voronoi).toBeDefined();
  });

  test('x param should set voronoi x', () => {
    const v = voronoi({ x });
    expect(v.x()).toEqual(x);
  });

  test('y param should set voronoi y', () => {
    const v = voronoi({ y });
    expect(v.y()).toEqual(y);
  });

  test('width and height params should define extent', () => {
    const width = 17;
    const height = 99;
    const v = voronoi({ width, height });
    const extent = v.extent();
    const endCoord = extent![1];
    expect(endCoord[0]).toEqual(width + 1);
    expect(endCoord[1]).toEqual(height + 1);
  });
});
