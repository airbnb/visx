import isValidNumber from '../typeguards/isValidNumber';
import getScaleBandwidth from './getScaleBandwidth';
/** Returns a function that takes a Datum as input and returns a scaled value, correcting for the scale's bandwidth if applicable. */

export default function getScaledValueFactory(scale, accessor, align) {
  if (align === void 0) {
    align = 'center';
  }

  return function (d) {
    var scaledValue = scale(accessor(d));

    if (isValidNumber(scaledValue)) {
      var bandwidthOffset = (align === 'start' ? 0 : getScaleBandwidth(scale)) / (align === 'center' ? 2 : 1);
      return scaledValue + bandwidthOffset;
    }

    return NaN;
  };
}