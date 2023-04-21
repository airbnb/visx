"use strict";

exports.__esModule = true;
exports.default = DefaultLink;
var _react = _interopRequireDefault(require("react"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function DefaultLink(_ref) {
  var link = _ref.link;
  return link != null && link.source && link.target ? /*#__PURE__*/_react.default.createElement("line", {
    x1: link.source.x,
    y1: link.source.y,
    x2: link.target.x,
    y2: link.target.y,
    strokeWidth: 2,
    stroke: "#999",
    strokeOpacity: 0.6
  }) : null;
}