"use strict";

exports.__esModule = true;
exports.default = CustomProjection;

var _react = _interopRequireDefault(require("react"));

var _Projection = _interopRequireDefault(require("./Projection"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * All props pass through to `<Projection projection={customProjection} {...props} />`
 */
function CustomProjection(props) {
  return /*#__PURE__*/_react.default.createElement(_Projection.default, props);
}