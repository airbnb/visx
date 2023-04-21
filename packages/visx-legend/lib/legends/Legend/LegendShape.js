"use strict";

exports.__esModule = true;
exports.default = LegendShape;
var _propTypes = _interopRequireDefault(require("prop-types"));
var _react = _interopRequireDefault(require("react"));
var _Rect = _interopRequireDefault(require("../../shapes/Rect"));
var _renderShape = _interopRequireDefault(require("../../util/renderShape"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }
function LegendShape(_ref) {
  var _ref$shape = _ref.shape,
    shape = _ref$shape === void 0 ? _Rect.default : _ref$shape,
    width = _ref.width,
    height = _ref.height,
    margin = _ref.margin,
    label = _ref.label,
    item = _ref.item,
    itemIndex = _ref.itemIndex,
    fill = _ref.fill,
    size = _ref.size,
    shapeStyle = _ref.shapeStyle;
  return /*#__PURE__*/_react.default.createElement("div", {
    className: "visx-legend-shape",
    style: {
      display: 'flex',
      width: size ? size(_extends({}, label)) : width,
      height: size ? size(_extends({}, label)) : height,
      margin: margin
    }
  }, (0, _renderShape.default)({
    shape: shape,
    item: item,
    itemIndex: itemIndex,
    label: label,
    width: width,
    height: height,
    fill: fill,
    shapeStyle: shapeStyle
  }));
}
LegendShape.propTypes = {
  itemIndex: _propTypes.default.number.isRequired,
  margin: _propTypes.default.oneOfType([_propTypes.default.string, _propTypes.default.number]),
  width: _propTypes.default.oneOfType([_propTypes.default.string, _propTypes.default.number]),
  height: _propTypes.default.oneOfType([_propTypes.default.string, _propTypes.default.number])
};