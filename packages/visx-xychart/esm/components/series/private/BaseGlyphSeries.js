import _pt from "prop-types";
function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }
import React, { useContext, useMemo } from 'react';
import DataContext from '../../../context/DataContext';
import withRegisteredData from '../../../enhancers/withRegisteredData';
import getScaledValueFactory from '../../../utils/getScaledValueFactory';
import isValidNumber from '../../../typeguards/isValidNumber';
import { GLYPHSERIES_EVENT_SOURCE, XYCHART_EVENT_SOURCE } from '../../../constants';
import useSeriesEvents from '../../../hooks/useSeriesEvents';
export function BaseGlyphSeries(_ref) {
  var _ref2, _colorScale, _theme$colors;
  var colorAccessor = _ref.colorAccessor,
    data = _ref.data,
    dataKey = _ref.dataKey,
    onBlur = _ref.onBlur,
    onFocus = _ref.onFocus,
    onPointerMove = _ref.onPointerMove,
    onPointerOut = _ref.onPointerOut,
    onPointerUp = _ref.onPointerUp,
    onPointerDown = _ref.onPointerDown,
    _ref$enableEvents = _ref.enableEvents,
    enableEvents = _ref$enableEvents === void 0 ? true : _ref$enableEvents,
    renderGlyphs = _ref.renderGlyphs,
    _ref$size = _ref.size,
    size = _ref$size === void 0 ? 8 : _ref$size,
    xAccessor = _ref.xAccessor,
    xScale = _ref.xScale,
    yAccessor = _ref.yAccessor,
    yScale = _ref.yScale;
  var _useContext = useContext(DataContext),
    colorScale = _useContext.colorScale,
    theme = _useContext.theme,
    horizontal = _useContext.horizontal;
  var getScaledX = useMemo(function () {
    return getScaledValueFactory(xScale, xAccessor);
  }, [xScale, xAccessor]);
  var getScaledY = useMemo(function () {
    return getScaledValueFactory(yScale, yAccessor);
  }, [yScale, yAccessor]);
  var color = (_ref2 = (_colorScale = colorScale == null ? void 0 : colorScale(dataKey)) != null ? _colorScale : theme == null ? void 0 : (_theme$colors = theme.colors) == null ? void 0 : _theme$colors[0]) != null ? _ref2 : '#222';
  var ownEventSourceKey = GLYPHSERIES_EVENT_SOURCE + "-" + dataKey;
  var eventEmitters = useSeriesEvents({
    dataKey: dataKey,
    enableEvents: enableEvents,
    onBlur: onBlur,
    onFocus: onFocus,
    onPointerMove: onPointerMove,
    onPointerOut: onPointerOut,
    onPointerUp: onPointerUp,
    onPointerDown: onPointerDown,
    source: ownEventSourceKey,
    allowedSources: [XYCHART_EVENT_SOURCE, ownEventSourceKey]
  });
  var glyphs = useMemo(function () {
    return data.map(function (datum, i) {
      var _colorAccessor;
      var x = getScaledX(datum);
      if (!isValidNumber(x)) return null;
      var y = getScaledY(datum);
      if (!isValidNumber(y)) return null;
      return {
        key: "" + i,
        x: x,
        y: y,
        color: (_colorAccessor = colorAccessor == null ? void 0 : colorAccessor(datum, i)) != null ? _colorAccessor : color,
        size: typeof size === 'function' ? size(datum) : size,
        datum: datum
      };
    }).filter(function (point) {
      return point;
    });
  }, [color, colorAccessor, data, getScaledX, getScaledY, size]);
  return /*#__PURE__*/React.createElement(React.Fragment, null, renderGlyphs(_extends({
    glyphs: glyphs,
    xScale: xScale,
    yScale: yScale,
    horizontal: horizontal
  }, eventEmitters)));
}
BaseGlyphSeries.propTypes = {
  colorAccessor: _pt.func,
  size: _pt.oneOfType([_pt.number, _pt.func]),
  renderGlyphs: _pt.func.isRequired
};
export default withRegisteredData(BaseGlyphSeries);