"use strict";

exports.__esModule = true;
exports.default = Ribbon;

var _propTypes = _interopRequireDefault(require("prop-types"));

var _react = _interopRequireDefault(require("react"));

var _classnames = _interopRequireDefault(require("classnames"));

var _d3Chord = require("d3-chord");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

/** This is a workaround for TypeScript not inferring the correct method overload */
function setNumberOrNumberAccessor(func, value) {
  if (typeof value === 'number') func(value);else func(value);
}

function Ribbon(_ref) {
  var chord = _ref.chord,
      source = _ref.source,
      target = _ref.target,
      radius = _ref.radius,
      startAngle = _ref.startAngle,
      endAngle = _ref.endAngle,
      children = _ref.children,
      className = _ref.className,
      restProps = _objectWithoutPropertiesLoose(_ref, ["chord", "source", "target", "radius", "startAngle", "endAngle", "children", "className"]);

  var ribbon = (0, _d3Chord.ribbon)();
  if (source) ribbon.source(source);
  if (target) ribbon.target(target);
  if (radius) setNumberOrNumberAccessor(ribbon.radius, radius);
  if (startAngle) setNumberOrNumberAccessor(ribbon.startAngle, startAngle);
  if (endAngle) setNumberOrNumberAccessor(ribbon.endAngle, endAngle);
  var path = ribbon(chord);
  if (children) return /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, children({
    path: path
  }));
  return /*#__PURE__*/_react.default.createElement("path", _extends({
    className: (0, _classnames.default)('visx-ribbon', className),
    d: path || ''
  }, restProps));
}

Ribbon.propTypes = {
  source: _propTypes.default.func,
  target: _propTypes.default.func,
  radius: _propTypes.default.oneOfType([_propTypes.default.number, _propTypes.default.func]),
  startAngle: _propTypes.default.oneOfType([_propTypes.default.number, _propTypes.default.func]),
  endAngle: _propTypes.default.oneOfType([_propTypes.default.number, _propTypes.default.func]),
  children: _propTypes.default.func,
  className: _propTypes.default.string
};