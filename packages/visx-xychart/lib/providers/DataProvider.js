"use strict";

exports.__esModule = true;
exports.default = DataProvider;
var _propTypes = _interopRequireDefault(require("prop-types"));
var _react = _interopRequireWildcard(require("react"));
var _ordinal = _interopRequireDefault(require("@visx/scale/lib/scales/ordinal"));
var _ThemeContext = _interopRequireDefault(require("../context/ThemeContext"));
var _DataContext = _interopRequireDefault(require("../context/DataContext"));
var _useDataRegistry = _interopRequireDefault(require("../hooks/useDataRegistry"));
var _useDimensions2 = _interopRequireDefault(require("../hooks/useDimensions"));
var _useScales2 = _interopRequireDefault(require("../hooks/useScales"));
var _isDiscreteScale = _interopRequireDefault(require("../utils/isDiscreteScale"));
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function DataProvider(_ref) {
  var initialDimensions = _ref.initialDimensions,
    propsTheme = _ref.theme,
    xScaleConfig = _ref.xScale,
    yScaleConfig = _ref.yScale,
    children = _ref.children,
    _ref$horizontal = _ref.horizontal,
    initialHorizontal = _ref$horizontal === void 0 ? 'auto' : _ref$horizontal,
    resizeObserverPolyfill = _ref.resizeObserverPolyfill;
  // `DataProvider` provides a theme so that `ThemeProvider` is not strictly needed.
  // `props.theme` takes precedent over `context.theme`, which has a default even if
  // a ThemeProvider is not present.
  var contextTheme = (0, _react.useContext)(_ThemeContext.default);
  var theme = propsTheme || contextTheme;
  var _useDimensions = (0, _useDimensions2.default)(initialDimensions),
    _useDimensions$ = _useDimensions[0],
    width = _useDimensions$.width,
    height = _useDimensions$.height,
    margin = _useDimensions$.margin,
    setDimensions = _useDimensions[1];
  var innerWidth = Math.max(0, width - margin.left - margin.right);
  var innerHeight = Math.max(0, height - margin.top - margin.bottom);
  var dataRegistry = (0, _useDataRegistry.default)();
  var _useScales = (0, _useScales2.default)({
      dataRegistry: dataRegistry,
      xScaleConfig: xScaleConfig,
      yScaleConfig: yScaleConfig,
      xRange: [margin.left, Math.max(0, width - margin.right)],
      yRange: [Math.max(0, height - margin.bottom), margin.top]
    }),
    xScale = _useScales.xScale,
    yScale = _useScales.yScale;
  var registryKeys = dataRegistry.keys();
  var colorScale = (0, _react.useMemo)(function () {
    return (0, _ordinal.default)({
      domain: registryKeys,
      range: theme.colors
    });
  }, [registryKeys, theme.colors]);
  var horizontal = initialHorizontal === 'auto' ? (0, _isDiscreteScale.default)(yScaleConfig) || yScaleConfig.type === 'time' || yScaleConfig.type === 'utc' : initialHorizontal;
  var value = (0, _react.useMemo)(function () {
    return {
      dataRegistry: dataRegistry,
      registerData: dataRegistry.registerData,
      unregisterData: dataRegistry.unregisterData,
      xScale: xScale,
      yScale: yScale,
      colorScale: colorScale,
      theme: theme,
      width: width,
      height: height,
      margin: margin,
      innerWidth: innerWidth,
      innerHeight: innerHeight,
      setDimensions: setDimensions,
      horizontal: horizontal,
      resizeObserverPolyfill: resizeObserverPolyfill
    };
  },
  // everything here should be memoized between renders
  // to avoid child re-renders
  [colorScale, dataRegistry, height, horizontal, innerHeight, innerWidth, margin, setDimensions, theme, width, xScale, yScale, resizeObserverPolyfill]);
  return /*#__PURE__*/_react.default.createElement(_DataContext.default.Provider, {
    value: value
  }, children);
}
DataProvider.propTypes = {
  children: _propTypes.default.node.isRequired,
  horizontal: _propTypes.default.oneOfType([_propTypes.default.bool, _propTypes.default.oneOf(['auto'])])
};