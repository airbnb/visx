import _pt from "prop-types";
function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }
import React, { useCallback, useMemo, useRef } from 'react';
import debounce from 'lodash/debounce';
import { useTooltip } from '@visx/tooltip';
import TooltipContext from '../context/TooltipContext';
import isValidNumber from '../typeguards/isValidNumber';
/** Simple wrapper around useTooltip, to provide tooltip data via context. */
export default function TooltipProvider(_ref) {
  var _ref$hideTooltipDebou = _ref.hideTooltipDebounceMs,
    hideTooltipDebounceMs = _ref$hideTooltipDebou === void 0 ? 400 : _ref$hideTooltipDebou,
    children = _ref.children;
  var _useTooltip = useTooltip(undefined),
    tooltipOpen = _useTooltip.tooltipOpen,
    tooltipLeft = _useTooltip.tooltipLeft,
    tooltipTop = _useTooltip.tooltipTop,
    tooltipData = _useTooltip.tooltipData,
    updateTooltip = _useTooltip.updateTooltip,
    privateHideTooltip = _useTooltip.hideTooltip;
  var debouncedHideTooltip = useRef(null);
  var showTooltip = useRef(function (_ref2) {
    var svgPoint = _ref2.svgPoint,
      index = _ref2.index,
      key = _ref2.key,
      datum = _ref2.datum,
      distanceX = _ref2.distanceX,
      distanceY = _ref2.distanceY;
    // cancel any hideTooltip calls so it won't hide after invoking the logic below
    if (debouncedHideTooltip.current) {
      debouncedHideTooltip.current.cancel();
      debouncedHideTooltip.current = null;
    }
    var cleanDistanceX = isValidNumber(distanceX) ? distanceX : Infinity;
    var cleanDistanceY = isValidNumber(distanceY) ? distanceY : Infinity;
    var distance = Math.sqrt(Math.pow(cleanDistanceX, 2) + Math.pow(cleanDistanceY, 2));
    updateTooltip(function (_ref3) {
      var _currData$nearestDatu, _currData$nearestDatu2, _extends2;
      var currData = _ref3.tooltipData;
      var currNearestDatumDistance = currData != null && currData.nearestDatum && isValidNumber(currData.nearestDatum.distance) ? currData.nearestDatum.distance : Infinity;
      return {
        tooltipOpen: true,
        tooltipLeft: svgPoint == null ? void 0 : svgPoint.x,
        tooltipTop: svgPoint == null ? void 0 : svgPoint.y,
        tooltipData: {
          nearestDatum: ((_currData$nearestDatu = currData == null ? void 0 : (_currData$nearestDatu2 = currData.nearestDatum) == null ? void 0 : _currData$nearestDatu2.key) != null ? _currData$nearestDatu : '') !== key && currNearestDatumDistance < distance ? currData == null ? void 0 : currData.nearestDatum : {
            key: key,
            index: index,
            datum: datum,
            distance: distance
          },
          datumByKey: _extends({}, currData == null ? void 0 : currData.datumByKey, (_extends2 = {}, _extends2[key] = {
            datum: datum,
            index: index,
            key: key
          }, _extends2))
        }
      };
    });
  });
  var hideTooltip = useCallback(function () {
    debouncedHideTooltip.current = debounce(privateHideTooltip, hideTooltipDebounceMs);
    debouncedHideTooltip.current();
  }, [privateHideTooltip, hideTooltipDebounceMs]);
  var value = useMemo(function () {
    return {
      tooltipOpen: tooltipOpen,
      tooltipLeft: tooltipLeft,
      tooltipTop: tooltipTop,
      tooltipData: tooltipData,
      updateTooltip: updateTooltip,
      showTooltip: showTooltip.current,
      hideTooltip: hideTooltip
    };
  }, [hideTooltip, tooltipData, tooltipLeft, tooltipOpen, tooltipTop, updateTooltip]);
  return /*#__PURE__*/React.createElement(TooltipContext.Provider, {
    value: value
  }, children);
}
TooltipProvider.propTypes = {
  hideTooltipDebounceMs: _pt.number,
  children: _pt.node.isRequired
};