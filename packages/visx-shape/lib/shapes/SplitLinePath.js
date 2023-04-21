"use strict";

exports.__esModule = true;
exports.default = SplitLinePath;
var _propTypes = _interopRequireDefault(require("prop-types"));
var _react = _interopRequireWildcard(require("react"));
var _getSplitLineSegments = _interopRequireDefault(require("../util/getSplitLineSegments"));
var _D3ShapeFactories = require("../util/D3ShapeFactories");
var _LinePath = _interopRequireDefault(require("./LinePath"));
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }
var getX = function getX(d) {
  return d.x || 0;
};
var getY = function getY(d) {
  return d.y || 0;
};
function SplitLinePath(_ref) {
  var children = _ref.children,
    className = _ref.className,
    curve = _ref.curve,
    defined = _ref.defined,
    segmentation = _ref.segmentation,
    sampleRate = _ref.sampleRate,
    segments = _ref.segments,
    x = _ref.x,
    y = _ref.y,
    styles = _ref.styles;
  // Convert data in all segments to points.
  var pointsInSegments = (0, _react.useMemo)(function () {
    var xFn = typeof x === 'number' || typeof x === 'undefined' ? function () {
      return x;
    } : x;
    var yFn = typeof y === 'number' || typeof y === 'undefined' ? function () {
      return y;
    } : y;
    return segments.map(function (s) {
      return s.map(function (value, i) {
        return {
          x: xFn(value, i, s),
          y: yFn(value, i, s)
        };
      });
    });
  }, [x, y, segments]);
  var pathString = (0, _react.useMemo)(function () {
    var path = (0, _D3ShapeFactories.line)({
      x: x,
      y: y,
      defined: defined,
      curve: curve
    });
    return path(segments.flat()) || '';
  }, [x, y, defined, curve, segments]);
  var splitLineSegments = (0, _react.useMemo)(function () {
    return (0, _getSplitLineSegments.default)({
      path: pathString,
      segmentation: segmentation,
      pointsInSegments: pointsInSegments,
      sampleRate: sampleRate
    });
  }, [pathString, segmentation, pointsInSegments, sampleRate]);
  return /*#__PURE__*/_react.default.createElement("g", null, splitLineSegments.map(function (segment, index) {
    return children ? /*#__PURE__*/_react.default.createElement(_react.default.Fragment, {
      key: index
    }, children({
      index: index,
      segment: segment,
      styles: styles[index] || styles[index % styles.length]
    })) : /*#__PURE__*/_react.default.createElement(_LinePath.default, _extends({
      key: index,
      className: className,
      data: segment,
      x: getX,
      y: getY
    }, styles[index] || styles[index % styles.length]));
  }));
}
SplitLinePath.propTypes = {
  segments: _propTypes.default.arrayOf(_propTypes.default.array).isRequired,
  styles: _propTypes.default.array.isRequired,
  children: _propTypes.default.func,
  className: _propTypes.default.string
};