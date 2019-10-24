// eslint doesn't know about @types/d3-scale
// eslint-disable-next-line import/no-extraneous-dependencies
import { ScaleLinear, ScaleOrdinal, ScaleBand, ScaleThreshold, ScaleQuantile } from 'd3-scale';

export { ScaleLinear, ScaleOrdinal, ScaleBand, ScaleThreshold, ScaleQuantile };

export type BaseInput = string | number | Date;
export type BaseOutput = string | number | Date;

export type ScaleType<Input extends BaseInput, Output extends BaseOutput> =
  | ScaleLinear<Input, Output> // number input, number output
  | ScaleOrdinal<Input, Output> // string input, any output
  | ScaleBand<Input> // string input, number output
  | ScaleThreshold<Input, Output>
  | ScaleQuantile<Output>;

export type LabelFormatterFactory<
  Datum extends BaseInput,
  Output extends BaseOutput,
  Scale extends ScaleType<Datum, Output> = ScaleType<Datum, Output>
> = (args: { scale: Scale; labelFormat: LabelFormatter<Datum> }) => ItemTransformer<Datum, Output>;

export type LabelFormatter<Datum> = (
  item: Datum,
  itemIndex: number,
) => Datum | string | number | undefined;

export type FormattedLabel<Datum, Output, ExtraAttributes = {}> = {
  datum: Datum;
  index: number;
  text: string;
  value?: Output;
} & ExtraAttributes;

export type ItemTransformer<Datum, Output> = (
  item: Datum,
  itemIndex: number,
) => FormattedLabel<Datum, Output>;

export type RenderShapeProvidedProps<Data, Output> = {
  width?: string | number;
  height?: string | number;
  label?: FormattedLabel<Data, Output>;
  fill?: string;
  size?: string | number;
  // TODO: ideally this would support SVGProps, but this is invalid for Rect/Circle shapes
  style?: React.CSSProperties;
};

export type LegendShape<Data, Output> =
  | 'rect'
  | 'circle'
  | React.FC<RenderShapeProvidedProps<Data, Output>>
  | React.ComponentClass<RenderShapeProvidedProps<Data, Output>>;

export type FillAccessor<Datum, Output> = (
  label: FormattedLabel<Datum, Output>,
) => string | undefined;

export type SizeAccessor<Datum, Output> = (
  label: FormattedLabel<Datum, Output>,
) => string | number | undefined;

export type ShapeStyleAccessor<Datum, Output> = (
  label: FormattedLabel<Datum, Output>,
) => React.CSSProperties | undefined; // TODO: ideally this would support SVGProps, but this is invalid for Rect/Circle shapes
