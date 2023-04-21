import _pt from "prop-types";
var _excluded = ["children"];
function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }
import React from 'react';
import { Group } from '@visx/group';
import useWordcloud from './useWordcloud';
export default function Wordcloud(props) {
  var children = props.children,
    wordcloudConfig = _objectWithoutPropertiesLoose(props, _excluded);
  var width = wordcloudConfig.width,
    height = wordcloudConfig.height;
  var words = useWordcloud(wordcloudConfig);
  if (width === 0 || height === 0) return null;
  return /*#__PURE__*/React.createElement("svg", {
    width: width,
    height: height
  }, /*#__PURE__*/React.createElement(Group, {
    left: width / 2,
    top: height / 2
  }, children(words)));
}
Wordcloud.propTypes = {
  children: _pt.func.isRequired
};