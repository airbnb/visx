import type { ScaleTime } from '@visx/vendor/d3-scale';

const TEST_TIME = new Date(Date.UTC(2020, 1, 2, 3, 4, 5));
const TEST_FORMAT = '%Y-%m-%d %H:%M';

/**
 * Check if the scale is UTC or Time scale
 * When local time is equal to UTC, always return true
 * @param scale time or utc scale
 */
export default function isUtcScale<Output>(scale: ScaleTime<Output, Output>) {
  // The only difference between time and utc scale is
  // whether the tick format function is utcFormat or timeFormat
  const output = scale.tickFormat(1, TEST_FORMAT)(TEST_TIME);
  return output === '2020-02-02 03:04';
}
