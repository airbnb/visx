import { LabelFormatter, ScaleType, ItemTransformer, BaseInput, BaseOutput } from '../types';

/** Returns a function which takes a Datum and index as input, and returns a formatted label object. */
export default function labelTransformFactory<
  Datum extends BaseInput,
  Output extends BaseOutput,
  Scale extends ScaleType<Datum, Output> = ScaleType<Datum, Output>
>({
  scale,
  labelFormat,
}: {
  scale: Scale;
  labelFormat: LabelFormatter<Datum>;
}): ItemTransformer<Datum, Output> {
  return (d, i) => ({
    datum: d,
    index: i,
    text: `${labelFormat(d, i)}`,
    // @ts-ignore
    value: scale(d),
  });
}
