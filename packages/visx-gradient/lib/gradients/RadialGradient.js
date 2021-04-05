"use strict";

exports.__esModule = true;
exports.default = RadialGradient;

var _react = _interopRequireDefault(require("react"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

// passed as rest props to radialGradient
function RadialGradient(_ref) {
  var children = _ref.children,
      id = _ref.id,
      from = _ref.from,
      to = _ref.to,
      _ref$fromOffset = _ref.fromOffset,
      fromOffset = _ref$fromOffset === void 0 ? '0%' : _ref$fromOffset,
      _ref$fromOpacity = _ref.fromOpacity,
      fromOpacity = _ref$fromOpacity === void 0 ? 1 : _ref$fromOpacity,
      _ref$toOffset = _ref.toOffset,
      toOffset = _ref$toOffset === void 0 ? '100%' : _ref$toOffset,
      _ref$toOpacity = _ref.toOpacity,
      toOpacity = _ref$toOpacity === void 0 ? 1 : _ref$toOpacity,
      rotate = _ref.rotate,
      transform = _ref.transform,
      restProps = _objectWithoutPropertiesLoose(_ref, ["children", "id", "from", "to", "fromOffset", "fromOpacity", "toOffset", "toOpacity", "rotate", "transform"]);

  return /*#__PURE__*/_react.default.createElement("defs", null, /*#__PURE__*/_react.default.createElement("radialGradient", _extends({
    id: id,
    gradientTransform: rotate ? "rotate(" + rotate + ")" : transform
  }, restProps), !!children && children, !children && /*#__PURE__*/_react.default.createElement("stop", {
    offset: fromOffset,
    stopColor: from,
    stopOpacity: fromOpacity
  }), !children && /*#__PURE__*/_react.default.createElement("stop", {
    offset: toOffset,
    stopColor: to,
    stopOpacity: toOpacity
  })));
}