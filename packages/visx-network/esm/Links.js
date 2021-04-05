import _pt from "prop-types";
import React from 'react';
import cx from 'classnames';
import { Group } from '@visx/group';
export default function Links(_ref) {
  var _ref$links = _ref.links,
      links = _ref$links === void 0 ? [] : _ref$links,
      linkComponent = _ref.linkComponent,
      className = _ref.className;
  return /*#__PURE__*/React.createElement(React.Fragment, null, links.map(function (link, i) {
    return /*#__PURE__*/React.createElement(Group, {
      key: "network-link-" + i,
      className: cx('visx-network-link', className)
    }, /*#__PURE__*/React.createElement(linkComponent, {
      link: link
    }));
  }));
}
Links.propTypes = {
  links: _pt.array,
  className: _pt.string
};