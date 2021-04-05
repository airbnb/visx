"use strict";

exports.__esModule = true;
exports.default = ViolinPlot;

var _propTypes = _interopRequireDefault(require("prop-types"));

var _react = _interopRequireDefault(require("react"));

var _classnames = _interopRequireDefault(require("classnames"));

var _scale = require("@visx/scale");

var _d3Shape = require("d3-shape");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

var defaultCountAccessor = function defaultCountAccessor(d) {
  return typeof d.count === 'number' ? d.count : 0;
};

var defaultValueAccessor = function defaultValueAccessor(d) {
  return typeof d.value === 'number' ? d.value : 0;
};

function ViolinPlot(_ref) {
  var _ref$left = _ref.left,
      left = _ref$left === void 0 ? 0 : _ref$left,
      _ref$top = _ref.top,
      top = _ref$top === void 0 ? 0 : _ref$top,
      className = _ref.className,
      data = _ref.data,
      _ref$width = _ref.width,
      width = _ref$width === void 0 ? 10 : _ref$width,
      _ref$count = _ref.count,
      count = _ref$count === void 0 ? defaultCountAccessor : _ref$count,
      _ref$value = _ref.value,
      value = _ref$value === void 0 ? defaultValueAccessor : _ref$value,
      valueScale = _ref.valueScale,
      horizontal = _ref.horizontal,
      children = _ref.children,
      restProps = _objectWithoutPropertiesLoose(_ref, ["left", "top", "className", "data", "width", "count", "value", "valueScale", "horizontal", "children"]);

  var center = (horizontal ? top : left) + width / 2;
  var binCounts = data.map(function (bin) {
    return count(bin);
  });
  var widthScale = (0, _scale.scaleLinear)({
    range: [0, width / 2],
    round: true,
    domain: [0, Math.max.apply(Math, binCounts)]
  });
  var path = '';

  if (horizontal) {
    var topCurve = (0, _d3Shape.line)().x(function (d) {
      var _valueScale;

      return (_valueScale = valueScale(value(d))) != null ? _valueScale : 0;
    }).y(function (d) {
      var _widthScale;

      return center - ((_widthScale = widthScale(count(d))) != null ? _widthScale : 0);
    }).curve(_d3Shape.curveCardinal);
    var bottomCurve = (0, _d3Shape.line)().x(function (d) {
      var _valueScale2;

      return (_valueScale2 = valueScale(value(d))) != null ? _valueScale2 : 0;
    }).y(function (d) {
      var _widthScale2;

      return center + ((_widthScale2 = widthScale(count(d))) != null ? _widthScale2 : 0);
    }).curve(_d3Shape.curveCardinal);
    var topCurvePath = topCurve(data) || '';
    var bottomCurvePath = bottomCurve([].concat(data).reverse()) || '';
    path = topCurvePath + " " + bottomCurvePath.replace('M', 'L') + " Z";
  } else {
    var rightCurve = (0, _d3Shape.line)().x(function (d) {
      var _widthScale3;

      return center + ((_widthScale3 = widthScale(count(d))) != null ? _widthScale3 : 0);
    }).y(function (d) {
      var _valueScale3;

      return (_valueScale3 = valueScale(value(d))) != null ? _valueScale3 : 0;
    }).curve(_d3Shape.curveCardinal);
    var leftCurve = (0, _d3Shape.line)().x(function (d) {
      var _widthScale4;

      return center - ((_widthScale4 = widthScale(count(d))) != null ? _widthScale4 : 0);
    }).y(function (d) {
      var _valueScale4;

      return (_valueScale4 = valueScale(value(d))) != null ? _valueScale4 : 0;
    }).curve(_d3Shape.curveCardinal);
    var rightCurvePath = rightCurve(data) || '';
    var leftCurvePath = leftCurve([].concat(data).reverse()) || '';
    path = rightCurvePath + " " + leftCurvePath.replace('M', 'L') + " Z";
  } // eslint-disable-next-line react/jsx-no-useless-fragment


  if (children) return /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, children({
    path: path
  }));
  return /*#__PURE__*/_react.default.createElement("path", _extends({
    className: (0, _classnames.default)('visx-violin', className),
    d: path
  }, restProps));
}

ViolinPlot.propTypes = {
  data: _propTypes.default.array.isRequired,
  count: _propTypes.default.func,
  value: _propTypes.default.func,
  width: _propTypes.default.number,
  children: _propTypes.default.func
};