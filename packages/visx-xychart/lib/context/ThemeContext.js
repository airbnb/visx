"use strict";

exports.__esModule = true;
exports.default = void 0;
var _react = _interopRequireDefault(require("react"));
var _light = _interopRequireDefault(require("../theme/themes/light"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
var ThemeContext = /*#__PURE__*/_react.default.createContext(_light.default);
var _default = ThemeContext;
exports.default = _default;