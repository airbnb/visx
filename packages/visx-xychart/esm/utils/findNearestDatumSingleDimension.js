import { bisector, range as d3Range, bisectLeft } from 'd3-array'; // @TODO make more robust to null/undefined scaled values

/** Finds the nearest datum in a single direction (x or y) closest to the specified `scaledValue`. */

export default function findNearestDatumSingleDimension(_ref) {
  var scale = _ref.scale,
      accessor = _ref.accessor,
      scaledValue = _ref.scaledValue,
      data = _ref.data;
  var coercedScale = scale; // broaden type before type guards below

  var nearestDatum;
  var nearestDatumIndex; // if scale has .invert(), convert svg coord to nearest data value

  if ('invert' in coercedScale && typeof coercedScale.invert === 'function') {
    var bisect = bisector(accessor).left; // find closest data value, then map that to closest datum

    var dataValue = Number(coercedScale.invert(scaledValue));
    var index = bisect(data, dataValue); // take the two datum nearest this index, and compute which is closer

    var nearestDatum0 = data[index - 1];
    var nearestDatum1 = data[index];
    nearestDatum = !nearestDatum0 || Math.abs(dataValue - accessor(nearestDatum0)) > Math.abs(dataValue - accessor(nearestDatum1)) ? nearestDatum1 : nearestDatum0;
    nearestDatumIndex = nearestDatum === nearestDatum0 ? index - 1 : index;
  } else if ('step' in coercedScale && typeof coercedScale.step !== 'undefined') {
    // band scales don't have an invert function but they do have discrete domains
    // so we manually invert
    var domain = scale.domain();
    var range = scale.range().map(Number);
    var sortedRange = [].concat(range).sort(function (a, b) {
      return a - b;
    }); // bisectLeft assumes sort

    var rangePoints = d3Range(sortedRange[0], sortedRange[1], coercedScale.step());
    var domainIndex = bisectLeft(rangePoints, scaledValue); // y-axis scales may have reverse ranges, correct for this

    var sortedDomain = range[0] < range[1] ? domain : domain.reverse();
    var domainValue = sortedDomain[domainIndex - 1];

    var _index = data.findIndex(function (d) {
      return String(accessor(d)) === String(domainValue);
    });

    nearestDatum = data[_index];
    nearestDatumIndex = _index;
  } else {
    console.warn('[visx/xychart/findNearestDatum] encountered incompatible scale type, bailing');
    return null;
  }

  if (nearestDatum == null || nearestDatumIndex == null) return null;
  var distance = Math.abs(Number(coercedScale(accessor(nearestDatum))) - scaledValue);
  return {
    datum: nearestDatum,
    index: nearestDatumIndex,
    distance: distance
  };
}