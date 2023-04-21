import _pt from "prop-types";
var _excluded = ["animationTrajectory", "tickComponent"];
function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }
function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }
import React, { useMemo } from 'react';
import Axis from '@visx/axis/lib/axis/Axis';
import AnimatedTicks from './AnimatedTicks';
export default function AnimatedAxis(_ref) {
  var animationTrajectory = _ref.animationTrajectory,
    tickComponent = _ref.tickComponent,
    axisProps = _objectWithoutPropertiesLoose(_ref, _excluded);
  // wrap the ticksComponent so we can pass animationTrajectory
  var ticksComponent = useMemo(function () {
    return (
      // eslint-disable-next-line react/no-unstable-nested-components
      function TicksComponent(ticks) {
        return /*#__PURE__*/React.createElement(AnimatedTicks, _extends({}, ticks, {
          tickComponent: tickComponent,
          animationTrajectory: animationTrajectory
        }));
      }
    );
  }, [animationTrajectory, tickComponent]);
  return /*#__PURE__*/React.createElement(Axis, _extends({}, axisProps, {
    ticksComponent: ticksComponent
  }));
}