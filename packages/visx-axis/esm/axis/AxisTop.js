function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

import React from 'react';
import cx from 'classnames';
import Axis from './Axis';
import Orientation from '../constants/orientation';
export var topTickLabelProps = function topTickLabelProps() {
  return (
    /** tickValue, index */
    {
      dy: '-0.75em',
      fill: '#222',
      fontFamily: 'Arial',
      fontSize: 10,
      textAnchor: 'middle'
    }
  );
};
export default function AxisTop(_ref) {
  var axisClassName = _ref.axisClassName,
      _ref$labelOffset = _ref.labelOffset,
      labelOffset = _ref$labelOffset === void 0 ? 8 : _ref$labelOffset,
      _ref$tickLabelProps = _ref.tickLabelProps,
      tickLabelProps = _ref$tickLabelProps === void 0 ? topTickLabelProps : _ref$tickLabelProps,
      _ref$tickLength = _ref.tickLength,
      tickLength = _ref$tickLength === void 0 ? 8 : _ref$tickLength,
      restProps = _objectWithoutPropertiesLoose(_ref, ["axisClassName", "labelOffset", "tickLabelProps", "tickLength"]);

  return /*#__PURE__*/React.createElement(Axis, _extends({
    axisClassName: cx('visx-axis-top', axisClassName),
    labelOffset: labelOffset,
    orientation: Orientation.top,
    tickLabelProps: tickLabelProps,
    tickLength: tickLength
  }, restProps));
}