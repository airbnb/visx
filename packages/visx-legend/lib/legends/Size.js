"use strict";

exports.__esModule = true;
exports.default = Size;
var _propTypes = _interopRequireDefault(require("prop-types"));
var _react = _interopRequireDefault(require("react"));
var _Legend = _interopRequireDefault(require("./Legend"));
var _labelTransformFactory = _interopRequireDefault(require("../util/labelTransformFactory"));
var _defaultDomain = _interopRequireDefault(require("../util/defaultDomain"));
var _identity = _interopRequireDefault(require("../util/identity"));
var _excluded = ["scale", "domain", "steps", "labelFormat", "labelTransform"];
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }
function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }
function Size(_ref) {
  var scale = _ref.scale,
    inputDomain = _ref.domain,
    _ref$steps = _ref.steps,
    steps = _ref$steps === void 0 ? 5 : _ref$steps,
    _ref$labelFormat = _ref.labelFormat,
    labelFormat = _ref$labelFormat === void 0 ? _identity.default : _ref$labelFormat,
    _ref$labelTransform = _ref.labelTransform,
    labelTransform = _ref$labelTransform === void 0 ? _labelTransformFactory.default : _ref$labelTransform,
    restProps = _objectWithoutPropertiesLoose(_ref, _excluded);
  var domain = inputDomain || (0, _defaultDomain.default)({
    steps: steps,
    scale: scale
  });
  return /*#__PURE__*/_react.default.createElement(_Legend.default, _extends({
    scale: scale,
    domain: domain,
    labelFormat: labelFormat,
    labelTransform: labelTransform
  }, restProps));
}
Size.propTypes = {
  steps: _propTypes.default.number
};