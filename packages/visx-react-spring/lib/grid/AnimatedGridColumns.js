"use strict";

exports.__esModule = true;
exports.default = AnimatedGridColumns;
var _react = _interopRequireDefault(require("react"));
var _GridColumns = _interopRequireDefault(require("@visx/grid/lib/grids/GridColumns"));
var _AnimatedGridLines = _interopRequireDefault(require("./AnimatedGridLines"));
var _excluded = ["scale", "height", "numTicks", "tickValues", "offset", "className", "animationTrajectory", "top", "left"];
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }
function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }
function AnimatedGridColumns(_ref) {
  var scale = _ref.scale,
    height = _ref.height,
    numTicks = _ref.numTicks,
    tickValues = _ref.tickValues,
    offset = _ref.offset,
    className = _ref.className,
    animationTrajectory = _ref.animationTrajectory,
    top = _ref.top,
    left = _ref.left,
    lineProps = _objectWithoutPropertiesLoose(_ref, _excluded);
  return /*#__PURE__*/_react.default.createElement(_GridColumns.default, {
    scale: scale,
    height: height,
    numTicks: numTicks,
    tickValues: tickValues,
    className: className,
    top: top,
    left: left
  }, function (_ref2) {
    var lines = _ref2.lines;
    return /*#__PURE__*/_react.default.createElement(_AnimatedGridLines.default, _extends({
      scale: scale,
      lines: lines,
      animationTrajectory: animationTrajectory,
      animateXOrY: "x",
      lineKey: function lineKey(line) {
        var _line$from$x, _line$from;
        return "column-" + ((_line$from$x = line == null ? void 0 : (_line$from = line.from) == null ? void 0 : _line$from.x) != null ? _line$from$x : '') + "-" + line.index;
      }
    }, lineProps));
  });
}