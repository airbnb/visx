import { LabelFormatter, ScaleType, ItemTransformer } from '../types';

/** Returns a function which takes a Datum and index as input, and returns a formatted label object. */
export default function labelTransformFactory<Datum, Output>({
  scale,
  labelFormat,
}: {
  scale: ScaleType<Datum, Output>;
  labelFormat: LabelFormatter<Datum>;
}): ItemTransformer<Datum, Output> {
  return (d, i) => ({
    datum: d,
    index: i,
    text: `${labelFormat(d, i)}`,
    value: scale(d),
  });
}
