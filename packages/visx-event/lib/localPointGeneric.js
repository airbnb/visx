"use strict";

exports.__esModule = true;
exports.default = localPoint;

var _point = require("@visx/point");

var _typeGuards = require("./typeGuards");

var _getXAndYFromEvent = _interopRequireDefault(require("./getXAndYFromEvent"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function localPoint(node, event) {
  if (!node || !event) return null;
  var coords = (0, _getXAndYFromEvent.default)(event); // find top-most SVG

  var svg = (0, _typeGuards.isSVGElement)(node) ? node.ownerSVGElement : node;
  var screenCTM = (0, _typeGuards.isSVGGraphicsElement)(svg) ? svg.getScreenCTM() : null;

  if ((0, _typeGuards.isSVGSVGElement)(svg) && screenCTM) {
    var point = svg.createSVGPoint();
    point.x = coords.x;
    point.y = coords.y;
    point = point.matrixTransform(screenCTM.inverse());
    return new _point.Point({
      x: point.x,
      y: point.y
    });
  } // fall back to bounding box


  var rect = node.getBoundingClientRect();
  return new _point.Point({
    x: coords.x - rect.left - node.clientLeft,
    y: coords.y - rect.top - node.clientTop
  });
}