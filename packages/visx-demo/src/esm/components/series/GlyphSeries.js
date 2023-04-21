var _excluded = ["renderGlyph"];
function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }
function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }
import React, { useCallback } from 'react';
import BaseGlyphSeries from './private/BaseGlyphSeries';
import defaultRenderGlyph from './private/defaultRenderGlyph';
export default function GlyphSeries(_ref) {
  var _ref$renderGlyph = _ref.renderGlyph,
    renderGlyph = _ref$renderGlyph === void 0 ? defaultRenderGlyph : _ref$renderGlyph,
    props = _objectWithoutPropertiesLoose(_ref, _excluded);
  var renderGlyphs = useCallback(function (_ref2) {
    var glyphs = _ref2.glyphs,
      onPointerMove = _ref2.onPointerMove,
      onPointerOut = _ref2.onPointerOut,
      onPointerUp = _ref2.onPointerUp,
      onFocus = _ref2.onFocus,
      onBlur = _ref2.onBlur;
    return glyphs.map(function (glyph) {
      return /*#__PURE__*/React.createElement(React.Fragment, {
        key: glyph.key
      }, renderGlyph(_extends({}, glyph, {
        onPointerMove: onPointerMove,
        onPointerOut: onPointerOut,
        onPointerUp: onPointerUp,
        onFocus: onFocus,
        onBlur: onBlur
      })));
    });
  }, [renderGlyph]);
  return /*#__PURE__*/React.createElement(BaseGlyphSeries, _extends({}, props, {
    // @TODO currently generics for non-SeriesProps are not passed correctly in
    // withRegisteredData HOC
    // @ts-expect-error
    renderGlyphs: renderGlyphs
  }));
}