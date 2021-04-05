"use strict";

exports.__esModule = true;
exports.default = Links;

var _propTypes = _interopRequireDefault(require("prop-types"));

var _react = _interopRequireDefault(require("react"));

var _classnames = _interopRequireDefault(require("classnames"));

var _group = require("@visx/group");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function Links(_ref) {
  var _ref$links = _ref.links,
      links = _ref$links === void 0 ? [] : _ref$links,
      linkComponent = _ref.linkComponent,
      className = _ref.className;
  return /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, links.map(function (link, i) {
    return /*#__PURE__*/_react.default.createElement(_group.Group, {
      key: "network-link-" + i,
      className: (0, _classnames.default)('visx-network-link', className)
    }, /*#__PURE__*/_react.default.createElement(linkComponent, {
      link: link
    }));
  }));
}

Links.propTypes = {
  links: _propTypes.default.array,
  className: _propTypes.default.string
};