"use strict";

exports.__esModule = true;
exports.default = Pie;
var _react = _interopRequireDefault(require("react"));
var _classnames = _interopRequireDefault(require("classnames"));
var _group = require("@visx/group");
var _D3ShapeFactories = require("../util/D3ShapeFactories");
var _excluded = ["className", "top", "left", "data", "centroid", "innerRadius", "outerRadius", "cornerRadius", "startAngle", "endAngle", "padAngle", "padRadius", "pieSort", "pieSortValues", "pieValue", "children", "fill"];
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }
function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }
function Pie(_ref) {
  var className = _ref.className,
    top = _ref.top,
    left = _ref.left,
    _ref$data = _ref.data,
    data = _ref$data === void 0 ? [] : _ref$data,
    centroid = _ref.centroid,
    _ref$innerRadius = _ref.innerRadius,
    innerRadius = _ref$innerRadius === void 0 ? 0 : _ref$innerRadius,
    outerRadius = _ref.outerRadius,
    cornerRadius = _ref.cornerRadius,
    startAngle = _ref.startAngle,
    endAngle = _ref.endAngle,
    padAngle = _ref.padAngle,
    padRadius = _ref.padRadius,
    pieSort = _ref.pieSort,
    pieSortValues = _ref.pieSortValues,
    pieValue = _ref.pieValue,
    children = _ref.children,
    _ref$fill = _ref.fill,
    fill = _ref$fill === void 0 ? '' : _ref$fill,
    restProps = _objectWithoutPropertiesLoose(_ref, _excluded);
  var path = (0, _D3ShapeFactories.arc)({
    innerRadius: innerRadius,
    outerRadius: outerRadius,
    cornerRadius: cornerRadius,
    padRadius: padRadius
  });
  var pie = (0, _D3ShapeFactories.pie)({
    startAngle: startAngle,
    endAngle: endAngle,
    padAngle: padAngle,
    value: pieValue,
    sort: pieSort,
    sortValues: pieSortValues
  });
  var arcs = pie(data);
  if (children) return /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, children({
    arcs: arcs,
    path: path,
    pie: pie
  }));
  return /*#__PURE__*/_react.default.createElement(_group.Group, {
    className: "visx-pie-arcs-group",
    top: top,
    left: left
  }, arcs.map(function (arc, i) {
    return /*#__PURE__*/_react.default.createElement("g", {
      key: "pie-arc-" + i
    }, /*#__PURE__*/_react.default.createElement("path", _extends({
      className: (0, _classnames.default)('visx-pie-arc', className),
      d: path(arc) || '',
      fill: fill == null || typeof fill === 'string' ? fill : fill(arc)
    }, restProps)), centroid == null ? void 0 : centroid(path.centroid(arc), arc));
  }));
}