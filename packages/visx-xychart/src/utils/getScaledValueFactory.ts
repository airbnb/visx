import { AxisScale } from '@visx/axis';
import { ScaleInput } from '@visx/scale';
import isValidNumber from '../typeguards/isValidNumber';
import getScaleBandwidth from './getScaleBandwidth';

/** Returns a function that takes a Datum as input and returns a scaled value, correcting for the scale's bandwidth if applicable. */
export default function getScaledValueFactory<Scale extends AxisScale, Datum>(
  scale: Scale,
  accessor: (d: Datum) => ScaleInput<Scale>,
  align: 'start' | 'center' | 'end' = 'center',
) {
  return (d: Datum) => {
    const scaledValue = scale(accessor(d));
    if (isValidNumber(scaledValue)) {
      const bandwidthOffset =
        (align === 'start' ? 0 : getScaleBandwidth(scale)) / (align === 'center' ? 2 : 1);
      return scaledValue + bandwidthOffset;
    }
    // @TODO: NaNs cause react-spring to throw, but the return value of this must be number
    // this currently causes issues in vertical <> horizontal transitions because
    // x/yAccessors from context are out of sync with props.horizontal
    // horizontal should be moved to context
    return NaN;
  };
}
