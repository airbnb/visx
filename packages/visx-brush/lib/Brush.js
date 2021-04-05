"use strict";

exports.__esModule = true;
exports.default = void 0;

var _propTypes = _interopRequireDefault(require("prop-types"));

var _react = _interopRequireWildcard(require("react"));

var _BaseBrush = _interopRequireDefault(require("./BaseBrush"));

var _utils = require("./utils");

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var SAFE_PIXEL = 2;
var DEFAULT_COLOR = 'steelblue';

var Brush = /*#__PURE__*/function (_Component) {
  _inheritsLoose(Brush, _Component);

  function Brush() {
    var _this;

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _Component.call.apply(_Component, [this].concat(args)) || this;

    _defineProperty(_assertThisInitialized(_this), "handleChange", function (brush) {
      var onChange = _this.props.onChange;
      if (!onChange) return;
      var x0 = brush.extent.x0;

      if (typeof x0 === 'undefined' || x0 < 0) {
        onChange(null);
        return;
      }

      var domain = _this.convertRangeToDomain(brush);

      onChange(domain);
    });

    _defineProperty(_assertThisInitialized(_this), "handleBrushStart", function (point) {
      var onBrushStart = _this.props.onBrushStart;
      if (!onBrushStart) return;
      var x = point.x,
          y = point.y;
      var _this$props = _this.props,
          xScale = _this$props.xScale,
          yScale = _this$props.yScale;
      var invertedX = (0, _utils.scaleInvert)(xScale, x);
      var invertedY = (0, _utils.scaleInvert)(yScale, y);
      onBrushStart({
        x: xScale.invert ? invertedX : xScale.domain()[invertedX],
        y: yScale.invert ? invertedY : yScale.domain()[invertedY]
      });
    });

    _defineProperty(_assertThisInitialized(_this), "handleBrushEnd", function (brush) {
      var onBrushEnd = _this.props.onBrushEnd;
      if (!onBrushEnd) return;
      var x0 = brush.extent.x0;

      if (typeof x0 === 'undefined' || x0 < 0) {
        onBrushEnd(null);
        return;
      }

      var domain = _this.convertRangeToDomain(brush);

      onBrushEnd(domain);
    });

    return _this;
  }

  var _proto = Brush.prototype;

  _proto.convertRangeToDomain = function convertRangeToDomain(brush) {
    var _this$props2 = this.props,
        xScale = _this$props2.xScale,
        yScale = _this$props2.yScale;
    var _brush$extent = brush.extent,
        x0 = _brush$extent.x0,
        x1 = _brush$extent.x1,
        y0 = _brush$extent.y0,
        y1 = _brush$extent.y1;
    var xDomain = (0, _utils.getDomainFromExtent)(xScale, x0 || 0, x1 || 0, SAFE_PIXEL);
    var yDomain = (0, _utils.getDomainFromExtent)(yScale, y0 || 0, y1 || 0, SAFE_PIXEL);
    var domain = {
      x0: xDomain.start || 0,
      x1: xDomain.end || 0,
      xValues: xDomain.values,
      y0: yDomain.start || 0,
      y1: yDomain.end || 0,
      yValues: yDomain.values
    };
    return domain;
  };

  _proto.render = function render() {
    var _this$props3 = this.props,
        xScale = _this$props3.xScale,
        yScale = _this$props3.yScale,
        height = _this$props3.height,
        width = _this$props3.width,
        margin = _this$props3.margin,
        brushDirection = _this$props3.brushDirection,
        initialBrushPosition = _this$props3.initialBrushPosition,
        innerRef = _this$props3.innerRef,
        resizeTriggerAreas = _this$props3.resizeTriggerAreas,
        brushRegion = _this$props3.brushRegion,
        yAxisOrientation = _this$props3.yAxisOrientation,
        xAxisOrientation = _this$props3.xAxisOrientation,
        selectedBoxStyle = _this$props3.selectedBoxStyle,
        disableDraggingSelection = _this$props3.disableDraggingSelection,
        resetOnEnd = _this$props3.resetOnEnd,
        onMouseLeave = _this$props3.onMouseLeave,
        onMouseMove = _this$props3.onMouseMove,
        onClick = _this$props3.onClick,
        handleSize = _this$props3.handleSize;
    if (!xScale || !yScale) return null;
    var brushRegionWidth;
    var brushRegionHeight;
    var left;
    var top;
    var marginLeft = margin && margin.left ? margin.left : 0;
    var marginTop = margin && margin.top ? margin.top : 0;
    var marginRight = margin && margin.right ? margin.right : 0;
    var marginBottom = margin && margin.bottom ? margin.bottom : 0;

    if (brushRegion === 'chart') {
      left = 0;
      top = 0;
      brushRegionWidth = width;
      brushRegionHeight = height;
    } else if (brushRegion === 'yAxis') {
      top = 0;
      brushRegionHeight = height;

      if (yAxisOrientation === 'right') {
        left = width;
        brushRegionWidth = marginRight;
      } else {
        left = -marginLeft;
        brushRegionWidth = marginLeft;
      }
    } else {
      left = 0;
      brushRegionWidth = width;

      if (xAxisOrientation === 'bottom') {
        top = height;
        brushRegionHeight = marginBottom;
      } else {
        top = -marginTop;
        brushRegionHeight = marginTop;
      }
    }

    return /*#__PURE__*/_react.default.createElement(_BaseBrush.default, {
      width: brushRegionWidth,
      height: brushRegionHeight,
      left: left,
      top: top,
      brushDirection: brushDirection,
      disableDraggingSelection: disableDraggingSelection,
      handleSize: handleSize,
      inheritedMargin: margin,
      initialBrushPosition: initialBrushPosition,
      ref: innerRef,
      resetOnEnd: resetOnEnd,
      resizeTriggerAreas: resizeTriggerAreas,
      selectedBoxStyle: selectedBoxStyle,
      onBrushEnd: this.handleBrushEnd,
      onBrushStart: this.handleBrushStart,
      onChange: this.handleChange,
      onClick: onClick,
      onMouseLeave: onMouseLeave,
      onMouseMove: onMouseMove
    });
  };

  return Brush;
}(_react.Component);

