function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

import React from 'react';
import LinearGradient from './LinearGradient';
/**
 * All props pass through to `<LinearGradient {...props} />`
 */

export default function GradientPinkBlue(_ref) {
  var _ref$from = _ref.from,
      from = _ref$from === void 0 ? '#F02FC2' : _ref$from,
      _ref$to = _ref.to,
      to = _ref$to === void 0 ? '#6094EA' : _ref$to,
      restProps = _objectWithoutPropertiesLoose(_ref, ["from", "to"]);

  return /*#__PURE__*/React.createElement(LinearGradient, _extends({
    from: from,
    to: to
  }, restProps));
}