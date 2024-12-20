import type { AnyD3Scale, ScaleInput } from '@visx/scale';
import type { ComponentClass, CSSProperties, FC } from 'react';

export type LabelFormatterFactory<Scale extends AnyD3Scale> = (args: {
  scale: Scale;
  labelFormat: LabelFormatter<ScaleInput<Scale>>;
}) => ItemTransformer<ScaleInput<Scale>, ReturnType<Scale>>;

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
  label: FormattedLabel<Data, Output>;
  item: Data;
  itemIndex: number;
  fill?: string;
  size?: string | number;
  style?: CSSProperties;
};

export type LegendShape<Data, Output> =
  | 'rect'
  | 'circle'
  | 'line'
  | FC<RenderShapeProvidedProps<Data, Output>>
  | ComponentClass<RenderShapeProvidedProps<Data, Output>>;

export type FillAccessor<Datum, Output> = (
  label: FormattedLabel<Datum, Output>,
) => string | undefined;

export type SizeAccessor<Datum, Output> = (
  label: FormattedLabel<Datum, Output>,
) => string | number | undefined;

export type ShapeStyleAccessor<Datum, Output> = (
  label: FormattedLabel<Datum, Output>,
) => CSSProperties | undefined; // TODO: ideally this would support SVGProps, but this is invalid for Rect/Circle shapes

export type FlexDirection =
  | 'inherit'
  | 'initial'
  | 'revert'
  | 'unset'
  | 'column'
  | 'column-reverse'
  | 'row'
  | 'row-reverse';
