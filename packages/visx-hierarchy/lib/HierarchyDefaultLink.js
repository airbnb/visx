"use strict";

exports.__esModule = true;
exports.default = HierarchyDefaultLink;

var _propTypes = _interopRequireDefault(require("prop-types"));

var _react = _interopRequireDefault(require("react"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var DEFAULT_LINK = {
  source: {
    x: 0,
    y: 0
  },
  target: {
    x: 0,
    y: 0
  }
};

function HierarchyDefaultLink(_ref) {
  var _ref$link = _ref.link,
      link = _ref$link === void 0 ? DEFAULT_LINK : _ref$link;
  return /*#__PURE__*/_react.default.createElement("line", {
    x1: link.source.x,
    y1: link.source.y,
    x2: link.target.x,
    y2: link.target.y,
    strokeWidth: 2,
    stroke: "#999",
    strokeOpacity: 0.6
  });
}

HierarchyDefaultLink.propTypes = {
  link: _propTypes.default.shape({
    source: _propTypes.default.shape({
      x: _propTypes.default.number.isRequired,
      y: _propTypes.default.number.isRequired
    }).isRequired,
    target: _propTypes.default.shape({
      x: _propTypes.default.number.isRequired,
      y: _propTypes.default.number.isRequired
    }).isRequired
  })
};