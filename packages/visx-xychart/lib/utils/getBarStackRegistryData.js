"use strict";

exports.__esModule = true;
exports.default = getBarStackRegistryData;

var _accessors = require("@visx/shape/lib/util/accessors");

var _d3Array = require("d3-array");

var getStack = function getStack(bar) {
  var _bar$data;

  return bar == null ? void 0 : (_bar$data = bar.data) == null ? void 0 : _bar$data.stack;
}; // returns average of top + bottom of bar (the middle) as this enables more accurately
// finding the nearest datum to a FocusEvent (which is based on the middle of the rect bounding box)


var getNumericValue = function getNumericValue(bar) {
  return ((0, _accessors.getFirstItem)(bar) + (0, _accessors.getSecondItem)(bar)) / 2;
};
/** Constructs the `DataRegistryEntry`s for a BarStack, using the stacked data. */


function getBarStackRegistryData(stackedData, comprehensiveDomain, horizontal) {
  var _ref = horizontal ? [getNumericValue, getStack] : [getStack, getNumericValue],
      xAccessor = _ref[0],
      yAccessor = _ref[1];

  return stackedData.map(function (data, index) {
    var entry = {
      key: data.key,
      data: data,
      xAccessor: xAccessor,
      yAccessor: yAccessor
    }; // update the numeric domain to account for full data stack
    // only need to do this for one key

    if (comprehensiveDomain.length > 0 && index === 0) {
      if (horizontal) {
        entry.xScale = function (scale) {
          return scale.domain((0, _d3Array.extent)(scale.domain().concat(comprehensiveDomain)));
        };
      } else {
        entry.yScale = function (scale) {
          return scale.domain((0, _d3Array.extent)(scale.domain().concat(comprehensiveDomain)));
        };
      }
    }

    return entry;
  }).filter(function (entry) {
    return entry;
  });
}