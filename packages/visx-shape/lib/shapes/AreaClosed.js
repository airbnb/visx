"use strict";

exports.__esModule = true;
exports.default = AreaClosed;
var _react = _interopRequireDefault(require("react"));
var _classnames = _interopRequireDefault(require("classnames"));
var _setNumberOrNumberAccessor = _interopRequireDefault(require("../util/setNumberOrNumberAccessor"));
var _D3ShapeFactories = require("../util/D3ShapeFactories");
var _excluded = ["x", "x0", "x1", "y", "y1", "y0", "yScale", "data", "defined", "className", "curve", "innerRef", "children"];
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }
function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }
function AreaClosed(_ref) {
  var x = _ref.x,
    x0 = _ref.x0,
    x1 = _ref.x1,
    y = _ref.y,
    y1 = _ref.y1,
    y0 = _ref.y0,
    yScale = _ref.yScale,
    _ref$data = _ref.data,
    data = _ref$data === void 0 ? [] : _ref$data,
    _ref$defined = _ref.defined,
    defined = _ref$defined === void 0 ? function () {
      return true;
    } : _ref$defined,
    className = _ref.className,
    curve = _ref.curve,
    innerRef = _ref.innerRef,
    children = _ref.children,
    restProps = _objectWithoutPropertiesLoose(_ref, _excluded);
  var path = (0, _D3ShapeFactories.area)({
    x: x,
    x0: x0,
    x1: x1,
    defined: defined,
    curve: curve
  });
  if (y0 == null) {
    /**
     * by default set the baseline to the first element of the yRange
     * @TODO take the minimum instead?
     */
    path.y0(yScale.range()[0]);
  } else {
    (0, _setNumberOrNumberAccessor.default)(path.y0, y0);
  }
  if (y && !y1) (0, _setNumberOrNumberAccessor.default)(path.y1, y);
  if (y1 && !y) (0, _setNumberOrNumberAccessor.default)(path.y1, y1);
  if (children) return /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, children({
    path: path
  }));
  return /*#__PURE__*/_react.default.createElement("path", _extends({
    ref: innerRef,
    className: (0, _classnames.default)('visx-area-closed', className),
    d: path(data) || ''
  }, restProps));
}