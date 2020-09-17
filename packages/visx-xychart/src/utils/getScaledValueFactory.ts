import { AxisScale } from '@visx/axis';
import { ScaleInput } from '@visx/scale';
import isValidNumber from '../typeguards/isValidNumber';

/** Returns a function that takes a Datum as input and returns a scaled value, correcting for the scale's bandwidth if applicable. */
export default function getScaledValueFactory<Scale extends AxisScale, Datum>(
  scale: Scale,
  accessor: (d: Datum) => ScaleInput<Scale>,
  align: 'start' | 'center' | 'end' = 'center',
) {
  // Broaden type before using 'xxx' in s as typeguard.
  const coercedScale = scale as AxisScale;

  return (d: Datum) => {
    const scaledValue = coercedScale?.(accessor(d));
    if (isValidNumber(scaledValue)) {
      const bandwidthOffset =
        (align !== 'start' && 'bandwidth' in coercedScale ? coercedScale.bandwidth() ?? 0 : 0) /
        (align === 'center' ? 2 : 1);
      return scaledValue + bandwidthOffset;
    }
    return NaN;
  };
}
