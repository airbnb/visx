"use strict";

exports.__esModule = true;
exports.default = Wordcloud;
var _propTypes = _interopRequireDefault(require("prop-types"));
var _react = _interopRequireDefault(require("react"));
var _group = require("@visx/group");
var _useWordcloud = _interopRequireDefault(require("./useWordcloud"));
var _excluded = ["children"];
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }
function Wordcloud(props) {
  var children = props.children,
    wordcloudConfig = _objectWithoutPropertiesLoose(props, _excluded);
  var width = wordcloudConfig.width,
    height = wordcloudConfig.height;
  var words = (0, _useWordcloud.default)(wordcloudConfig);
  if (width === 0 || height === 0) return null;
  return /*#__PURE__*/_react.default.createElement("svg", {
    width: width,
    height: height
  }, /*#__PURE__*/_react.default.createElement(_group.Group, {
    left: width / 2,
    top: height / 2
  }, children(words)));
}
Wordcloud.propTypes = {
  children: _propTypes.default.func.isRequired
};