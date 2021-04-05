"use strict";

exports.__esModule = true;
exports.default = ThemeProvider;

var _propTypes = _interopRequireDefault(require("prop-types"));

var _react = _interopRequireDefault(require("react"));

var _ThemeContext = _interopRequireDefault(require("../context/ThemeContext"));

var _light = _interopRequireDefault(require("../theme/themes/light"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function ThemeProvider(_ref) {
  var _ref$theme = _ref.theme,
      theme = _ref$theme === void 0 ? _light.default : _ref$theme,
      children = _ref.children;
  return /*#__PURE__*/_react.default.createElement(_ThemeContext.default.Provider, {
    value: theme
  }, children);
}