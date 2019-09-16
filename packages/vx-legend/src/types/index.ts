import { ScaleLinear, ScaleOrdinal, ScaleBand, ScaleThreshold, ScaleQuantile } from 'd3-scale';

export { ScaleLinear, ScaleOrdinal, ScaleBand, ScaleThreshold, ScaleQuantile };

export type ScaleType<
  Input extends string | number | Date,
  Output extends string | number | Date
> =
  | ScaleLinear<Input, Output> // number input, number output
  | ScaleOrdinal<Input, Output> // string input, any output
  | ScaleBand<Input> // string input, number output
  | ScaleThreshold<Input, Output>
  | ScaleQuantile<Output>;

export type LabelFormatterFactory<Datum, Output> = (args: {
  scale: ScaleType<Datum, Output>;
  labelFormat: LabelFormatter<Datum>;
}) => ItemTransformer<Datum, Output>;

export type LabelFormatter<Datum> = (
  item: Datum,
  itemIndex: number,
) => Datum | string | number | undefined;

export type FormattedLabel<Datum, Output, ExtraAttributes = {}> = {
  datum: Datum;
  index: number;
  text: string;
  value: Output;
} & ExtraAttributes;

export type ItemTransformer<Datum, Output> = (
  item: Datum,
  itemIndex: number,
) => FormattedLabel<Datum, Output>;

export type LegendShape = 'rect' | 'circle' | React.FunctionComponent | React.ComponentClass;

export type FillAccessor<Datum, Output> = (
  label: FormattedLabel<Datum, Output>,
) => string | undefined;

export type SizeAccessor<Datum, Output> = (
  label: FormattedLabel<Datum, Output>,
) => string | number | undefined;

export type ShapeStyleAccessor<Datum, Output> = (
  label: FormattedLabel<Datum, Output>,
) => React.CSSProperties | React.SVGProps<any> | undefined;
