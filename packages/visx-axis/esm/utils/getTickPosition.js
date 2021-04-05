/**
 * Create a function that returns a tick position for the given tick value
 */
export default function getTickPosition(scale, align) {
  if (align === void 0) {
    align = 'center';
  }

  // Broaden type before using 'xxx' in s as typeguard.
  var s = scale; // For point or band scales,
  // have to add offset to make the tick at center or end.

  if (align !== 'start' && 'bandwidth' in s) {
    var offset = s.bandwidth();
    if (align === 'center') offset /= 2;
    if (s.round()) offset = Math.round(offset);
    return function (d) {
      var scaledValue = s(d);
      return typeof scaledValue === 'number' ? scaledValue + offset : scaledValue;
    };
  }

  return scale;
}