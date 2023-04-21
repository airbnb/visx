"use strict";

exports.__esModule = true;
exports.default = Arc;
var _react = _interopRequireDefault(require("react"));
var _classnames = _interopRequireDefault(require("classnames"));
var _D3ShapeFactories = require("../util/D3ShapeFactories");
var _excluded = ["className", "data", "innerRadius", "outerRadius", "cornerRadius", "startAngle", "endAngle", "padAngle", "padRadius", "children", "innerRef"];
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }
function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }
function Arc(_ref) {
  var className = _ref.className,
    data = _ref.data,
    innerRadius = _ref.innerRadius,
    outerRadius = _ref.outerRadius,
    cornerRadius = _ref.cornerRadius,
    startAngle = _ref.startAngle,
    endAngle = _ref.endAngle,
    padAngle = _ref.padAngle,
    padRadius = _ref.padRadius,
    children = _ref.children,
    innerRef = _ref.innerRef,
    restProps = _objectWithoutPropertiesLoose(_ref, _excluded);
  var path = (0, _D3ShapeFactories.arc)({
    innerRadius: innerRadius,
    outerRadius: outerRadius,
    cornerRadius: cornerRadius,
    startAngle: startAngle,
    endAngle: endAngle,
    padAngle: padAngle,
    padRadius: padRadius
  });
  if (children) return /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, children({
    path: path
  }));
  if (!data && (startAngle == null || endAngle == null || innerRadius == null || outerRadius == null)) {
    console.warn('[@visx/shape/Arc]: expected data because one of startAngle, endAngle, innerRadius, outerRadius is undefined. Bailing.');
    return null;
  }
  return /*#__PURE__*/_react.default.createElement("path", _extends({
    ref: innerRef,
    className: (0, _classnames.default)('visx-arc', className),
    d: path(data) || ''
  }, restProps));
}