"use strict";

exports.__esModule = true;
exports.default = void 0;
var _propTypes = _interopRequireDefault(require("prop-types"));
var _react = _interopRequireWildcard(require("react"));
var _shape = require("@visx/shape");
var _Area = _interopRequireDefault(require("@visx/shape/lib/shapes/Area"));
var _scale = require("@visx/scale");
var _accessors = require("@visx/shape/lib/util/accessors");
var _DataContext = _interopRequireDefault(require("../../../context/DataContext"));
var _BaseGlyphSeries = require("./BaseGlyphSeries");
var _useStackedData2 = _interopRequireDefault(require("../../../hooks/useStackedData"));
var _combineBarStackData = require("../../../utils/combineBarStackData");
var _isValidNumber = _interopRequireDefault(require("../../../typeguards/isValidNumber"));
var _findNearestStackDatum = _interopRequireDefault(require("../../../utils/findNearestStackDatum"));
var _constants = require("../../../constants");
var _useSeriesEvents = _interopRequireDefault(require("../../../hooks/useSeriesEvents"));
var _defaultRenderGlyph = _interopRequireDefault(require("./defaultRenderGlyph"));
var _getScaleBandwidth = _interopRequireDefault(require("../../../utils/getScaleBandwidth"));
var _excluded = ["data", "dataKey", "xAccessor", "yAccessor", "curve", "PathComponent", "lineProps", "renderLine"];
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }
function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }
var identity = function identity(_) {
  return _;
};
function BaseAreaStack(_ref) {
  var _ref$PathComponent = _ref.PathComponent,
    PathComponent = _ref$PathComponent === void 0 ? 'path' : _ref$PathComponent,
    children = _ref.children,
    curve = _ref.curve,
    _ref$enableEvents = _ref.enableEvents,
    enableEvents = _ref$enableEvents === void 0 ? true : _ref$enableEvents,
    offset = _ref.offset,
    onBlur = _ref.onBlur,
    onFocus = _ref.onFocus,
    onPointerMove = _ref.onPointerMove,
    onPointerOut = _ref.onPointerOut,
    onPointerUp = _ref.onPointerUp,
    onPointerDown = _ref.onPointerDown,
    order = _ref.order,
    _ref$renderLine = _ref.renderLine,
    renderLine = _ref$renderLine === void 0 ? true : _ref$renderLine;
  var _ref2 = (0, _react.useContext)(_DataContext.default),
    colorScale = _ref2.colorScale,
    dataRegistry = _ref2.dataRegistry,
    horizontal = _ref2.horizontal,
    xScale = _ref2.xScale,
    yScale = _ref2.yScale,
    theme = _ref2.theme;
  var _useStackedData = (0, _useStackedData2.default)({
      children: children,
      order: order,
      offset: offset
    }),
    dataKeys = _useStackedData.dataKeys,
    seriesChildren = _useStackedData.seriesChildren,
    stackedData = _useStackedData.stackedData;

  // accessor functions for the stack generator
  var accessors = (0, _react.useMemo)(function () {
    var xOffset = (0, _getScaleBandwidth.default)(xScale) / 2;
    var yOffset = (0, _getScaleBandwidth.default)(yScale) / 2;
    return horizontal ? {
      y: function y(d) {
        var _coerceNumber;
        return ((_coerceNumber = (0, _scale.coerceNumber)(yScale((0, _combineBarStackData.getStackValue)(d.data)))) != null ? _coerceNumber : 0) + yOffset;
      },
      x0: function x0(d) {
        var _coerceNumber2;
        return ((_coerceNumber2 = (0, _scale.coerceNumber)(xScale((0, _accessors.getFirstItem)(d)))) != null ? _coerceNumber2 : 0) + xOffset;
      },
      x1: function x1(d) {
        var _coerceNumber3;
        return ((_coerceNumber3 = (0, _scale.coerceNumber)(xScale((0, _accessors.getSecondItem)(d)))) != null ? _coerceNumber3 : 0) + xOffset;
      },
      defined: function defined(d) {
        return (0, _isValidNumber.default)(yScale((0, _combineBarStackData.getStackValue)(d.data))) && (0, _isValidNumber.default)(xScale((0, _accessors.getSecondItem)(d)));
      }
    } : {
      x: function x(d) {
        var _coerceNumber4;
        return ((_coerceNumber4 = (0, _scale.coerceNumber)(xScale((0, _combineBarStackData.getStackValue)(d.data)))) != null ? _coerceNumber4 : 0) + xOffset;
      },
      y0: function y0(d) {
        var _coerceNumber5;
        return ((_coerceNumber5 = (0, _scale.coerceNumber)(yScale((0, _accessors.getFirstItem)(d)))) != null ? _coerceNumber5 : 0) + yOffset;
      },
      y1: function y1(d) {
        var _coerceNumber6;
        return ((_coerceNumber6 = (0, _scale.coerceNumber)(yScale((0, _accessors.getSecondItem)(d)))) != null ? _coerceNumber6 : 0) + yOffset;
      },
      defined: function defined(d) {
        return (0, _isValidNumber.default)(xScale((0, _combineBarStackData.getStackValue)(d.data))) && (0, _isValidNumber.default)(yScale((0, _accessors.getSecondItem)(d)));
      }
    };
  }, [xScale, yScale, horizontal]);

  // pull out all area + line props for each dataKey
  var stacks = (0, _react.useMemo)(function () {
    return stackedData.map(function (stack, stackIndex) {
      var _ref4, _colorScale, _theme$colors;
      var areaSeries = seriesChildren.find(function (child) {
        return child.props.dataKey === stack.key;
      });
      var _ref3 = (areaSeries == null ? void 0 : areaSeries.props) || {},
        data = _ref3.data,
        dataKey = _ref3.dataKey,
        xAccessor = _ref3.xAccessor,
        yAccessor = _ref3.yAccessor,
        _ = _ref3.curve,
        __ = _ref3.PathComponent,
        lineProps = _ref3.lineProps,
        ___ = _ref3.renderLine,
        svgPathProps = _objectWithoutPropertiesLoose(_ref3, _excluded);
      var areaProps = _extends({
        fill: (_ref4 = (_colorScale = colorScale == null ? void 0 : colorScale(stack.key)) != null ? _colorScale : theme == null ? void 0 : (_theme$colors = theme.colors) == null ? void 0 : _theme$colors[0]) != null ? _ref4 : '#222'
      }, svgPathProps);
      return {
        key: stackIndex + "-" + stack.key,
        accessors: accessors,
        data: stack,
        areaProps: areaProps,
        lineProps: lineProps
      };
    });
  }, [stackedData, accessors, colorScale, seriesChildren, theme]);

  // custom logic to find the nearest AreaStackDatum (context) and return the original Datum (props)
  var findNearestDatum = (0, _react.useCallback)(function (params) {
    var _seriesChildren$find, _seriesChildren$find$;
    var childData = (_seriesChildren$find = seriesChildren.find(function (child) {
      return child.props.dataKey === params.dataKey;
    })) == null ? void 0 : (_seriesChildren$find$ = _seriesChildren$find.props) == null ? void 0 : _seriesChildren$find$.data;
    return childData ? (0, _findNearestStackDatum.default)(params, childData, horizontal) : null;
  }, [seriesChildren, horizontal]);
  var ownEventSourceKey = _constants.AREASTACK_EVENT_SOURCE + "-" + dataKeys.join('-');
  var eventEmitters = (0, _useSeriesEvents.default)({
    dataKey: dataKeys,
    enableEvents: enableEvents,
    // @ts-expect-error Datum input + return type are expected to be the same type but they differ
    // for AreaStack (registry data is StackedDatum, return type is user Datum)
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

  // render invisible glyphs for focusing if onFocus/onBlur are defined
  var captureFocusEvents = Boolean(onFocus || onBlur);
  var renderGlyphs = (0, _react.useCallback)(function (_ref5) {
    var glyphs = _ref5.glyphs;
    return captureFocusEvents ? glyphs.map(function (glyph) {
      return /*#__PURE__*/_react.default.createElement(_react.default.Fragment, {
        key: glyph.key
      }, (0, _defaultRenderGlyph.default)(_extends({}, glyph, {
        color: 'transparent',
        onFocus: eventEmitters.onFocus,
        onBlur: eventEmitters.onBlur
      })));
    }) : null;
  }, [captureFocusEvents, eventEmitters.onFocus, eventEmitters.onBlur]);

  // if scales and data are not available in the registry, bail
  if (dataKeys.some(function (key) {
    return dataRegistry.get(key) == null;
  }) || !xScale || !yScale || !colorScale) {
    return null;
  }
  return /*#__PURE__*/_react.default.createElement("g", {
    className: "visx-area-stack"
  }, stacks.map(function (stack) {
    return /*#__PURE__*/_react.default.createElement(_Area.default, _extends({
      key: stack.key,
      curve: curve
    }, stack.accessors), function (_ref6) {
      var path = _ref6.path;
      return /*#__PURE__*/_react.default.createElement(PathComponent, _extends({
        className: "visx-area",
        stroke: "transparent",
        d: path(stack.data) || ''
      }, stack.areaProps, eventEmitters));
    });
  }), renderLine && stacks.map(function (stack) {
    return /*#__PURE__*/_react.default.createElement(_shape.LinePath, _extends({
      key: "line-" + stack.key
      // note: this currently doesn't work well for offset=wiggle
      // because it only draws a single line. with two lines you
      // get overlap across stacks :/
      ,
      x: stack.accessors.x || stack.accessors.x1,
      y: stack.accessors.y || stack.accessors.y1,
      defined: stack.accessors.defined,
      curve: curve
    }, stack.lineProps), function (_ref7) {
      var path = _ref7.path;
      return /*#__PURE__*/_react.default.createElement(PathComponent, _extends({
        className: "visx-line",
        fill: "transparent",
        stroke: stack.areaProps.fill,
        strokeWidth: 2,
        pointerEvents: "none"
      }, stack.lineProps, {
        d: path(stack.data) || ''
      }));
    });
  }), captureFocusEvents && stacks.map(function (_, i) {
    // render in reverse stack order tab to top-values first
    var stack = stacks[stacks.length - i - 1];
    return (
      /*#__PURE__*/
      // @ts-expect-error doesn't like unknown, identity functions aren't typical scales
      _react.default.createElement(_BaseGlyphSeries.BaseGlyphSeries, {
        key: "glyphs-" + stack.key,
        dataKey: stack.key,
        data: stack.data,
        xAccessor: stack.accessors.x || stack.accessors.x1,
        yAccessor: stack.accessors.y || stack.accessors.y1
        // accessors include scaling, so just return the scaled value
        ,
        xScale: identity,
        yScale: identity,
        renderGlyphs: renderGlyphs
      })
    );
  }));
}
BaseAreaStack.propTypes = {
  children: _propTypes.default.oneOfType([_propTypes.default.element, _propTypes.default.arrayOf(_propTypes.default.element)]).isRequired,
  renderLine: _propTypes.default.bool
};
var _default = BaseAreaStack;
exports.default = _default;