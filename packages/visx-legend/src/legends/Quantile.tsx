import React from 'react';
import { PickD3Scale } from '@visx/scale';
import Legend, { LegendProps } from './Legend';
import { LabelFormatterFactory } from '../types';
import identity from '../util/identity';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type AnyQuantileScale = PickD3Scale<'quantile', any>;

type FactoryProps = {
  labelDelimiter?: string;
};

export type LegendQuantileProps<Scale extends AnyQuantileScale> = LegendProps<Scale> & FactoryProps;

function labelFormatterFactoryFactory<Scale extends AnyQuantileScale>({
  labelDelimiter,
}: FactoryProps): LabelFormatterFactory<Scale> {
  return ({ scale, labelFormat }) =>
    (datum, index) => {
      const [x0, x1] = scale.invertExtent(scale(datum));
      return {
        extent: [x0, x1],
        text: `${labelFormat(x0, index)} ${labelDelimiter} ${labelFormat(x1, index)}`,
        value: scale(x0),
        datum,
        index,
      };
    };
}

/** A Quantile scale takes a number input and returns an Output. */
export default function Quantile<Scale extends AnyQuantileScale>({
  domain: inputDomain,
  scale,
  labelFormat = identity,
  labelTransform: inputLabelTransform,
  labelDelimiter = '-',
  ...restProps
}: LegendQuantileProps<Scale>) {
  // transform range into input values because it may contain more elements
  const domain = inputDomain || scale.range().map((output) => scale.invertExtent(output)[0]);
  const labelTransform =
    inputLabelTransform || labelFormatterFactoryFactory<Scale>({ labelDelimiter });

  return (
    <Legend<Scale>
      scale={scale}
      domain={domain}
      labelFormat={labelFormat}
      labelTransform={labelTransform}
      {...restProps}
    />
  );
}
