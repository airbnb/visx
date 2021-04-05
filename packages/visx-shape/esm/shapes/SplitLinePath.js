import _pt from "prop-types";

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

import React, { useMemo } from 'react';
import LinePath from './LinePath';
import getSplitLineSegments from '../util/getSplitLineSegments';
export default function SplitLinePath(_ref) {
  var children = _ref.children,
      className = _ref.className,
      curve = _ref.curve,
      defined = _ref.defined,
      sampleRate = _ref.sampleRate,
      segments = _ref.segments,
      x = _ref.x,
      y = _ref.y,
      styles = _ref.styles;
  // combine data to first draw entire path
  var combinedSegments = useMemo(function () {
    return segments.reduce(function (flat, segmentData) {
      return flat.concat([].concat(segmentData));
    }, []);
  }, [segments]);
  return /*#__PURE__*/React.createElement(LinePath, {
    data: combinedSegments,
    defined: defined,
    curve: curve,
    x: x,
    y: y
  }, function (_ref2) {
    var path = _ref2.path;
    // use entire path to interpolate individual segments
    var entirePath = path(combinedSegments);
    var computedLineSegments = getSplitLineSegments({
      path: entirePath || '',
      segments: segments,
      sampleRate: sampleRate
    });
    return computedLineSegments.map(function (segment, index) {
      return children ? children({
        index: index,
        segment: segment,
        styles: styles[index] || styles[index % styles.length]
      }) : /*#__PURE__*/React.createElement(LinePath, _extends({
        key: index,
        className: className,
        data: segment,
        x: function x(d) {
          return d.x || 0;
        },
        y: function y(d) {
          return d.y || 0;
        }
      }, styles[index] || styles[index % styles.length]));
    });
  });
}
SplitLinePath.propTypes = {
  segments: _pt.arrayOf(_pt.array).isRequired,
  styles: _pt.array.isRequired,
  children: _pt.func,
  className: _pt.string,
  sampleRate: _pt.number
};