_defineProperty(Brush, "propTypes", {
  height: _propTypes.default.number,
  width: _propTypes.default.number,
  onChange: _propTypes.default.func,
  onBrushEnd: _propTypes.default.func,
  brushDirection: _propTypes.default.oneOf(['vertical', 'horizontal', 'both']),
  resizeTriggerAreas: _propTypes.default.array,
  brushRegion: _propTypes.default.oneOf(['xAxis', 'yAxis', 'chart']),
  yAxisOrientation: _propTypes.default.oneOf(['left', 'right']),
  xAxisOrientation: _propTypes.default.oneOf(['top', 'bottom']),
  disableDraggingSelection: _propTypes.default.bool,
  resetOnEnd: _propTypes.default.bool,
  handleSize: _propTypes.default.number
});

_defineProperty(Brush, "defaultProps", {
  xScale: null,
  yScale: null,
  onChange: null,
  height: 0,
  width: 0,
  selectedBoxStyle: {
    fill: DEFAULT_COLOR,
    fillOpacity: 0.2,
    stroke: DEFAULT_COLOR,
    strokeWidth: 1,
    strokeOpacity: 0.8
  },
  margin: {
    top: 0,
    left: 0,
    right: 0,
    bottom: 0
  },
  handleSize: 4,
  brushDirection: 'horizontal',
  initialBrushPosition: null,
  resizeTriggerAreas: ['left', 'right'],
  brushRegion: 'chart',
  yAxisOrientation: 'right',
  xAxisOrientation: 'bottom',
  onBrushStart: null,
  onBrushEnd: null,
  disableDraggingSelection: false,
  resetOnEnd: false,
  onMouseMove: null,
  onMouseLeave: null,
  onClick: null
});

var _default = Brush;
exports.default = _default;