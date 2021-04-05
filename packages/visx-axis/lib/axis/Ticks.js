"use strict";

exports.__esModule = true;
exports.default = Ticks;

var _react = _interopRequireDefault(require("react"));

var _classnames = _interopRequireDefault(require("classnames"));

var _shape = require("@visx/shape");

var _group = require("@visx/group");

var _text = require("@visx/text");

var _orientation = _interopRequireDefault(require("../constants/orientation"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function Ticks(_ref) {
  var hideTicks = _ref.hideTicks,
      horizontal = _ref.horizontal,
      orientation = _ref.orientation,
      tickClassName = _ref.tickClassName,
      tickComponent = _ref.tickComponent,
      allTickLabelProps = _ref.tickLabelProps,
      _ref$tickStroke = _ref.tickStroke,
      tickStroke = _ref$tickStroke === void 0 ? '#222' : _ref$tickStroke,
      tickTransform = _ref.tickTransform,
      ticks = _ref.ticks;
  return ticks.map(function (_ref2) {
    var _allTickLabelProps$in;

    var value = _ref2.value,
        index = _ref2.index,
        from = _ref2.from,
        to = _ref2.to,
        formattedValue = _ref2.formattedValue;
    var tickLabelProps = (_allTickLabelProps$in = allTickLabelProps[index]) != null ? _allTickLabelProps$in : {};
    var tickLabelFontSize = Math.max(10, typeof tickLabelProps.fontSize === 'number' && tickLabelProps.fontSize || 0);
    var tickYCoord = to.y + (horizontal && orientation !== _orientation.default.top ? tickLabelFontSize : 0);
    return /*#__PURE__*/_react.default.createElement(_group.Group, {
      key: "visx-tick-" + value + "-" + index,
      className: (0, _classnames.default)('visx-axis-tick', tickClassName),
      transform: tickTransform
    }, !hideTicks && /*#__PURE__*/_react.default.createElement(_shape.Line, {
      from: from,
      to: to,
      stroke: tickStroke,
      strokeLinecap: "square"
    }), tickComponent ? tickComponent(_extends({}, tickLabelProps, {
      x: to.x,
      y: tickYCoord,
      formattedValue: formattedValue
    })) : /*#__PURE__*/_react.default.createElement(_text.Text, _extends({
      x: to.x,
      y: tickYCoord
    }, tickLabelProps), formattedValue));
  });
}