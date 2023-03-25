import { delaunay } from '../src';

const data = [
  { x: 10, y: 10 },
  { x: 10, y: 20 },
  { x: 20, y: 20 },
  { x: 20, y: 10 },
];

describe('delaunay', () => {
  test('it should be defined', () => {
    expect(delaunay).toBeDefined();
  });

  test('it should find closest point', () => {
    const delaunayDiagram = delaunay({ data, x: (d) => d.x, y: (d) => d.y });
    expect(delaunayDiagram.find(9, 11)).toEqual(0);
    expect(delaunayDiagram.find(11, 19)).toEqual(1);
    expect(delaunayDiagram.find(21, 19)).toEqual(2);
  });

  test('the delaunay triagulation of a square should contain two triangles ', () => {
    const delaunayDiagram = delaunay({ data, x: (d) => d.x, y: (d) => d.y });
    expect(Array.from(delaunayDiagram.trianglePolygons()).length).toEqual(2);
  });
});
