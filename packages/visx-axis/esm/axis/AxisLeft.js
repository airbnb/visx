var _excluded = ["axisClassName", "labelOffset", "tickLength", "tickLabelProps"];
function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }
function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }
import React from 'react';
import cx from 'classnames';
import Axis from './Axis';
import Orientation from '../constants/orientation';
export var leftTickLabelProps = {
  dx: '-0.25em',
  dy: '0.25em',
  fill: '#222',
  fontFamily: 'Arial',
  fontSize: 10,
  textAnchor: 'end'
};
export default function AxisLeft(_ref) {
  var axisClassName = _ref.axisClassName,
    _ref$labelOffset = _ref.labelOffset,
    labelOffset = _ref$labelOffset === void 0 ? 36 : _ref$labelOffset,
    _ref$tickLength = _ref.tickLength,
    tickLength = _ref$tickLength === void 0 ? 8 : _ref$tickLength,
    tickLabelProps = _ref.tickLabelProps,
    restProps = _objectWithoutPropertiesLoose(_ref, _excluded);
  var tickLabelPropsFinal = typeof tickLabelProps === 'function' ? tickLabelProps : _extends({}, leftTickLabelProps, tickLabelProps);
  return /*#__PURE__*/React.createElement(Axis, _extends({
    axisClassName: cx('visx-axis-left', axisClassName),
    labelOffset: labelOffset,
    orientation: Orientation.left,
    tickLabelProps: tickLabelPropsFinal,
    tickLength: tickLength
  }, restProps));
}