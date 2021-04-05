"use strict";

exports.__esModule = true;
exports.default = useTooltipInPortal;

var _react = _interopRequireWildcard(require("react"));

var _reactUseMeasure = _interopRequireDefault(require("react-use-measure"));

var _Portal = _interopRequireDefault(require("../Portal"));

var _Tooltip = _interopRequireDefault(require("../tooltips/Tooltip"));

var _TooltipWithBounds = _interopRequireDefault(require("../tooltips/TooltipWithBounds"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

/**
 * Hook that handles rendering of a Tooltip or TooltipWithBounds in a Portal.
 * Handles conversion of container coordinates to page coordinates using the container bounds.
 */
function useTooltipInPortal(_temp) {
  var _ref = _temp === void 0 ? {} : _temp,
      _ref$detectBounds = _ref.detectBounds,
      detectBoundsOption = _ref$detectBounds === void 0 ? true : _ref$detectBounds,
      useMeasureOptions = _objectWithoutPropertiesLoose(_ref, ["detectBounds"]);

  var _useMeasure = (0, _reactUseMeasure.default)(useMeasureOptions),
      containerRef = _useMeasure[0],
      containerBounds = _useMeasure[1],
      forceRefreshBounds = _useMeasure[2];

  var TooltipInPortal = (0, _react.useMemo)(function () {
    return function (_ref2) {
      var _ref2$left = _ref2.left,
          containerLeft = _ref2$left === void 0 ? 0 : _ref2$left,
          _ref2$top = _ref2.top,
          containerTop = _ref2$top === void 0 ? 0 : _ref2$top,
          detectBoundsProp = _ref2.detectBounds,
          tooltipProps = _objectWithoutPropertiesLoose(_ref2, ["left", "top", "detectBounds"]);

      var detectBounds = detectBoundsProp == null ? detectBoundsOption : detectBoundsProp;
      var TooltipComponent = detectBounds ? _TooltipWithBounds.default : _Tooltip.default; // convert container coordinates to page coordinates

      var portalLeft = containerLeft + (containerBounds.left || 0) + window.scrollX;
      var portalTop = containerTop + (containerBounds.top || 0) + window.scrollY;
      return /*#__PURE__*/_react.default.createElement(_Portal.default, null, /*#__PURE__*/_react.default.createElement(TooltipComponent, _extends({
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