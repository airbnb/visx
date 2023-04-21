"use strict";

exports.__esModule = true;
exports.default = Threshold;
var _propTypes = _interopRequireDefault(require("prop-types"));
var _react = _interopRequireDefault(require("react"));
var _classnames = _interopRequireDefault(require("classnames"));
var _shape = require("@visx/shape");
var _clipPath = require("@visx/clip-path");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }
function Threshold(_ref) {
  var className = _ref.className,
    curve = _ref.curve,
    clipAboveTo = _ref.clipAboveTo,
    clipBelowTo = _ref.clipBelowTo,
    data = _ref.data,
    defined = _ref.defined,
    x = _ref.x,
    y0 = _ref.y0,
    y1 = _ref.y1,
    aboveAreaProps = _ref.aboveAreaProps,
    belowAreaProps = _ref.belowAreaProps,
    _ref$id = _ref.id,
    id = _ref$id === void 0 ? '' : _ref$id;
  return /*#__PURE__*/_react.default.createElement("g", {
    className: (0, _classnames.default)('visx-threshold', className)
  }, /*#__PURE__*/_react.default.createElement(_shape.Area, {
    curve: curve,
    data: data,
    x: x,
    y1: y1,
    defined: defined
  }, function (_ref2) {
    var path = _ref2.path;
    // TS cannot infer the correct method overload
    var belowPath = null;
    var abovePath = null;
    if (typeof clipBelowTo === 'number') belowPath = path.y0(clipBelowTo)(data);else belowPath = path.y0(clipBelowTo)(data);
    if (typeof clipAboveTo === 'number') abovePath = path.y0(clipAboveTo)(data);else abovePath = path.y0(clipAboveTo)(data);
    return /*#__PURE__*/_react.default.createElement("g", null, /*#__PURE__*/_react.default.createElement(_clipPath.ClipPath, {
      id: "threshold-clip-below-" + id
    }, /*#__PURE__*/_react.default.createElement("path", {
      d: belowPath || ''
    })), /*#__PURE__*/_react.default.createElement(_clipPath.ClipPath, {
      id: "threshold-clip-above-" + id
    }, /*#__PURE__*/_react.default.createElement("path", {
      d: abovePath || ''
    })));
  }), /*#__PURE__*/_react.default.createElement(_shape.Area, _extends({
    curve: curve,
    data: data,
    defined: defined,
    x: x,
    y0: y0,
    y1: y1,
    strokeWidth: 0,
    clipPath: "url(#threshold-clip-below-" + id + ")"
  }, belowAreaProps)), /*#__PURE__*/_react.default.createElement(_shape.Area, _extends({
    curve: curve,
    data: data,
    defined: defined,
    x: x,
    y0: y0,
    y1: y1,
    strokeWidth: 0,
    clipPath: "url(#threshold-clip-above-" + id + ")"
  }, aboveAreaProps)));
}
Threshold.propTypes = {
  className: _propTypes.default.string,
  clipAboveTo: _propTypes.default.oneOfType([_propTypes.default.func, _propTypes.default.number]).isRequired,
  clipBelowTo: _propTypes.default.oneOfType([_propTypes.default.func, _propTypes.default.number]).isRequired,
  id: _propTypes.default.string.isRequired,
  data: _propTypes.default.array.isRequired,
  defined: _propTypes.default.func,
  x: _propTypes.default.oneOfType([_propTypes.default.func, _propTypes.default.number]).isRequired,
  y0: _propTypes.default.oneOfType([_propTypes.default.func, _propTypes.default.number]).isRequired,
  y1: _propTypes.default.oneOfType([_propTypes.default.func, _propTypes.default.number]).isRequired
};