"use strict";

exports.__esModule = true;
exports.default = GlyphSeries;
var _react = _interopRequireWildcard(require("react"));
var _BaseGlyphSeries = _interopRequireDefault(require("./private/BaseGlyphSeries"));
var _defaultRenderGlyph = _interopRequireDefault(require("./private/defaultRenderGlyph"));
var _excluded = ["renderGlyph"];
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }
function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }
function GlyphSeries(_ref) {
  var _ref$renderGlyph = _ref.renderGlyph,
    renderGlyph = _ref$renderGlyph === void 0 ? _defaultRenderGlyph.default : _ref$renderGlyph,
    props = _objectWithoutPropertiesLoose(_ref, _excluded);
  var renderGlyphs = (0, _react.useCallback)(function (_ref2) {
    var glyphs = _ref2.glyphs,
      onPointerMove = _ref2.onPointerMove,
      onPointerOut = _ref2.onPointerOut,
      onPointerUp = _ref2.onPointerUp,
      onFocus = _ref2.onFocus,
      onBlur = _ref2.onBlur;
    return glyphs.map(function (glyph) {
      return /*#__PURE__*/_react.default.createElement(_react.default.Fragment, {
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
  return /*#__PURE__*/_react.default.createElement(_BaseGlyphSeries.default, _extends({}, props, {
    // @TODO currently generics for non-SeriesProps are not passed correctly in
    // withRegisteredData HOC
    // @ts-expect-error
    renderGlyphs: renderGlyphs
  }));
}