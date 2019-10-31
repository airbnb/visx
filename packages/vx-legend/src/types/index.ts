// eslint doesn't know about @types/d3-scale
// eslint-disable-next-line import/no-extraneous-dependencies
import * as d3Scale from 'd3-scale';

export type BaseInput = string | number | Date;
export type BaseOutput = string | number | Date;

export type ScaleLinear<Input, Output> = d3Scale.ScaleLinear<Input, Output>;
export type ScaleOrdinal<Input, Output> = d3Scale.ScaleOrdinal<Input, Output>;
export type ScaleBand<Input> = d3Scale.ScaleBand<Input>;
export type ScaleThreshold<Input extends BaseInput, Output> = d3Scale.ScaleThreshold<Input, Output>;
export type ScaleQuantile<Output> = d3Scale.ScaleQuantile<Output>;

// @TODO BaseInput only needed for `ScaleThreshold`
export type ScaleType<Input extends BaseInput, Output> =
  | ScaleLinear<Input, Output>
  | ScaleOrdinal<Input, Output>
  | ScaleBand<Input>
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
