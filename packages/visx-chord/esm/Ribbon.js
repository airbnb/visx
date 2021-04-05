import _pt from "prop-types";

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

import React from 'react';
import cx from 'classnames';
import { ribbon as d3ribbon } from 'd3-chord';

/** This is a workaround for TypeScript not inferring the correct method overload */
function setNumberOrNumberAccessor(func, value) {
  if (typeof value === 'number') func(value);else func(value);
}

export default function Ribbon(_ref) {
  var chord = _ref.chord,
      source = _ref.source,
      target = _ref.target,
      radius = _ref.radius,
      startAngle = _ref.startAngle,
      endAngle = _ref.endAngle,
      children = _ref.children,
      className = _ref.className,
      restProps = _objectWithoutPropertiesLoose(_ref, ["chord", "source", "target", "radius", "startAngle", "endAngle", "children", "className"]);

  var ribbon = d3ribbon();
  if (source) ribbon.source(source);
  if (target) ribbon.target(target);
  if (radius) setNumberOrNumberAccessor(ribbon.radius, radius);
  if (startAngle) setNumberOrNumberAccessor(ribbon.startAngle, startAngle);
  if (endAngle) setNumberOrNumberAccessor(ribbon.endAngle, endAngle);
  var path = ribbon(chord);
  if (children) return /*#__PURE__*/React.createElement(React.Fragment, null, children({
    path: path
  }));
  return /*#__PURE__*/React.createElement("path", _extends({
    className: cx('visx-ribbon', className),
    d: path || ''
  }, restProps));
}
Ribbon.propTypes = {
  source: _pt.func,
  target: _pt.func,
  radius: _pt.oneOfType([_pt.number, _pt.func]),
  startAngle: _pt.oneOfType([_pt.number, _pt.func]),
  endAngle: _pt.oneOfType([_pt.number, _pt.func]),
  children: _pt.func,
  className: _pt.string
};