"use strict";

exports.__esModule = true;
exports.default = SplitLinePath;

var _propTypes = _interopRequireDefault(require("prop-types"));

var _react = _interopRequireWildcard(require("react"));

var _LinePath = _interopRequireDefault(require("./LinePath"));

var _getSplitLineSegments = _interopRequireDefault(require("../util/getSplitLineSegments"));

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function SplitLinePath(_ref) {
  var children = _ref.children,
      className = _ref.className,
      curve = _ref.curve,
      defined = _ref.defined,
      sampleRate = _ref.sampleRate,
      segments = _ref.segments,
      x = _ref.x,
      y = _ref.y,
      styles = _ref.styles;
  // combine data to first draw entire path
  var combinedSegments = (0, _react.useMemo)(function () {
    return segments.reduce(function (flat, segmentData) {
      return flat.concat([].concat(segmentData));
    }, []);
  }, [segments]);
  return /*#__PURE__*/_react.default.createElement(_LinePath.default, {
    data: combinedSegments,
    defined: defined,
    curve: curve,
    x: x,
    y: y
  }, function (_ref2) {
    var path = _ref2.path;
    // use entire path to interpolate individual segments
    var entirePath = path(combinedSegments);
    var computedLineSegments = (0, _getSplitLineSegments.default)({
      path: entirePath || '',
      segments: segments,
      sampleRate: sampleRate
    });
    return computedLineSegments.map(function (segment, index) {
      return children ? children({
        index: index,
        segment: segment,
        styles: styles[index] || styles[index % styles.length]
      }) : /*#__PURE__*/_react.default.createElement(_LinePath.default, _extends({
        key: index,
        className: className,
        data: segment,
        x: function x(d) {
          return d.x || 0;
        },
        y: function y(d) {
          return d.y || 0;
        }
      }, styles[index] || styles[index % styles.length]));
    });
  });
}

SplitLinePath.propTypes = {
  segments: _propTypes.default.arrayOf(_propTypes.default.array).isRequired,
  styles: _propTypes.default.array.isRequired,
  children: _propTypes.default.func,
  className: _propTypes.default.string,
  sampleRate: _propTypes.default.number
};