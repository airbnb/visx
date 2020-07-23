import { ScaleTime } from 'd3-scale';

const TEST_TIME = new Date(Date.UTC(2020, 1, 2, 3, 4, 5));
const TEST_FORMAT = '%Y-%m-%d %H:%M';

/**
 * Check if the scale is utc or time scale
 * @param scale time or utc scale
 */
export default function isUtcScale<Output>(scale: ScaleTime<Output, Output>) {
  // The only difference between time and utc scale is
  // whether the tick format function is utcFormat or timeFormat
  return scale.tickFormat(1, TEST_FORMAT)(TEST_TIME) === '2020-02-01 19:04';
}
