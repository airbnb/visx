"use strict";

exports.__esModule = true;
exports.default = BaseBarGroup;
var _propTypes = _interopRequireDefault(require("prop-types"));
var _react = _interopRequireWildcard(require("react"));
var _scale = require("@visx/scale");
var _DataContext = _interopRequireDefault(require("../../../context/DataContext"));
var _getScaleBandwidth = _interopRequireDefault(require("../../../utils/getScaleBandwidth"));
var _getScaleBaseline = _interopRequireDefault(require("../../../utils/getScaleBaseline"));
var _isValidNumber = _interopRequireDefault(require("../../../typeguards/isValidNumber"));
var _constants = require("../../../constants");
var _useSeriesEvents = _interopRequireDefault(require("../../../hooks/useSeriesEvents"));
var _findNearestGroupDatum = _interopRequireDefault(require("../../../utils/findNearestGroupDatum"));
var _getChildrenAndGrandchildrenWithProps = _interopRequireDefault(require("../../../utils/getChildrenAndGrandchildrenWithProps"));
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }
function BaseBarGroup(_ref) {
  var children = _ref.children,
    _ref$padding = _ref.padding,
    padding = _ref$padding === void 0 ? 0.1 : _ref$padding,
    sortBars = _ref.sortBars,
    BarsComponent = _ref.BarsComponent,
    onBlur = _ref.onBlur,
    onFocus = _ref.onFocus,
    onPointerMove = _ref.onPointerMove,
    onPointerOut = _ref.onPointerOut,
    onPointerUp = _ref.onPointerUp,
    onPointerDown = _ref.onPointerDown,
    _ref$enableEvents = _ref.enableEvents,
    enableEvents = _ref$enableEvents === void 0 ? true : _ref$enableEvents;
  var _ref2 = (0, _react.useContext)(_DataContext.default),
    colorScale = _ref2.colorScale,
    dataRegistry = _ref2.dataRegistry,
    horizontal = _ref2.horizontal,
    registerData = _ref2.registerData,
    unregisterData = _ref2.unregisterData,
    xScale = _ref2.xScale,
    yScale = _ref2.yScale;
  var barSeriesChildren = (0, _react.useMemo)(function () {
    return (0, _getChildrenAndGrandchildrenWithProps.default)(children);
  }, [children]);

  // extract data keys from child series
  var dataKeys = (0, _react.useMemo)(function () {
    return barSeriesChildren.map(function (child) {
      var _child$props$dataKey;
      return (_child$props$dataKey = child.props.dataKey) != null ? _child$props$dataKey : '';
    }).filter(function (key) {
      return key;
    });
  }, [barSeriesChildren]);

  // register all child data
  (0, _react.useEffect)(function () {
    var dataToRegister = barSeriesChildren.map(function (child) {
      var _child$props = child.props,
        key = _child$props.dataKey,
        data = _child$props.data,
        xAccessor = _child$props.xAccessor,
        yAccessor = _child$props.yAccessor;
      return {
        key: key,
        data: data,
        xAccessor: xAccessor,
        yAccessor: yAccessor
      };
    });
    registerData(dataToRegister);
    return function () {
      return unregisterData(dataKeys);
    };
  }, [registerData, unregisterData, barSeriesChildren, dataKeys]);

  // create group scale
  var groupScale = (0, _react.useMemo)(function () {
    return (0, _scale.scaleBand)({
      domain: sortBars ? [].concat(dataKeys).sort(sortBars) : dataKeys,
      range: [0, (0, _getScaleBandwidth.default)(horizontal ? yScale : xScale)],
      padding: padding
    });
  }, [sortBars, dataKeys, xScale, yScale, horizontal, padding]);
  var findNearestDatum = (0, _react.useCallback)(function (params) {
    return (0, _findNearestGroupDatum.default)(params, groupScale, horizontal);
  }, [groupScale, horizontal]);
  var ownEventSourceKey = _constants.BARGROUP_EVENT_SOURCE + "-" + dataKeys.join('-') + "}";
  var eventEmitters = (0, _useSeriesEvents.default)({
    dataKey: dataKeys,
    enableEvents: enableEvents,
    findNearestDatum: findNearestDatum,
    onBlur: onBlur,
    onFocus: onFocus,
    onPointerMove: onPointerMove,
    onPointerOut: onPointerOut,
    onPointerUp: onPointerUp,
    onPointerDown: onPointerDown,
    source: ownEventSourceKey,
    allowedSources: [_constants.XYCHART_EVENT_SOURCE, ownEventSourceKey]
  });
  var xZeroPosition = (0, _react.useMemo)(function () {
    return xScale ? (0, _getScaleBaseline.default)(xScale) : 0;
  }, [xScale]);
  var yZeroPosition = (0, _react.useMemo)(function () {
    return yScale ? (0, _getScaleBaseline.default)(yScale) : 0;
  }, [yScale]);
  var registryEntries = dataKeys.map(function (key) {
    return dataRegistry.get(key);
  });

  // if scales and data are not available in the registry, bail
  if (registryEntries.some(function (entry) {
    return entry == null;
  }) || !xScale || !yScale || !colorScale) {
    return null;
  }
  var barThickness = (0, _getScaleBandwidth.default)(groupScale);
  var barSeries = registryEntries.map(function (_ref3) {
    var _groupScale;
    var xAccessor = _ref3.xAccessor,
      yAccessor = _ref3.yAccessor,
      data = _ref3.data,
      key = _ref3.key;
    var getLength = function getLength(d) {
      var _xScale, _yScale;
      return horizontal ? ((_xScale = xScale(xAccessor(d))) != null ? _xScale : NaN) - xZeroPosition : ((_yScale = yScale(yAccessor(d))) != null ? _yScale : NaN) - yZeroPosition;
    };
    var getGroupPosition = horizontal ? function (d) {
      var _yScale2;
      return (_yScale2 = yScale(yAccessor(d))) != null ? _yScale2 : NaN;
    } : function (d) {
      var _xScale2;
      return (_xScale2 = xScale(xAccessor(d))) != null ? _xScale2 : NaN;
    };
    var withinGroupPosition = (_groupScale = groupScale(key)) != null ? _groupScale : 0;
    var getX = horizontal ? function (d) {
      return xZeroPosition + Math.min(0, getLength(d));
    } : function (d) {
      return getGroupPosition(d) + withinGroupPosition;
    };
    var getY = horizontal ? function (d) {
      return getGroupPosition(d) + withinGroupPosition;
    } : function (d) {
      return yZeroPosition + Math.min(0, getLength(d));
    };
    var getWidth = horizontal ? function (d) {
      return Math.abs(getLength(d));
    } : function () {
      return barThickness;
    };
    var getHeight = horizontal ? function () {
      return barThickness;
    } : function (d) {
      return Math.abs(getLength(d));
    };
    // get props from child BarSeries, if available
    var childBarSeries = barSeriesChildren.find(function (child) {
      return child.props.dataKey === key;
    });
    var _ref4 = (childBarSeries == null ? void 0 : childBarSeries.props) || {},
      colorAccessor = _ref4.colorAccessor,
      radius = _ref4.radius,
      radiusAll = _ref4.radiusAll,
      radiusBottom = _ref4.radiusBottom,
      radiusLeft = _ref4.radiusLeft,
      radiusRight = _ref4.radiusRight,
      radiusTop = _ref4.radiusTop;
    return {
      key: key,
      radius: radius,
      radiusAll: radiusAll,
      radiusBottom: radiusBottom,
      radiusLeft: radiusLeft,
      radiusRight: radiusRight,
      radiusTop: radiusTop,
      bars: data.map(function (bar, index) {
        var _colorAccessor;
        var barX = getX(bar);
        if (!(0, _isValidNumber.default)(barX)) return null;
        var barY = getY(bar);
        if (!(0, _isValidNumber.default)(barY)) return null;
        var barWidth = getWidth(bar);
        if (!(0, _isValidNumber.default)(barWidth)) return null;
        var barHeight = getHeight(bar);
        if (!(0, _isValidNumber.default)(barHeight)) return null;
        return {
          key: key + "-" + index,
          x: barX,
          y: barY,
          width: barWidth,
          height: barHeight,
          fill: (_colorAccessor = colorAccessor == null ? void 0 : colorAccessor(bar, index)) != null ? _colorAccessor : colorScale(key)
        };
      }).filter(function (bar) {
        return bar;
      })
    };
  });
  return /*#__PURE__*/_react.default.createElement("g", {
    className: "visx-bar-group"
  }, barSeries.map(function (series) {
    return series && /*#__PURE__*/_react.default.createElement(BarsComponent, _extends({
      horizontal: horizontal,
      xScale: xScale,
      yScale: yScale
    }, series, eventEmitters, {
      key: series.key
    }));
  }));
}
BaseBarGroup.propTypes = {
  children: _propTypes.default.node.isRequired,
  padding: _propTypes.default.number,
  sortBars: _propTypes.default.func
};