"use strict";

exports.__esModule = true;
exports.default = useWordcloud;
var _react = require("react");
var _d3Cloud = _interopRequireDefault(require("d3-cloud"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function useWordcloud(_ref) {
  var width = _ref.width,
    height = _ref.height,
    font = _ref.font,
    fontSize = _ref.fontSize,
    fontStyle = _ref.fontStyle,
    fontWeight = _ref.fontWeight,
    padding = _ref.padding,
    random = _ref.random,
    rotate = _ref.rotate,
    spiral = _ref.spiral,
    words = _ref.words;
  var _useState = (0, _react.useState)([]),
    cloudWords = _useState[0],
    setCloudWords = _useState[1];
  (0, _react.useEffect)(function () {
    if (width === 0 || height === 0) {
      return;
    }
    var layout = (0, _d3Cloud.default)();
    layout.size([width, height]);
    layout.words(words);
    if (typeof random !== 'undefined') layout.random(random);
    if (typeof font !== 'undefined') layout.font(font);
    if (typeof padding !== 'undefined') layout.padding(padding);
    if (typeof fontSize !== 'undefined') layout.fontSize(fontSize);
    if (typeof fontStyle !== 'undefined') layout.fontStyle(fontStyle);
    if (typeof fontWeight !== 'undefined') layout.fontWeight(fontWeight);
    if (typeof rotate !== 'undefined') layout.rotate(rotate);
    if (typeof spiral !== 'undefined') layout.spiral(spiral);
    layout.on('end', setCloudWords);
    layout.start();
    return function cleanup() {
      layout.stop();
    };
  }, [width, height, font, fontSize, fontStyle, fontWeight, padding, random, rotate, spiral, words]);
  return cloudWords;
}