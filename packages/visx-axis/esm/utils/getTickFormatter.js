import { toString } from '@visx/scale';

/**
 * Returns a tick position for the given tick value
 */
export default function getTickFormatter(scale) {
  // Broaden type before using 'xxx' in s as typeguard.
  var s = scale; // For point or band scales,
  // have to add offset to make the tick centered.

  if ('tickFormat' in s) {
    return s.tickFormat();
  }

  return toString;
}