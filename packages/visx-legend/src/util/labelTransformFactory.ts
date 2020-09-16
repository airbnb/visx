import { LabelFormatter, ItemTransformer } from '../types';
import { AnyD3Scale, ScaleInput } from '../../../visx-scale/lib';

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
    // @ts-ignore
    value: scale(d),
  });
}
