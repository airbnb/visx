"use strict";

exports.__esModule = true;
exports.default = useTooltipInPortal;
var _react = _interopRequireWildcard(require("react"));
var _reactUseMeasure = _interopRequireDefault(require("react-use-measure"));
var _Portal = _interopRequireDefault(require("../Portal"));
var _Tooltip = _interopRequireDefault(require("../tooltips/Tooltip"));
var _TooltipWithBounds = _interopRequireDefault(require("../tooltips/TooltipWithBounds"));
var _excluded = ["detectBounds", "zIndex"],
  _excluded2 = ["left", "top", "detectBounds", "zIndex"];
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }
function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }
/**
 * Hook that handles rendering of a Tooltip or TooltipWithBounds in a Portal.
 * Handles conversion of container coordinates to page coordinates using the container bounds.
 */
function useTooltipInPortal(_temp) {
  var _ref = _temp === void 0 ? {} : _temp,
    _ref$detectBounds = _ref.detectBounds,
    detectBoundsOption = _ref$detectBounds === void 0 ? true : _ref$detectBounds,
    zIndexOption = _ref.zIndex,
    useMeasureOptions = _objectWithoutPropertiesLoose(_ref, _excluded);
  var _useMeasure = (0, _reactUseMeasure.default)(useMeasureOptions),
    containerRef = _useMeasure[0],
    containerBounds = _useMeasure[1],
    forceRefreshBounds = _useMeasure[2];
  var _useState = (0, _react.useState)(false),
    isSsr = _useState[0],
    setIsSsr = _useState[1];
  (0, _react.useEffect)(function () {
    setIsSsr(false);
  }, []);
  var TooltipInPortal = (0, _react.useMemo)(function () {
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
      var TooltipComponent = detectBounds ? _TooltipWithBounds.default : _Tooltip.default;
      // convert container coordinates to page coordinates
      var scrollX = isSsr ? 0 : window.scrollX;
      var scrollY = isSsr ? 0 : window.scrollY;
      var portalLeft = containerLeft + (containerBounds.left || 0) + scrollX;
      var portalTop = containerTop + (containerBounds.top || 0) + scrollY;
      return /*#__PURE__*/_react.default.createElement(_Portal.default, {
        zIndex: zIndex
      }, /*#__PURE__*/_react.default.createElement(TooltipComponent, _extends({
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