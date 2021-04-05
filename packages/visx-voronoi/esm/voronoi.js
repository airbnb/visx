import { voronoi as d3Voronoi } from 'd3-voronoi';
var CLIP_PADDING = 1;

/**
 * Returns a configured d3 voronoi `layout`. calling `layout(data)` returns a voronoi *diagram*.
 * Alternatively call `layout.polygons(data)`, `layout.triangles(data)`, `layout.links(data)`
 */
export default function voronoi(_ref) {
  var _ref$width = _ref.width,
      width = _ref$width === void 0 ? 0 : _ref$width,
      _ref$height = _ref.height,
      height = _ref$height === void 0 ? 0 : _ref$height,
      x = _ref.x,
      y = _ref.y;
  var voronoiGenerator = d3Voronoi();
  if (x) voronoiGenerator.x(x);
  if (y) voronoiGenerator.y(y);
  voronoiGenerator.extent([[-CLIP_PADDING, -CLIP_PADDING], [width + CLIP_PADDING, height + CLIP_PADDING]]);
  return voronoiGenerator;
}