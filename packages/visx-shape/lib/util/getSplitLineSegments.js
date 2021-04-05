"use strict";

exports.__esModule = true;
exports.getSplitLineSegments = getSplitLineSegments;
exports.default = void 0;

var _memoize = _interopRequireDefault(require("lodash/memoize"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var MEASUREMENT_ELEMENT_ID = '__visx_splitpath_svg_path_measurement_id';
var SVG_NAMESPACE_URL = 'http://www.w3.org/2000/svg';

function getSplitLineSegments(_ref) {
  var path = _ref.path,
      segments = _ref.segments,
      _ref$sampleRate = _ref.sampleRate,
      sampleRate = _ref$sampleRate === void 0 ? 0.25 : _ref$sampleRate;

  try {
    var pathElement = document.getElementById(MEASUREMENT_ELEMENT_ID); // create a single path element if not done already

    if (!pathElement) {
      var svg = document.createElementNS(SVG_NAMESPACE_URL, 'svg'); // not visible

      svg.style.opacity = '0';
      svg.style.width = '0';
      svg.style.height = '0'; // off screen

      svg.style.position = 'absolute';
      svg.style.top = '-100%';
      svg.style.left = '-100%'; // no mouse events

      svg.style.pointerEvents = 'none';
      pathElement = document.createElementNS(SVG_NAMESPACE_URL, 'path');
      pathElement.setAttribute('id', MEASUREMENT_ELEMENT_ID);
      svg.appendChild(pathElement);
      document.body.appendChild(svg);
    }

    pathElement.setAttribute('d', path);
    var totalPathLength = pathElement.getTotalLength();
    var totalPieces = segments.reduce(function (sum, curr) {
      return sum + curr.length;
    }, 0);
    var pieceSize = totalPathLength / totalPieces;
    var cumulativeSize = 0;
    var lineSegments = segments.map(function (segment) {
      var segmentPointCount = segment.length;
      var coords = [];

      for (var i = 0; i < segmentPointCount + sampleRate; i += sampleRate) {
        var distance = (cumulativeSize + i) * pieceSize;
        var point = pathElement.getPointAtLength(distance);
        coords.push(point);
      }

      cumulativeSize += segmentPointCount;
      return coords;
    });
    return lineSegments;
  } catch (e) {
    return [];
  }
}

var _default = (0, _memoize.default)(getSplitLineSegments, function (_ref2) {
  var path = _ref2.path,
      segments = _ref2.segments,
      sampleRate = _ref2.sampleRate;
  return path + "_" + segments.length + "_" + segments.map(function (segment) {
    return segment.length;
  }).join('-') + "_" + sampleRate;
});

exports.default = _default;