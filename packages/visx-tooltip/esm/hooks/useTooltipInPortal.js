function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

import React, { useMemo } from 'react';
import useMeasure from 'react-use-measure';
import Portal from '../Portal';
import Tooltip from '../tooltips/Tooltip';
import TooltipWithBounds from '../tooltips/TooltipWithBounds';

/**
 * Hook that handles rendering of a Tooltip or TooltipWithBounds in a Portal.
 * Handles conversion of container coordinates to page coordinates using the container bounds.
 */
export default function useTooltipInPortal(_temp) {
  var _ref = _temp === void 0 ? {} : _temp,
      _ref$detectBounds = _ref.detectBounds,
      detectBoundsOption = _ref$detectBounds === void 0 ? true : _ref$detectBounds,
      useMeasureOptions = _objectWithoutPropertiesLoose(_ref, ["detectBounds"]);

  var _useMeasure = useMeasure(useMeasureOptions),
      containerRef = _useMeasure[0],
      containerBounds = _useMeasure[1],
      forceRefreshBounds = _useMeasure[2];

  var TooltipInPortal = useMemo(function () {
    return function (_ref2) {
      var _ref2$left = _ref2.left,
          containerLeft = _ref2$left === void 0 ? 0 : _ref2$left,
          _ref2$top = _ref2.top,
          containerTop = _ref2$top === void 0 ? 0 : _ref2$top,
          detectBoundsProp = _ref2.detectBounds,
          tooltipProps = _objectWithoutPropertiesLoose(_ref2, ["left", "top", "detectBounds"]);

      var detectBounds = detectBoundsProp == null ? detectBoundsOption : detectBoundsProp;
      var TooltipComponent = detectBounds ? TooltipWithBounds : Tooltip; // convert container coordinates to page coordinates

      var portalLeft = containerLeft + (containerBounds.left || 0) + window.scrollX;
      var portalTop = containerTop + (containerBounds.top || 0) + window.scrollY;
      return /*#__PURE__*/React.createElement(Portal, null, /*#__PURE__*/React.createElement(TooltipComponent, _extends({
        left: portalLeft,
        top: portalTop
      }, tooltipProps)));
    };
  }, [detectBoundsOption, containerBounds.left, containerBounds.top]);
  return {
    // react-use-measure doesn't currently accept SVGElement refs
    // @ts-ignore fixed here https://github.com/react-spring/react-use-measure/pull/17
    containerRef: containerRef,
    containerBounds: containerBounds,
    forceRefreshBounds: forceRefreshBounds,
    TooltipInPortal: TooltipInPortal
  };
}