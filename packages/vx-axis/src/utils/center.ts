import { D3Scale, DefaultThresholdInput } from '@vx/scale';

/**
 * Returns a function that applies a centering transform to a scaled value,
 * if `Output` is of type `number` and `scale.bandwidth()` is defined
 */
export default function center<ScaleInput extends DefaultThresholdInput>(
  scale: D3Scale<number, ScaleInput, ScaleInput>,
) {
  let offset = 'bandwidth' in scale ? scale.bandwidth() / 2 : 0;
  if ('round' in scale && scale.round()) offset = Math.round(offset);

  return (d: ScaleInput) => {
    const scaledValue = scale(d);
    if (typeof scaledValue === 'number') return scaledValue + offset;
    // quantize scales return an array of values
    if (Array.isArray(scaledValue)) return Number(scaledValue[0]) + offset;
    return scaledValue;
  };
}
