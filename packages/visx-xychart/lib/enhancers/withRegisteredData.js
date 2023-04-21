"use strict";

exports.__esModule = true;
exports.default = withRegisteredData;
var _react = _interopRequireWildcard(require("react"));
var _DataContext = _interopRequireDefault(require("../context/DataContext"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }
/**
 * An HOC that handles registering the Series's data and renders the
 * `BaseSeriesComponent`
 * - only if x and y scales are available in context, and
 * - overrides `props.data/xAccessor/yAccessor` with the values from context.
 * This is useful for avoiding nasty syntax with undefined scales when using
 * hooks, and ensures that data + scales are always matched in the case of
 * prop changes, etc.
 */
function withRegisteredData(BaseSeriesComponent) {
  function WrappedComponent(
  // WrappedComponent props include SeriesProps with appropriate generics
  // and any props in BaseComponentProps that are not in WithRegisteredDataProps
  props) {
    var dataKey = props.dataKey,
      data = props.data,
      xAccessor = props.xAccessor,
      yAccessor = props.yAccessor;
    var _ref = (0, _react.useContext)(_DataContext.default),
      xScale = _ref.xScale,
      yScale = _ref.yScale,
      dataRegistry = _ref.dataRegistry;
    (0, _react.useEffect)(function () {
      if (dataRegistry) dataRegistry.registerData({
        key: dataKey,
        data: data,
        xAccessor: xAccessor,
        yAccessor: yAccessor
      });
      return function () {
        return dataRegistry == null ? void 0 : dataRegistry.unregisterData(dataKey);
      };
    }, [dataRegistry, dataKey, data, xAccessor, yAccessor]);
    var registryEntry = dataRegistry == null ? void 0 : dataRegistry.get(dataKey);

    // if scales or data are not available in context, render nothing
    if (!xScale || !yScale || !registryEntry) return null;

    // TODO coercion might be avoidable with variadic tuples in TS 4
    var BaseComponent = BaseSeriesComponent;

    // otherwise pass props + over-write data/accessors
    return /*#__PURE__*/_react.default.createElement(BaseComponent, _extends({}, props, {
      xScale: xScale,
      yScale: yScale,
      data: registryEntry.data,
      xAccessor: registryEntry.xAccessor,
      yAccessor: registryEntry.yAccessor
    }));
  }
  return WrappedComponent;
}