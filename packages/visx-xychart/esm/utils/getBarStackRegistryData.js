import { getFirstItem, getSecondItem } from '@visx/shape/lib/util/accessors';
import { extent } from 'd3-array';

var getStack = function getStack(bar) {
  var _bar$data;

  return bar == null ? void 0 : (_bar$data = bar.data) == null ? void 0 : _bar$data.stack;
}; // returns average of top + bottom of bar (the middle) as this enables more accurately
// finding the nearest datum to a FocusEvent (which is based on the middle of the rect bounding box)


var getNumericValue = function getNumericValue(bar) {
  return (getFirstItem(bar) + getSecondItem(bar)) / 2;
};
/** Constructs the `DataRegistryEntry`s for a BarStack, using the stacked data. */


export default function getBarStackRegistryData(stackedData, comprehensiveDomain, horizontal) {
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
          return scale.domain(extent(scale.domain().concat(comprehensiveDomain)));
        };
      } else {
        entry.yScale = function (scale) {
          return scale.domain(extent(scale.domain().concat(comprehensiveDomain)));
        };
      }
    }

    return entry;
  }).filter(function (entry) {
    return entry;
  });
}