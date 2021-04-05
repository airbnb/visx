import _pt from "prop-types";

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

import React, { useCallback, useContext, useEffect, useRef } from 'react';
import { useTooltipInPortal, defaultStyles } from '@visx/tooltip';
import TooltipContext from '../context/TooltipContext';
import DataContext from '../context/DataContext';
import getScaleBandwidth from '../utils/getScaleBandwidth';
import isValidNumber from '../typeguards/isValidNumber';
/** fontSize + lineHeight from default styles break precise location of crosshair, etc. */

var TOOLTIP_NO_STYLE = {
  position: 'absolute',
  pointerEvents: 'none',
  fontSize: 0,
  lineHeight: 0
};
var INVISIBLE_STYLES = {
  position: 'absolute',
  left: 0,
  top: 0,
  opacity: 0,
  width: 0,
  height: 0,
  pointerEvents: 'none'
};
export default function Tooltip(_ref) {
  var _tooltipContext$toolt, _nearestDatum$key, _ref11, _theme$gridStyles$str, _theme$gridStyles2, _theme$htmlLabel3, _ref12, _theme$gridStyles$str2, _theme$gridStyles3, _theme$htmlLabel4, _theme$backgroundColo, _theme$htmlLabel5, _theme$htmlLabel6;

  var debounce = _ref.debounce,
      detectBounds = _ref.detectBounds,
      horizontalCrosshairStyle = _ref.horizontalCrosshairStyle,
      glyphStyle = _ref.glyphStyle,
      renderTooltip = _ref.renderTooltip,
      resizeObserverPolyfill = _ref.resizeObserverPolyfill,
      _ref$scroll = _ref.scroll,
      scroll = _ref$scroll === void 0 ? true : _ref$scroll,
      _ref$showDatumGlyph = _ref.showDatumGlyph,
      showDatumGlyph = _ref$showDatumGlyph === void 0 ? false : _ref$showDatumGlyph,
      _ref$showHorizontalCr = _ref.showHorizontalCrosshair,
      showHorizontalCrosshair = _ref$showHorizontalCr === void 0 ? false : _ref$showHorizontalCr,
      _ref$showSeriesGlyphs = _ref.showSeriesGlyphs,
      showSeriesGlyphs = _ref$showSeriesGlyphs === void 0 ? false : _ref$showSeriesGlyphs,
      _ref$showVerticalCros = _ref.showVerticalCrosshair,
      showVerticalCrosshair = _ref$showVerticalCros === void 0 ? false : _ref$showVerticalCros,
      _ref$snapTooltipToDat = _ref.snapTooltipToDatumX,
      snapTooltipToDatumX = _ref$snapTooltipToDat === void 0 ? false : _ref$snapTooltipToDat,
      _ref$snapTooltipToDat2 = _ref.snapTooltipToDatumY,
      snapTooltipToDatumY = _ref$snapTooltipToDat2 === void 0 ? false : _ref$snapTooltipToDat2,
      verticalCrosshairStyle = _ref.verticalCrosshairStyle,
      tooltipProps = _objectWithoutPropertiesLoose(_ref, ["debounce", "detectBounds", "horizontalCrosshairStyle", "glyphStyle", "renderTooltip", "resizeObserverPolyfill", "scroll", "showDatumGlyph", "showHorizontalCrosshair", "showSeriesGlyphs", "showVerticalCrosshair", "snapTooltipToDatumX", "snapTooltipToDatumY", "verticalCrosshairStyle"]);

  var _ref2 = useContext(DataContext) || {},
      colorScale = _ref2.colorScale,
      theme = _ref2.theme,
      innerHeight = _ref2.innerHeight,
      innerWidth = _ref2.innerWidth,
      margin = _ref2.margin,
      xScale = _ref2.xScale,
      yScale = _ref2.yScale,
      dataRegistry = _ref2.dataRegistry;

  var tooltipContext = useContext(TooltipContext);

  var _useTooltipInPortal = useTooltipInPortal({
    debounce: debounce,
    detectBounds: detectBounds,
    polyfill: resizeObserverPolyfill,
    scroll: scroll
  }),
      containerRef = _useTooltipInPortal.containerRef,
      TooltipInPortal = _useTooltipInPortal.TooltipInPortal,
      forceRefreshBounds = _useTooltipInPortal.forceRefreshBounds; // To correctly position itself in a Portal, the tooltip must know its container bounds
  // this is done by rendering an invisible node whose ref can be used to find its parentElement


  var setContainerRef = useCallback(function (ownRef) {
    var _ownRef$parentElement;

    containerRef((_ownRef$parentElement = ownRef == null ? void 0 : ownRef.parentElement) != null ? _ownRef$parentElement : null);
  }, [containerRef]);
  var tooltipContent = (tooltipContext == null ? void 0 : tooltipContext.tooltipOpen) ? renderTooltip(_extends({}, tooltipContext, {
    colorScale: colorScale
  })) : null;
  var showTooltip = (tooltipContext == null ? void 0 : tooltipContext.tooltipOpen) && tooltipContent != null; // useTooltipInPortal is powered by react-use-measure and will update portal positions upon
  // resize and page scroll. however it **cannot** detect when a chart container moves on a
  // page due to animation or drag-and-drop, etc.
  // therefore we force refresh the bounds any time we transition from a hidden tooltip to
  // one that is visible.

  var lastShowTooltip = useRef(false);
  useEffect(function () {
    if (showTooltip && !lastShowTooltip.current) {
      forceRefreshBounds();
    }

    lastShowTooltip.current = showTooltip;
  }, [showTooltip, forceRefreshBounds]);
  var tooltipLeft = tooltipContext == null ? void 0 : tooltipContext.tooltipLeft;
  var tooltipTop = tooltipContext == null ? void 0 : tooltipContext.tooltipTop;
  var xScaleBandwidth = xScale ? getScaleBandwidth(xScale) : 0;
  var yScaleBandwidth = yScale ? getScaleBandwidth(yScale) : 0;
  var getDatumLeftTop = useCallback(function (key, datum) {
    var _ref3, _ref4;

    var entry = dataRegistry == null ? void 0 : dataRegistry.get(key);
    var xAccessor = entry == null ? void 0 : entry.xAccessor;
    var yAccessor = entry == null ? void 0 : entry.yAccessor;
    var left = xScale && xAccessor ? (_ref3 = Number(xScale(xAccessor(datum))) + xScaleBandwidth / 2) != null ? _ref3 : 0 : undefined;
    var top = yScale && yAccessor ? (_ref4 = Number(yScale(yAccessor(datum))) + yScaleBandwidth / 2) != null ? _ref4 : 0 : undefined;
    return {
      left: left,
      top: top
    };
  }, [dataRegistry, xScaleBandwidth, yScaleBandwidth, xScale, yScale]);
  var nearestDatum = tooltipContext == null ? void 0 : (_tooltipContext$toolt = tooltipContext.tooltipData) == null ? void 0 : _tooltipContext$toolt.nearestDatum;
  var nearestDatumKey = (_nearestDatum$key = nearestDatum == null ? void 0 : nearestDatum.key) != null ? _nearestDatum$key : ''; // snap x- or y-coord to the actual data point (not event coordinates)

  if (showTooltip && nearestDatum && (snapTooltipToDatumX || snapTooltipToDatumY)) {
    var _getDatumLeftTop = getDatumLeftTop(nearestDatumKey, nearestDatum.datum),
        left = _getDatumLeftTop.left,
        top = _getDatumLeftTop.top;

    tooltipLeft = snapTooltipToDatumX && isValidNumber(left) ? left : tooltipLeft;
    tooltipTop = snapTooltipToDatumY && isValidNumber(top) ? top : tooltipTop;
  } // collect positions + styles for glyphs; glyphs always snap to Datum, not event coords


  var glyphProps = [];

  if (showTooltip && (showDatumGlyph || showSeriesGlyphs)) {
    var _glyphStyle$radius, _glyphStyle$strokeWid;

    var radius = Number((_glyphStyle$radius = glyphStyle == null ? void 0 : glyphStyle.radius) != null ? _glyphStyle$radius : 4);
    var strokeWidth = Number((_glyphStyle$strokeWid = glyphStyle == null ? void 0 : glyphStyle.strokeWidth) != null ? _glyphStyle$strokeWid : 1.5);

    if (showSeriesGlyphs) {
      var _tooltipContext$toolt2, _tooltipContext$toolt3;

      Object.values((_tooltipContext$toolt2 = tooltipContext == null ? void 0 : (_tooltipContext$toolt3 = tooltipContext.tooltipData) == null ? void 0 : _tooltipContext$toolt3.datumByKey) != null ? _tooltipContext$toolt2 : {}).forEach(function (_ref5) {
        var _ref6, _colorScale, _theme$htmlLabel;

        var key = _ref5.key,
            datum = _ref5.datum;
        var color = (_ref6 = (_colorScale = colorScale == null ? void 0 : colorScale(key)) != null ? _colorScale : theme == null ? void 0 : (_theme$htmlLabel = theme.htmlLabel) == null ? void 0 : _theme$htmlLabel.color) != null ? _ref6 : '#222';

        var _getDatumLeftTop2 = getDatumLeftTop(key, datum),
            left = _getDatumLeftTop2.left,
            top = _getDatumLeftTop2.top; // don't show glyphs if coords are unavailable


        if (!isValidNumber(left) || !isValidNumber(top)) return;
        glyphProps.push({
          left: left - radius - strokeWidth,
          top: top - radius - strokeWidth,
          fill: color,
          stroke: theme == null ? void 0 : theme.backgroundColor,
          strokeWidth: strokeWidth,
          radius: radius
        });
      });
    } else if (nearestDatum) {
      var _getDatumLeftTop3 = getDatumLeftTop(nearestDatumKey, nearestDatum.datum),
          _left = _getDatumLeftTop3.left,
          _top = _getDatumLeftTop3.top; // don't show glyphs if coords are unavailable


      if (isValidNumber(_left) && isValidNumber(_top)) {
        var _ref7, _ref8, _ref9, _ref10, _theme$gridStyles, _theme$htmlLabel2;

        glyphProps.push({
          left: _left - radius - strokeWidth,
          top: _top - radius - strokeWidth,
          fill: (_ref7 = (_ref8 = (_ref9 = (_ref10 = nearestDatumKey && (colorScale == null ? void 0 : colorScale(nearestDatumKey))) != null ? _ref10 : null) != null ? _ref9 : theme == null ? void 0 : (_theme$gridStyles = theme.gridStyles) == null ? void 0 : _theme$gridStyles.stroke) != null ? _ref8 : theme == null ? void 0 : (_theme$htmlLabel2 = theme.htmlLabel) == null ? void 0 : _theme$htmlLabel2.color) != null ? _ref7 : '#222',
          radius: radius,
          strokeWidth: strokeWidth
        });
      }
    }
  }

  return (
    /*#__PURE__*/
    // Tooltip can be rendered as a child of SVG or HTML since its output is rendered in a Portal.
    // So use svg element to find container ref because it's a valid child of SVG and HTML parents.
    React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("svg", {
      ref: setContainerRef,
      style: INVISIBLE_STYLES
    }), showTooltip && /*#__PURE__*/React.createElement(React.Fragment, null, showVerticalCrosshair && /*#__PURE__*/React.createElement(TooltipInPortal, {
      className: "visx-crosshair visx-crosshair-vertical",
      left: tooltipLeft,
      top: margin == null ? void 0 : margin.top,
      offsetLeft: 0,
      offsetTop: 0,
      detectBounds: false,
      style: TOOLTIP_NO_STYLE
    }, /*#__PURE__*/React.createElement("svg", {
      width: "1",
      height: innerHeight,
      overflow: "visible"
    }, /*#__PURE__*/React.createElement("line", _extends({
      x1: 0,
      x2: 0,
      y1: 0,
      y2: innerHeight,
      strokeWidth: 1.5,
      stroke: (_ref11 = (_theme$gridStyles$str = theme == null ? void 0 : (_theme$gridStyles2 = theme.gridStyles) == null ? void 0 : _theme$gridStyles2.stroke) != null ? _theme$gridStyles$str : theme == null ? void 0 : (_theme$htmlLabel3 = theme.htmlLabel) == null ? void 0 : _theme$htmlLabel3.color) != null ? _ref11 : '#222'
    }, verticalCrosshairStyle)))), showHorizontalCrosshair && /*#__PURE__*/React.createElement(TooltipInPortal, {
      className: "visx-crosshair visx-crosshair-horizontal",
      left: margin == null ? void 0 : margin.left,
      top: tooltipTop,
      offsetLeft: 0,
      offsetTop: 0,
      detectBounds: false,
      style: TOOLTIP_NO_STYLE
    }, /*#__PURE__*/React.createElement("svg", {
      width: innerWidth,
      height: "1",
      overflow: "visible"
    }, /*#__PURE__*/React.createElement("line", _extends({
      x1: 0,
      x2: innerWidth,
      y1: 0,
      y2: 0,
      strokeWidth: 1.5,
      stroke: (_ref12 = (_theme$gridStyles$str2 = theme == null ? void 0 : (_theme$gridStyles3 = theme.gridStyles) == null ? void 0 : _theme$gridStyles3.stroke) != null ? _theme$gridStyles$str2 : theme == null ? void 0 : (_theme$htmlLabel4 = theme.htmlLabel) == null ? void 0 : _theme$htmlLabel4.color) != null ? _ref12 : '#222'
    }, horizontalCrosshairStyle)))), glyphProps.map(function (_ref13, i) {
      var left = _ref13.left,
          top = _ref13.top,
          fill = _ref13.fill,
          stroke = _ref13.stroke,
          strokeWidth = _ref13.strokeWidth,
          radius = _ref13.radius;
      return top == null || left == null ? null : /*#__PURE__*/React.createElement(TooltipInPortal, {
        key: i,
        className: "visx-tooltip-glyph",
        left: left,
        top: top,
        offsetLeft: 0,
        offsetTop: 0,
        detectBounds: false,
        style: TOOLTIP_NO_STYLE
      }, /*#__PURE__*/React.createElement("svg", {
        width: (radius + strokeWidth) * 2,
        height: (radius + strokeWidth) * 2
      }, /*#__PURE__*/React.createElement("circle", _extends({
        cx: radius + strokeWidth,
        cy: radius + strokeWidth,
        r: radius,
        fill: fill,
        stroke: stroke,
        strokeWidth: strokeWidth,
        paintOrder: "fill"
      }, glyphStyle))));
    }), /*#__PURE__*/React.createElement(TooltipInPortal, _extends({
      left: tooltipLeft,
      top: tooltipTop,
      style: _extends({}, defaultStyles, {
        background: (_theme$backgroundColo = theme == null ? void 0 : theme.backgroundColor) != null ? _theme$backgroundColo : 'white',
        boxShadow: "0 1px 2px " + ((theme == null ? void 0 : (_theme$htmlLabel5 = theme.htmlLabel) == null ? void 0 : _theme$htmlLabel5.color) ? (theme == null ? void 0 : (_theme$htmlLabel6 = theme.htmlLabel) == null ? void 0 : _theme$htmlLabel6.color) + "55" : '#22222255')
      }, theme == null ? void 0 : theme.htmlLabel)
    }, tooltipProps), tooltipContent)))
  );
}
Tooltip.propTypes = {
  renderTooltip: _pt.func.isRequired,
  snapTooltipToDatumX: _pt.bool,
  snapTooltipToDatumY: _pt.bool,
  showVerticalCrosshair: _pt.bool,
  showHorizontalCrosshair: _pt.bool,
  showDatumGlyph: _pt.bool,
  showSeriesGlyphs: _pt.bool
};