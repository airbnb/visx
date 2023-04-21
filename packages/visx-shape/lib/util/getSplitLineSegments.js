"use strict";

exports.__esModule = true;
exports.default = getSplitLineSegments;
var _getOrCreateMeasurementElement = _interopRequireDefault(require("./getOrCreateMeasurementElement"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
var MEASUREMENT_ELEMENT_ID = '__visx_splitpath_svg_path_measurement_id';
var TRUE = function TRUE() {
  return true;
};
function getSplitLineSegments(_ref) {
  var path = _ref.path,
    pointsInSegments = _ref.pointsInSegments,
    _ref$segmentation = _ref.segmentation,
    segmentation = _ref$segmentation === void 0 ? 'x' : _ref$segmentation,
    _ref$sampleRate = _ref.sampleRate,
    sampleRate = _ref$sampleRate === void 0 ? 1 : _ref$sampleRate;
  try {
    var pathElement = (0, _getOrCreateMeasurementElement.default)(MEASUREMENT_ELEMENT_ID);
    pathElement.setAttribute('d', path);
    var totalLength = pathElement.getTotalLength();
    var numSegments = pointsInSegments.length;
    var lineSegments = pointsInSegments.map(function () {
      return [];
    });
    if (segmentation === 'x' || segmentation === 'y') {
      var segmentStarts = pointsInSegments.map(function (points) {
        var _points$find;
        return (_points$find = points.find(function (p) {
          return typeof p[segmentation] === 'number';
        })) == null ? void 0 : _points$find[segmentation];
      });
      var first = pathElement.getPointAtLength(0);
      var last = pathElement.getPointAtLength(totalLength);
      var isIncreasing = last[segmentation] > first[segmentation];
      var isBeyondSegmentStart = isIncreasing ? segmentStarts.map(function (start) {
        return typeof start === 'undefined' ? TRUE : function (xOrY) {
          return xOrY >= start;
        };
      }) : segmentStarts.map(function (start) {
        return typeof start === 'undefined' ? TRUE : function (xOrY) {
          return xOrY <= start;
        };
      });
      var currentSegment = 0;
      for (var distance = 0; distance <= totalLength; distance += sampleRate) {
        var sample = pathElement.getPointAtLength(distance);
        var position = sample[segmentation];
        // find the current segment to which this sample belongs
        while (currentSegment < numSegments - 1 && isBeyondSegmentStart[currentSegment + 1](position)) {
          currentSegment += 1;
        }
        // add sample to segment
        lineSegments[currentSegment].push(sample);
      }
    } else {
      // segmentation === "length"
      var numPointsInSegment = pointsInSegments.map(function (points) {
        return points.length;
      });
      var numPoints = numPointsInSegment.reduce(function (sum, curr) {
        return sum + curr;
      }, 0);
      var lengthBetweenPoints = totalLength / Math.max(1, numPoints - 1);
      var _segmentStarts = numPointsInSegment.slice(0, numSegments - 1);
      _segmentStarts.unshift(0);
      for (var i = 2; i < numSegments; i += 1) {
        _segmentStarts[i] += _segmentStarts[i - 1];
      }
      for (var _i = 0; _i < numSegments; _i += 1) {
        _segmentStarts[_i] *= lengthBetweenPoints;
      }
      var _currentSegment = 0;
      for (var _distance = 0; _distance <= totalLength; _distance += sampleRate) {
        var _sample = pathElement.getPointAtLength(_distance);
        // find the current segment to which this sample belongs
        while (_currentSegment < numSegments - 1 && _distance >= _segmentStarts[_currentSegment + 1]) {
          _currentSegment += 1;
        }
        // add sample to segment
        lineSegments[_currentSegment].push(_sample);
      }
    }
    return lineSegments;
  } catch (e) {
    return [];
  }
}