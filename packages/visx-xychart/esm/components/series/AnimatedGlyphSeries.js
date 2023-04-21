var _excluded = ["renderGlyph"];
function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }
function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }
import React, { useCallback } from 'react';
import AnimatedGlyphs from './private/AnimatedGlyphs';
import BaseGlyphSeries from './private/BaseGlyphSeries';
import defaultRenderGlyph from './private/defaultRenderGlyph';
export default function AnimatedGlyphSeries(_ref) {
  var _ref$renderGlyph = _ref.renderGlyph,
    renderGlyph = _ref$renderGlyph === void 0 ? defaultRenderGlyph : _ref$renderGlyph,
    props = _objectWithoutPropertiesLoose(_ref, _excluded);
  var renderGlyphs = useCallback(function (glyphsProps) {
    return /*#__PURE__*/React.createElement(AnimatedGlyphs, _extends({}, glyphsProps, {
      renderGlyph: renderGlyph
    }));
  }, [renderGlyph]);
  return /*#__PURE__*/React.createElement(BaseGlyphSeries, _extends({}, props, {
    // @TODO currently generics for non-SeriesProps are not passed correctly in
    // withRegisteredData HOC
    // @ts-expect-error
    renderGlyphs: renderGlyphs
  }));
}