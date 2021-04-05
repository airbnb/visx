import _pt from "prop-types";
import React from 'react';
import ThemeContext from '../context/ThemeContext';
import lightTheme from '../theme/themes/light';
export default function ThemeProvider(_ref) {
  var _ref$theme = _ref.theme,
      theme = _ref$theme === void 0 ? lightTheme : _ref$theme,
      children = _ref.children;
  return /*#__PURE__*/React.createElement(ThemeContext.Provider, {
    value: theme
  }, children);
}