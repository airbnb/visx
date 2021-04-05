"use strict";

exports.__esModule = true;
exports.default = Bars;

var _react = _interopRequireDefault(require("react"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

function Bars(_ref) {
  var bars = _ref.bars,
      horizontal = _ref.horizontal,
      xScale = _ref.xScale,
      yScale = _ref.yScale,
      rectProps = _objectWithoutPropertiesLoose(_ref, ["bars", "horizontal", "xScale", "yScale"]);

  var isFocusable = Boolean(rectProps.onFocus || rectProps.onBlur);
  return (
    /*#__PURE__*/
    // eslint-disable-next-line react/jsx-no-useless-fragment
    _react.default.createElement(_react.default.Fragment, null, bars.map(function (_ref2) {
      var key = _ref2.key,
          barProps = _objectWithoutPropertiesLoose(_ref2, ["key"]);

      return /*#__PURE__*/_react.default.createElement("rect", _extends({
        key: key,
        className: "visx-bar",
        tabIndex: isFocusable ? 0 : undefined
      }, barProps, rectProps));
    }))
  );
}