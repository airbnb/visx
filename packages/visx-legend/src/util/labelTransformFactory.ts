import type { AnyD3Scale, ScaleInput } from '@visx/scale';
import type { LabelFormatter, ItemTransformer } from '../types';

/** Returns a function which takes a Datum and index as input, and returns a formatted label object. */
export default function labelTransformFactory<Scale extends AnyD3Scale>({
  scale,
  labelFormat,
}: {
  scale: Scale;
  labelFormat: LabelFormatter<ScaleInput<Scale>>;
}): ItemTransformer<ScaleInput<Scale>, ReturnType<Scale>> {
  return (d, i) => ({
    datum: d,
    index: i,
    text: `${labelFormat(d, i)}`,
    value: scale(d),
  });
}
