"use strict";

exports.__esModule = true;
exports.default = Linear;
var _propTypes = _interopRequireDefault(require("prop-types"));
var _react = _interopRequireDefault(require("react"));
var _Legend = _interopRequireDefault(require("./Legend"));
var _defaultDomain = _interopRequireDefault(require("../util/defaultDomain"));
var _excluded = ["scale", "domain", "steps"];
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }
function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }
/** Linear scales map from continuous inputs to continuous outputs. */
function Linear(_ref) {
  var scale = _ref.scale,
    inputDomain = _ref.domain,
    _ref$steps = _ref.steps,
    steps = _ref$steps === void 0 ? 5 : _ref$steps,
    restProps = _objectWithoutPropertiesLoose(_ref, _excluded);
  var domain = inputDomain || (0, _defaultDomain.default)({
    steps: steps,
    scale: scale
  });
  return /*#__PURE__*/_react.default.createElement(_Legend.default, _extends({
    scale: scale,
    domain: domain
  }, restProps));
}
Linear.propTypes = {
  steps: _propTypes.default.number
};