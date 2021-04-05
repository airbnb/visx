"use strict";

exports.__esModule = true;
exports.default = LineRadial;

var _react = _interopRequireDefault(require("react"));

var _classnames = _interopRequireDefault(require("classnames"));

var _D3ShapeFactories = require("../util/D3ShapeFactories");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

function LineRadial(_ref) {
  var className = _ref.className,
      angle = _ref.angle,
      radius = _ref.radius,
      defined = _ref.defined,
      curve = _ref.curve,
      _ref$data = _ref.data,
      data = _ref$data === void 0 ? [] : _ref$data,
      innerRef = _ref.innerRef,
      children = _ref.children,
      _ref$fill = _ref.fill,
      fill = _ref$fill === void 0 ? 'transparent' : _ref$fill,
      restProps = _objectWithoutPropertiesLoose(_ref, ["className", "angle", "radius", "defined", "curve", "data", "innerRef", "children", "fill"]);

  var path = (0, _D3ShapeFactories.radialLine)({
    angle: angle,
    radius: radius,
    defined: defined,
    curve: curve
  }); // eslint-disable-next-line react/jsx-no-useless-fragment

  if (children) return /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, children({
    path: path
  }));
  return /*#__PURE__*/_react.default.createElement("path", _extends({
    ref: innerRef,
    className: (0, _classnames.default)('visx-line-radial', className),
    d: path(data) || '',
    fill: fill
  }, restProps));
}