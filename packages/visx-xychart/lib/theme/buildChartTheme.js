"use strict";

exports.__esModule = true;
exports.default = buildChartTheme;

var _react = _interopRequireDefault(require("react"));

var _colors = require("./colors");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

var defaultLabelStyles = {
  fontFamily: '-apple-system,BlinkMacSystemFont,Roboto,Helvetica Neue,sans-serif',
  fontWeight: 700,
  fontSize: 12,
  textAnchor: 'middle',
  pointerEvents: 'none',
  letterSpacing: 0.4
};
/** Provides a simplified API to build a full XYChartTheme. */

function buildChartTheme(config) {
  var _ref, _ref2, _config$htmlLabel$col, _config$htmlLabel, _config$svgLabelBig, _config$svgLabelSmall;

  var baseSvgLabel = _extends({}, defaultLabelStyles, {
    fill: _colors.textColor,
    stroke: 'none'
  }, config.svgLabelBig);

  var baseTickLabel = _extends({}, defaultLabelStyles, {
    fontWeight: 200,
    fontSize: 11,
    fill: _colors.textColor,
    stroke: 'none'
  }, config.svgLabelSmall);

  var baseHtmlLabel = _extends({
    color: (_ref = (_ref2 = (_config$htmlLabel$col = (_config$htmlLabel = config.htmlLabel) == null ? void 0 : _config$htmlLabel.color) != null ? _config$htmlLabel$col : (_config$svgLabelBig = config.svgLabelBig) == null ? void 0 : _config$svgLabelBig.fill) != null ? _ref2 : (_config$svgLabelSmall = config.svgLabelSmall) == null ? void 0 : _config$svgLabelSmall.fill) != null ? _ref : _colors.textColor
  }, defaultLabelStyles, config.htmlLabel);

  return {
    backgroundColor: config.backgroundColor,
    colors: [].concat(config.colors),
    htmlLabel: _extends({}, baseHtmlLabel),
    svgLabelSmall: _extends({}, baseTickLabel),
    svgLabelBig: _extends({}, baseSvgLabel),
    gridStyles: _extends({
      stroke: config.gridColor,
      strokeWidth: 1
    }, config.gridStyles),
    axisStyles: {
      x: {
        top: {
          axisLabel: _extends({}, baseSvgLabel, {
            dy: '-0.25em' // needs to include font-size

          }),
          axisLine: _extends({
            stroke: config.gridColorDark,
            strokeWidth: 2
          }, config.xAxisLineStyles),
          tickLabel: _extends({}, baseTickLabel, {
            dy: '-0.25em' // needs to include font-size

          }),
          tickLength: config.tickLength,
          tickLine: _extends({
            strokeWidth: 1,
            stroke: config.gridColor
          }, config.xTickLineStyles)
        },
        bottom: {
          axisLabel: _extends({}, baseSvgLabel, {
            dy: '-0.25em'
          }),
          axisLine: _extends({
            stroke: config.gridColorDark,
            strokeWidth: 2
          }, config.xAxisLineStyles),
          tickLabel: _extends({}, baseTickLabel, {
            dy: '0.125em'
          }),
          tickLength: config.tickLength,
          tickLine: _extends({
            strokeWidth: 1,
            stroke: config.gridColor
          }, config.xTickLineStyles)
        }
      },
      y: {
        left: {
          axisLabel: _extends({}, baseSvgLabel, {
            dx: '-1.25em'
          }),
          axisLine: _extends({
            stroke: config.gridColor,
            strokeWidth: 1
          }, config.yAxisLineStyles),
          tickLabel: _extends({}, baseTickLabel, {
            textAnchor: 'end',
            dx: '-0.25em',
            dy: '0.25em'
          }),
          tickLength: config.tickLength,
          tickLine: _extends({
            strokeWidth: 1,
            stroke: config.gridColor
          }, config.yTickLineStyles)
        },
        right: {
          axisLabel: _extends({}, baseSvgLabel, {
            dx: '1.25em'
          }),
          axisLine: _extends({
            stroke: config.gridColor,
            strokeWidth: 1
          }, config.yAxisLineStyles),
          tickLabel: _extends({}, baseTickLabel, {
            textAnchor: 'start',
            dx: '0.25em',
            dy: '0.25em'
          }),
          tickLength: config.tickLength,
          tickLine: _extends({
            strokeWidth: 1,
            stroke: config.gridColor
          }, config.yTickLineStyles)
        }
      }
    }
  };
}