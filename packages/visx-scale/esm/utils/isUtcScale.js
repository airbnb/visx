var TEST_TIME = new Date(Date.UTC(2020, 1, 2, 3, 4, 5));
var TEST_FORMAT = '%Y-%m-%d %H:%M';
/**
 * Check if the scale is UTC or Time scale
 * When local time is equal to UTC, always return true
 * @param scale time or utc scale
 */

export default function isUtcScale(scale) {
  // The only difference between time and utc scale is
  // whether the tick format function is utcFormat or timeFormat
  var output = scale.tickFormat(1, TEST_FORMAT)(TEST_TIME);
  return output === '2020-02-02 03:04';
}