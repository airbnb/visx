import _pt from "prop-types";
function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }
import React, { useMemo } from 'react';
import getSplitLineSegments from '../util/getSplitLineSegments';
import { line } from '../util/D3ShapeFactories';
import LinePath from './LinePath';
var getX = function getX(d) {
  return d.x || 0;
};
var getY = function getY(d) {
  return d.y || 0;
};
export default function SplitLinePath(_ref) {
  var children = _ref.children,
    className = _ref.className,
    curve = _ref.curve,
    defined = _ref.defined,
    segmentation = _ref.segmentation,
    sampleRate = _ref.sampleRate,
    segments = _ref.segments,
    x = _ref.x,
    y = _ref.y,
    styles = _ref.styles;
  // Convert data in all segments to points.
  var pointsInSegments = useMemo(function () {
    var xFn = typeof x === 'number' || typeof x === 'undefined' ? function () {
      return x;
    } : x;
    var yFn = typeof y === 'number' || typeof y === 'undefined' ? function () {
      return y;
    } : y;
    return segments.map(function (s) {
      return s.map(function (value, i) {
        return {
          x: xFn(value, i, s),
          y: yFn(value, i, s)
        };
      });
    });
  }, [x, y, segments]);
  var pathString = useMemo(function () {
    var path = line({
      x: x,
      y: y,
      defined: defined,
      curve: curve
    });
    return path(segments.flat()) || '';
  }, [x, y, defined, curve, segments]);
  var splitLineSegments = useMemo(function () {
    return getSplitLineSegments({
      path: pathString,
      segmentation: segmentation,
      pointsInSegments: pointsInSegments,
      sampleRate: sampleRate
    });
  }, [pathString, segmentation, pointsInSegments, sampleRate]);
  return /*#__PURE__*/React.createElement("g", null, splitLineSegments.map(function (segment, index) {
    return children ? /*#__PURE__*/React.createElement(React.Fragment, {
      key: index
    }, children({
      index: index,
      segment: segment,
      styles: styles[index] || styles[index % styles.length]
    })) : /*#__PURE__*/React.createElement(LinePath, _extends({
      key: index,
      className: className,
      data: segment,
      x: getX,
      y: getY
    }, styles[index] || styles[index % styles.length]));
  }));
}
SplitLinePath.propTypes = {
  segments: _pt.arrayOf(_pt.array).isRequired,
  styles: _pt.array.isRequired,
  children: _pt.func,
  className: _pt.string
};