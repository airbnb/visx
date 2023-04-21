"use strict";

exports.__esModule = true;
exports.default = LinkRadialDiagonal;
exports.pathRadialDiagonal = pathRadialDiagonal;
var _react = _interopRequireDefault(require("react"));
var _classnames = _interopRequireDefault(require("classnames"));
var _d3Shape = require("d3-shape");
var _accessors = require("../../../util/accessors");
var _excluded = ["className", "children", "data", "innerRef", "path", "angle", "radius", "source", "target"];
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }
function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }
function pathRadialDiagonal(_ref) {
  var source = _ref.source,
    target = _ref.target,
    angle = _ref.angle,
    radius = _ref.radius;
  return function (data) {
    var link = (0, _d3Shape.linkRadial)();
    link.angle(angle);
    link.radius(radius);
    link.source(source);
    link.target(target);
    return link(data);
  };
}
function LinkRadialDiagonal(_ref2) {
  var className = _ref2.className,
    children = _ref2.children,
    data = _ref2.data,
    innerRef = _ref2.innerRef,
    path = _ref2.path,
    _ref2$angle = _ref2.angle,
    angle = _ref2$angle === void 0 ? _accessors.getX : _ref2$angle,
    _ref2$radius = _ref2.radius,
    radius = _ref2$radius === void 0 ? _accessors.getY : _ref2$radius,
    _ref2$source = _ref2.source,
    source = _ref2$source === void 0 ? _accessors.getSource : _ref2$source,
    _ref2$target = _ref2.target,
    target = _ref2$target === void 0 ? _accessors.getTarget : _ref2$target,
    restProps = _objectWithoutPropertiesLoose(_ref2, _excluded);
  var pathGen = path || pathRadialDiagonal({
    source: source,
    target: target,
    angle: angle,
    radius: radius
  });
  if (children) return /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, children({
    path: pathGen
  }));
  return /*#__PURE__*/_react.default.createElement("path", _extends({
    ref: innerRef,
    className: (0, _classnames.default)('visx-link visx-link-radial-diagonal', className),
    d: pathGen(data) || ''
  }, restProps));
}