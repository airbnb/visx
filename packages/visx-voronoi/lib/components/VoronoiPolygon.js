"use strict";

exports.__esModule = true;
exports.default = VoronoiPolygon;
var _propTypes = _interopRequireDefault(require("prop-types"));
var _react = _interopRequireDefault(require("react"));
var _classnames = _interopRequireDefault(require("classnames"));
var _excluded = ["polygon", "className", "children"];
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }
function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }
function VoronoiPolygon(_ref) {
  var polygon = _ref.polygon,
    className = _ref.className,
    children = _ref.children,
    restProps = _objectWithoutPropertiesLoose(_ref, _excluded);
  if (!polygon) return null;
  var path = "M" + polygon.join('L') + "Z";
  if (children) return /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, children({
    path: path,
    polygon: polygon
  }));
  return /*#__PURE__*/_react.default.createElement("path", _extends({
    className: (0, _classnames.default)('visx-voronoi-polygon', className),
    d: path
  }, restProps));
}
VoronoiPolygon.propTypes = {
  children: _propTypes.default.func,
  className: _propTypes.default.string,
  polygon: _propTypes.default.array
};