"use strict";

exports.__esModule = true;
exports.default = TooltipProvider;
var _propTypes = _interopRequireDefault(require("prop-types"));
var _react = _interopRequireWildcard(require("react"));
var _debounce = _interopRequireDefault(require("lodash/debounce"));
var _tooltip = require("@visx/tooltip");
var _TooltipContext = _interopRequireDefault(require("../context/TooltipContext"));
var _isValidNumber = _interopRequireDefault(require("../typeguards/isValidNumber"));
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }
/** Simple wrapper around useTooltip, to provide tooltip data via context. */
function TooltipProvider(_ref) {
  var _ref$hideTooltipDebou = _ref.hideTooltipDebounceMs,
    hideTooltipDebounceMs = _ref$hideTooltipDebou === void 0 ? 400 : _ref$hideTooltipDebou,
    children = _ref.children;
  var _useTooltip = (0, _tooltip.useTooltip)(undefined),
    tooltipOpen = _useTooltip.tooltipOpen,
    tooltipLeft = _useTooltip.tooltipLeft,
    tooltipTop = _useTooltip.tooltipTop,
    tooltipData = _useTooltip.tooltipData,
    updateTooltip = _useTooltip.updateTooltip,
    privateHideTooltip = _useTooltip.hideTooltip;
  var debouncedHideTooltip = (0, _react.useRef)(null);
  var showTooltip = (0, _react.useRef)(function (_ref2) {
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
    var cleanDistanceX = (0, _isValidNumber.default)(distanceX) ? distanceX : Infinity;
    var cleanDistanceY = (0, _isValidNumber.default)(distanceY) ? distanceY : Infinity;
    var distance = Math.sqrt(Math.pow(cleanDistanceX, 2) + Math.pow(cleanDistanceY, 2));
    updateTooltip(function (_ref3) {
      var _currData$nearestDatu, _currData$nearestDatu2, _extends2;
      var currData = _ref3.tooltipData;
      var currNearestDatumDistance = currData != null && currData.nearestDatum && (0, _isValidNumber.default)(currData.nearestDatum.distance) ? currData.nearestDatum.distance : Infinity;
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
  var hideTooltip = (0, _react.useCallback)(function () {
    debouncedHideTooltip.current = (0, _debounce.default)(privateHideTooltip, hideTooltipDebounceMs);
    debouncedHideTooltip.current();
  }, [privateHideTooltip, hideTooltipDebounceMs]);
  var value = (0, _react.useMemo)(function () {
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
  return /*#__PURE__*/_react.default.createElement(_TooltipContext.default.Provider, {
    value: value
  }, children);
}
TooltipProvider.propTypes = {
  hideTooltipDebounceMs: _propTypes.default.number,
  children: _propTypes.default.node.isRequired
};