"use strict";

exports.__esModule = true;
exports.VoronoiPolygon = exports.voronoi = void 0;

var _voronoi = _interopRequireDefault(require("./voronoi"));

exports.voronoi = _voronoi.default;

var _VoronoiPolygon = _interopRequireDefault(require("./components/VoronoiPolygon"));

exports.VoronoiPolygon = _VoronoiPolygon.default;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }