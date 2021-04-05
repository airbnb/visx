function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

import React, { useContext } from 'react';
import { Label as BaseLabel } from '@visx/annotation';
import DataContext from '../../context/DataContext';
var defaultBackgroundProps = {
  fillOpacity: 0.7
};
/** AnnotationLabel which provides text styles from theme. */

export default function AnnotationLabel(props) {
  var _useContext = useContext(DataContext),
      theme = _useContext.theme;

  var titleProps = theme == null ? void 0 : theme.svgLabelBig;
  var subtitleProps = theme == null ? void 0 : theme.svgLabelSmall;
  return /*#__PURE__*/React.createElement(BaseLabel, _extends({
    anchorLineStroke: theme == null ? void 0 : theme.axisStyles.x.bottom.axisLine.stroke,
    backgroundFill: theme == null ? void 0 : theme.backgroundColor,
    backgroundProps: defaultBackgroundProps,
    showAnchorLine: true,
    subtitleFontSize: subtitleProps == null ? void 0 : subtitleProps.fontSize,
    subtitleFontWeight: subtitleProps == null ? void 0 : subtitleProps.fontWeight,
    subtitleProps: subtitleProps,
    titleFontSize: titleProps == null ? void 0 : titleProps.fontSize,
    titleFontWeight: titleProps == null ? void 0 : titleProps.fontWeight,
    titleProps: titleProps
  }, props));
}