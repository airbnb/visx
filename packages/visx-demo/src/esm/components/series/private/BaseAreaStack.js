import _pt from "prop-types";
var _excluded = ["data", "dataKey", "xAccessor", "yAccessor", "curve", "PathComponent", "lineProps", "renderLine"];
function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }
function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }
import React, { useCallback, useContext, useMemo } from 'react';
import { LinePath } from '@visx/shape';
import Area from '@visx/shape/lib/shapes/Area';
import { coerceNumber } from '@visx/scale';
import { getFirstItem, getSecondItem } from '@visx/shape/lib/util/accessors';
import DataContext from '../../../context/DataContext';
import { BaseGlyphSeries } from './BaseGlyphSeries';
import useStackedData from '../../../hooks/useStackedData';
import { getStackValue } from '../../../utils/combineBarStackData';
import isValidNumber from '../../../typeguards/isValidNumber';
import findNearestStackDatum from '../../../utils/findNearestStackDatum';
import { AREASTACK_EVENT_SOURCE, XYCHART_EVENT_SOURCE } from '../../../constants';
import useSeriesEvents from '../../../hooks/useSeriesEvents';
import defaultRenderGlyph from './defaultRenderGlyph';
import getScaleBandwidth from '../../../utils/getScaleBandwidth';
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
  var _ref2 = useContext(DataContext),
    colorScale = _ref2.colorScale,
    dataRegistry = _ref2.dataRegistry,
    horizontal = _ref2.horizontal,
    xScale = _ref2.xScale,
    yScale = _ref2.yScale,
    theme = _ref2.theme;
  var _useStackedData = useStackedData({
      children: children,
      order: order,
      offset: offset
    }),
    dataKeys = _useStackedData.dataKeys,
    seriesChildren = _useStackedData.seriesChildren,
    stackedData = _useStackedData.stackedData;

  // accessor functions for the stack generator
  var accessors = useMemo(function () {
    var xOffset = getScaleBandwidth(xScale) / 2;
    var yOffset = getScaleBandwidth(yScale) / 2;
    return horizontal ? {
      y: function y(d) {
        var _coerceNumber;
        return ((_coerceNumber = coerceNumber(yScale(getStackValue(d.data)))) != null ? _coerceNumber : 0) + yOffset;
      },
      x0: function x0(d) {
        var _coerceNumber2;
        return ((_coerceNumber2 = coerceNumber(xScale(getFirstItem(d)))) != null ? _coerceNumber2 : 0) + xOffset;
      },
      x1: function x1(d) {
        var _coerceNumber3;
        return ((_coerceNumber3 = coerceNumber(xScale(getSecondItem(d)))) != null ? _coerceNumber3 : 0) + xOffset;
      },
      defined: function defined(d) {
        return isValidNumber(yScale(getStackValue(d.data))) && isValidNumber(xScale(getSecondItem(d)));
      }
    } : {
      x: function x(d) {
        var _coerceNumber4;
        return ((_coerceNumber4 = coerceNumber(xScale(getStackValue(d.data)))) != null ? _coerceNumber4 : 0) + xOffset;
      },
      y0: function y0(d) {
        var _coerceNumber5;
        return ((_coerceNumber5 = coerceNumber(yScale(getFirstItem(d)))) != null ? _coerceNumber5 : 0) + yOffset;
      },
      y1: function y1(d) {
        var _coerceNumber6;
        return ((_coerceNumber6 = coerceNumber(yScale(getSecondItem(d)))) != null ? _coerceNumber6 : 0) + yOffset;
      },
      defined: function defined(d) {
        return isValidNumber(xScale(getStackValue(d.data))) && isValidNumber(yScale(getSecondItem(d)));
      }
    };
  }, [xScale, yScale, horizontal]);

  // pull out all area + line props for each dataKey
  var stacks = useMemo(function () {
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
  var findNearestDatum = useCallback(function (params) {
    var _seriesChildren$find, _seriesChildren$find$;
    var childData = (_seriesChildren$find = seriesChildren.find(function (child) {
      return child.props.dataKey === params.dataKey;
    })) == null ? void 0 : (_seriesChildren$find$ = _seriesChildren$find.props) == null ? void 0 : _seriesChildren$find$.data;
    return childData ? findNearestStackDatum(params, childData, horizontal) : null;
  }, [seriesChildren, horizontal]);
  var ownEventSourceKey = AREASTACK_EVENT_SOURCE + "-" + dataKeys.join('-');
  var eventEmitters = useSeriesEvents({
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
    allowedSources: [XYCHART_EVENT_SOURCE, ownEventSourceKey]
  });

  // render invisible glyphs for focusing if onFocus/onBlur are defined
  var captureFocusEvents = Boolean(onFocus || onBlur);
  var renderGlyphs = useCallback(function (_ref5) {
    var glyphs = _ref5.glyphs;
    return captureFocusEvents ? glyphs.map(function (glyph) {
      return /*#__PURE__*/React.createElement(React.Fragment, {
        key: glyph.key
      }, defaultRenderGlyph(_extends({}, glyph, {
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
  return /*#__PURE__*/React.createElement("g", {
    className: "visx-area-stack"
  }, stacks.map(function (stack) {
    return /*#__PURE__*/React.createElement(Area, _extends({
      key: stack.key,
      curve: curve
    }, stack.accessors), function (_ref6) {
      var path = _ref6.path;
      return /*#__PURE__*/React.createElement(PathComponent, _extends({
        className: "visx-area",
        stroke: "transparent",
        d: path(stack.data) || ''
      }, stack.areaProps, eventEmitters));
    });
  }), renderLine && stacks.map(function (stack) {
    return /*#__PURE__*/React.createElement(LinePath, _extends({
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
      return /*#__PURE__*/React.createElement(PathComponent, _extends({
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
      React.createElement(BaseGlyphSeries, {
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
  children: _pt.oneOfType([_pt.element, _pt.arrayOf(_pt.element)]).isRequired,
  renderLine: _pt.bool
};
export default BaseAreaStack;