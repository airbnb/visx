"use strict";

exports.__esModule = true;
exports.default = useTooltip;
var _react = require("react");
var _excluded = ["tooltipOpen"];
function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }
function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }
function useTooltip( /** Optional initial TooltipState. */
initialTooltipState) {
  var _useState = (0, _react.useState)(_extends({
      tooltipOpen: false
    }, initialTooltipState)),
    tooltipState = _useState[0],
    setTooltipState = _useState[1];
  var showTooltip = (0, _react.useCallback)(function (showArgs) {
    return setTooltipState(typeof showArgs === 'function' ? function (_ref) {
      var tooltipOpen = _ref.tooltipOpen,
        show = _objectWithoutPropertiesLoose(_ref, _excluded);
      return _extends({}, showArgs(show), {
        tooltipOpen: true
      });
    } : {
      tooltipOpen: true,
      tooltipLeft: showArgs.tooltipLeft,
      tooltipTop: showArgs.tooltipTop,
      tooltipData: showArgs.tooltipData
    });
  }, [setTooltipState]);
  var hideTooltip = (0, _react.useCallback)(function () {
    return setTooltipState({
      tooltipOpen: false,
      tooltipLeft: undefined,
      tooltipTop: undefined,
      tooltipData: undefined
    });
  }, [setTooltipState]);
  return {
    tooltipOpen: tooltipState.tooltipOpen,
    tooltipLeft: tooltipState.tooltipLeft,
    tooltipTop: tooltipState.tooltipTop,
    tooltipData: tooltipState.tooltipData,
    updateTooltip: setTooltipState,
    showTooltip: showTooltip,
    hideTooltip: hideTooltip
  };
}