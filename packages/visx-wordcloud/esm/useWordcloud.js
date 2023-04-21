import { useEffect, useState } from 'react';
import d3Cloud from 'd3-cloud';
export default function useWordcloud(_ref) {
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
  var _useState = useState([]),
    cloudWords = _useState[0],
    setCloudWords = _useState[1];
  useEffect(function () {
    if (width === 0 || height === 0) {
      return;
    }
    var layout = d3Cloud();
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