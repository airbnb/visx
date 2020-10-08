import { AxisScale } from '@visx/axis';
import { getSecondItem } from '@visx/shape/lib/util/accessors';
import { extent } from 'd3-array';
import { BarStackData, BarStackDatum, DataRegistryEntry } from '../types';

const getStack = <XScale extends AxisScale, YScale extends AxisScale>(
  bar: BarStackDatum<XScale, YScale>,
) => bar?.data?.stack;

const getNumericValue = <XScale extends AxisScale, YScale extends AxisScale>(
  bar: BarStackDatum<XScale, YScale>,
) => getSecondItem(bar); // corresponds to y1, the upper value (topline).

/** Constructs the `DataRegistryEntry`s for a BarStack, using the stacked data. */
export default function getBarStackRegistryData<XScale extends AxisScale, YScale extends AxisScale>(
  stackedData: BarStackData<XScale, YScale>,
  comprehensiveDomain: [number, number],
  horizontal?: boolean,
) {
  const [xAccessor, yAccessor] = horizontal
    ? [getNumericValue, getStack]
    : [getStack, getNumericValue];
  return stackedData
    .map((data, index) => {
      const entry: DataRegistryEntry<XScale, YScale, BarStackDatum<XScale, YScale>> = {
        key: data.key,
        data,
        xAccessor,
        yAccessor,
      };

      // update the numeric domain to account for full data stack
      // only need to do this for one key
      if (comprehensiveDomain.length > 0 && index === 0) {
        if (horizontal) {
          entry.xScale = scale =>
            scale.domain(extent(scale.domain().concat(comprehensiveDomain))) as typeof scale;
        } else {
          entry.yScale = scale =>
            scale.domain(extent(scale.domain().concat(comprehensiveDomain))) as typeof scale;
        }
      }

      return entry;
    })
    .filter(entry => entry) as DataRegistryEntry<XScale, YScale, BarStackDatum<XScale, YScale>>[];
}
