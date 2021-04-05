"use strict";

exports.__esModule = true;
exports.scaleInvert = scaleInvert;
exports.getDomainFromExtent = getDomainFromExtent;

function scaleInvert(scale, value) {
  // Test if the scale is an ordinalScale or not,
  // Since an ordinalScale doesn't support invert function.
  if (!scale.invert) {
    var _scale$range = scale.range(),
        start = _scale$range[0],
        end = _scale$range[1];

    var i = 0; // ordinal should have step

    var width = scale.step() * (end - start) / Math.abs(end - start);

    if (width > 0) {
      while (value > start + width * (i + 1)) {
        i += 1;
      }
    } else {
      while (value < start + width * (i + 1)) {
        i += 1;
      }
    }

    return i;
  }

  return scale.invert(value);
}

function getDomainFromExtent(scale, start, end, tolerentDelta) {
  var domain;
  var invertedStart = scaleInvert(scale, start + (start < end ? -tolerentDelta : tolerentDelta));
  var invertedEnd = scaleInvert(scale, end + (end < start ? -tolerentDelta : tolerentDelta));
  var minValue = Math.min(invertedStart, invertedEnd);
  var maxValue = Math.max(invertedStart, invertedEnd);

  if (scale.invert) {
    domain = {
      start: minValue,
      end: maxValue
    };
  } else {
    var values = [];
    var scaleDomain = scale.domain();

    for (var i = minValue; i <= maxValue; i += 1) {
      values.push(scaleDomain[i]);
    }

    domain = {
      values: values
    };
  }

  return domain;
}