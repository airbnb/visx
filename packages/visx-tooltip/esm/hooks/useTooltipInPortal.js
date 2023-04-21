var _excluded = ["detectBounds", "zIndex"],
  _excluded2 = ["left", "top", "detectBounds", "zIndex"];
function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }
function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }
import React, { useEffect, useMemo, useState } from 'react';
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
    zIndexOption = _ref.zIndex,
    useMeasureOptions = _objectWithoutPropertiesLoose(_ref, _excluded);
  var _useMeasure = useMeasure(useMeasureOptions),
    containerRef = _useMeasure[0],
    containerBounds = _useMeasure[1],
    forceRefreshBounds = _useMeasure[2];
  var _useState = useState(false),
    isSsr = _useState[0],
    setIsSsr = _useState[1];
  useEffect(function () {
    setIsSsr(false);
  }, []);
  var TooltipInPortal = useMemo(function () {
    return function (_ref2) {
      var _ref2$left = _ref2.left,
        containerLeft = _ref2$left === void 0 ? 0 : _ref2$left,
        _ref2$top = _ref2.top,
        containerTop = _ref2$top === void 0 ? 0 : _ref2$top,
        detectBoundsProp = _ref2.detectBounds,
        zIndexProp = _ref2.zIndex,
        tooltipProps = _objectWithoutPropertiesLoose(_ref2, _excluded2);
      var detectBounds = detectBoundsProp == null ? detectBoundsOption : detectBoundsProp;
      var zIndex = zIndexProp == null ? zIndexOption : zIndexProp;
      var TooltipComponent = detectBounds ? TooltipWithBounds : Tooltip;
      // convert container coordinates to page coordinates
      var scrollX = isSsr ? 0 : window.scrollX;
      var scrollY = isSsr ? 0 : window.scrollY;
      var portalLeft = containerLeft + (containerBounds.left || 0) + scrollX;
      var portalTop = containerTop + (containerBounds.top || 0) + scrollY;
      return /*#__PURE__*/React.createElement(Portal, {
        zIndex: zIndex
      }, /*#__PURE__*/React.createElement(TooltipComponent, _extends({
        left: portalLeft,
        top: portalTop
      }, tooltipProps)));
    };
  }, [detectBoundsOption, zIndexOption, containerBounds.left, containerBounds.top, isSsr]);
  return {
    containerRef: containerRef,
    containerBounds: containerBounds,
    forceRefreshBounds: forceRefreshBounds,
    TooltipInPortal: TooltipInPortal
  };
}