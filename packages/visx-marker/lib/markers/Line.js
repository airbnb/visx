"use strict";

exports.__esModule = true;
exports.default = MarkerLine;
var _react = _interopRequireDefault(require("react"));
var _Marker = _interopRequireDefault(require("./Marker"));
var _excluded = ["id", "size", "fill", "stroke", "strokeWidth"];
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }
function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }
function MarkerLine(_ref) {
  var id = _ref.id,
    _ref$size = _ref.size,
    size = _ref$size === void 0 ? 9 : _ref$size,
    fill = _ref.fill,
    stroke = _ref.stroke,
    _ref$strokeWidth = _ref.strokeWidth,
    strokeWidth = _ref$strokeWidth === void 0 ? 1 : _ref$strokeWidth,
    restProps = _objectWithoutPropertiesLoose(_ref, _excluded);
  var max = Math.max(size, strokeWidth * 2);
  var midX = max / 2;
  var midY = size / 2;
  return /*#__PURE__*/_react.default.createElement(_Marker.default, _extends({
    id: id,
    markerWidth: max,
    markerHeight: size,
    refX: midX,
    refY: midY,
    orient: "auto",
    markerUnits: "strokeWidth",
    fill: fill || stroke,
    stroke: "none"
  }, restProps), /*#__PURE__*/_react.default.createElement("rect", {
    width: strokeWidth,
    height: size,
    x: midX
  }));
}