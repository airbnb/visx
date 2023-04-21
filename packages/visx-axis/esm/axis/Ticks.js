function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }
import React from 'react';
import cx from 'classnames';
import { Line } from '@visx/shape';
import { Group } from '@visx/group';
import { Text } from '@visx/text';
import Orientation from '../constants/orientation';
export default function Ticks(_ref) {
  var hideTicks = _ref.hideTicks,
    horizontal = _ref.horizontal,
    orientation = _ref.orientation,
    tickClassName = _ref.tickClassName,
    tickComponent = _ref.tickComponent,
    allTickLabelProps = _ref.tickLabelProps,
    _ref$tickStroke = _ref.tickStroke,
    tickStroke = _ref$tickStroke === void 0 ? '#222' : _ref$tickStroke,
    tickTransform = _ref.tickTransform,
    ticks = _ref.ticks,
    strokeWidth = _ref.strokeWidth,
    tickLineProps = _ref.tickLineProps;
  return ticks.map(function (_ref2) {
    var _allTickLabelProps$in;
    var value = _ref2.value,
      index = _ref2.index,
      from = _ref2.from,
      to = _ref2.to,
      formattedValue = _ref2.formattedValue;
    var tickLabelProps = (_allTickLabelProps$in = allTickLabelProps[index]) != null ? _allTickLabelProps$in : {};
    var tickLabelFontSize = Math.max(10, typeof tickLabelProps.fontSize === 'number' && tickLabelProps.fontSize || 0);
    var tickYCoord = to.y + (horizontal && orientation !== Orientation.top ? tickLabelFontSize : 0);
    return /*#__PURE__*/React.createElement(Group, {
      key: "visx-tick-" + value + "-" + index,
      className: cx('visx-axis-tick', tickClassName),
      transform: tickTransform
    }, !hideTicks && /*#__PURE__*/React.createElement(Line, _extends({
      from: from,
      to: to,
      stroke: tickStroke,
      strokeWidth: strokeWidth,
      strokeLinecap: "square"
    }, tickLineProps)), tickComponent ? tickComponent(_extends({}, tickLabelProps, {
      x: to.x,
      y: tickYCoord,
      formattedValue: formattedValue
    })) : /*#__PURE__*/React.createElement(Text, _extends({
      x: to.x,
      y: tickYCoord
    }, tickLabelProps), formattedValue));
  });
}