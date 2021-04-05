"use strict";

exports.__esModule = true;
exports.default = findNearestDatumXY;

var _voronoi = require("@visx/voronoi");

/* finds the datum nearest to svgMouseX/Y using a voronoi */
function findNearestDatumXY(_ref) {
  var width = _ref.width,
      height = _ref.height,
      xScale = _ref.xScale,
      yScale = _ref.yScale,
      xAccessor = _ref.xAccessor,
      yAccessor = _ref.yAccessor,
      point = _ref.point,
      data = _ref.data;
  if (!point) return null;

  var scaledX = function scaledX(d) {
    return Number(xScale(xAccessor(d)));
  };

  var scaledY = function scaledY(d) {
    return Number(yScale(yAccessor(d)));
  }; // Create a voronoi for each datum's x,y coordinate


  var voronoiInstance = (0, _voronoi.voronoi)({
    x: scaledX,
    y: scaledY,
    width: width,
    height: height
  });
  var nearestDatum = voronoiInstance(data).find(point.x, point.y);
  if (!nearestDatum) return null;
  var datum = nearestDatum.data,
      index = nearestDatum.index;
  var distanceX = Math.abs(scaledX(datum) - point.x);
  var distanceY = Math.abs(scaledY(datum) - point.y);
  return {
    datum: datum,
    index: index,
    distanceX: distanceX,
    distanceY: distanceY
  };
}